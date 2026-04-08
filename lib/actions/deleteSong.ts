"use server"
import { auth } from "../auth"
import z from "zod";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { broadcast } from "../sseClient";

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

    broadcast(song.playlist.roomId, "song-deleted", { songId: song.id })
    revalidatePath(`/rooms/${roomId}`)
    console.log("song delte action")
  }
}
