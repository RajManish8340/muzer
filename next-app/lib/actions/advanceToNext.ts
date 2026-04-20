"use server"
import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import prisma from "../prisma";

export async function advanceToNextSong(roomId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const room = await prisma.room.findUnique({
    where: { id: roomId },
    select: { admin: true, currentSongId: true }
  })

  if (!room) {
    throw new Error("No room Found");
  }

  if (session.user.id !== room.admin.id) {
    throw new Error("Only admin can advance");
  }

  if (room.currentSongId) {
    await prisma.song.update({
      where: { id: room.currentSongId },
      data: { played: true }
    })
  }

  const nextSong = await prisma.song.findFirst({
    where: {
      playlist: { roomId: roomId },
      played: false
    },
    orderBy: [
      { upvotes: "desc" },
      { downvotes: "asc" },
      { createdAt: "asc" }
    ]
  })

  const wsSecret = process.env.WS_SECRET
  if (!nextSong) {
    await prisma.room.update({
      where: { id: roomId },
      data: { currentSongId: null }
    })
    if (wsSecret) {
      await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/broadcast`, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
          'X-API-KEY': wsSecret,
        },
        body: JSON.stringify({
          roomId,
          event: "song-changed",
          data: { song: null }
        })
      }).catch(e => console.error("Broadcast song-changed in advance to next Failed", e))
    }
    revalidatePath(`/rooms/${roomId}`)
    return null
  }

  await prisma.room.update({
    where: { id: roomId },
    data: { currentSongId: nextSong.id }
  })


  if (wsSecret) {
    await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/broadcast`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        'X-API-KEY': wsSecret,
      },
      body: JSON.stringify({
        roomId,
        event: "song-changed",
        data: { song: nextSong }
      })
    }).catch(e => console.error("Broadcast song-changed in advance to next Failed", e))
  }
  revalidatePath(`/rooms/${roomId}`)
  return nextSong
}


