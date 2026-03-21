import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import prisma from "../prisma";

export async function advanceToNextSong(roomId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const room = await prisma.room.findUnique({
    where: { id: roomId },
    select: { admin: true, currentSongId: true }
  })

  if (!room) {
    return { error: "room not found" }
  }

  if (session.user.id !== room.admin.id) {
    return { error: "Only admins can advance" }
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
    orderBy: {
      upvotes: "desc",
      downvotes: "asc",
      createdAt: "asc"
    }
  })

  if (!nextSong) {
    await prisma.room.update({
      where: { id: roomId },
      data: { currentSongId: null }
    })
    revalidatePath(`/rooms/${roomId}`)
    return null
  }

  await prisma.room.update({
    where: { id: roomId },
    data: { currentSongId: nextSong.id }
  })
  revalidatePath(`/rooms/${roomId}`)
  return nextSong
}


