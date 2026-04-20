"use server"
import { auth } from "../auth"
import z from "zod";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

const deleteSchema = z.object({
  songId: z.string()
})

export async function delteSong(formData: FormData, roomId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Please LogIn" }
  }

  const parsed = deleteSchema.safeParse({
    songId: formData.get("songId")
  })

  if (!parsed.success) {
    return { error: "invalid data" }
  }

  const room = await prisma.room.findUnique({
    where: {
      id: roomId
    },
    select: {
      admin: true,
      currentSong: true
    }
  })

  if (session.user.id !== room?.admin.id) {
    return { error: "Only admin can delete" }
  }

  const songId = parsed.data.songId

  const song = await prisma.song.findUnique({
    where: {
      id: songId
    }, select: {
      id: true,
      playlist: { select: { roomId: true } },
    }
  })

  if (song) {
    await prisma.song.delete({
      where: {
        id: song.id
      }
    })

    const wsSecret = process.env.WS_SECRET
    if (wsSecret) {
      await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/broadcast`, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
          'X-API-KEY': wsSecret,
        },
        body: JSON.stringify({
          roomId,
          event: "song-deleted",
          data: { songId: song.id }
        })
      }).catch(e => console.error("Broadcast song-deleted to next Failed", e))
    }
    revalidatePath(`/rooms/${roomId}`)
    console.log("song delte action")
  }
}
