"use server";
import { z } from "zod";
import prisma from "../prisma";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";
import { broadcast } from "../sseClient";

const songSchema = z.object({
  url: z.url("please enter valid url").min(1, "URL is required"),
  roomId: z.string().min(1, "roomId is reqired")
})

type ActionState = {
  error?: string
}

async function fetchYtMetaData(songUrl: string) {
  try {
    const ombedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(songUrl)}`
    const response = await fetch(ombedUrl)
    if (!response.ok) return null;
    const data = await response.json()

    return {
      title: data.title,
      thumbnail: data.thumbnail_url
    }
  } catch (error) {
    return null;
  }
}

export async function addSong(prevState_: any, formdata: FormData): Promise<ActionState> {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Please LogIn" }
  }

  const parsed = songSchema.safeParse({
    url: formdata.get("url"),
    roomId: formdata.get("roomId")
  })

  if (!parsed.success) {
    return { error: "url canot be empty" }
  }

  const { url, roomId } = parsed.data;

  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: { playlist: true }
  })

  if (!room) return { error: "room not found" }
  if (!room.playlist) return { error: "playlist not found in this room" }

  if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
    return { error: "please enter a valid YT url" }
  }

  let title = "untitled"
  let thumbnail = null

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const metaData = await fetchYtMetaData(url)
    if (metaData) {
      title = metaData.title
      thumbnail = metaData.thumbnail
    }
  }

  let createdSong;
  try {
    createdSong = await prisma.song.create({
      data: {
        url: url,
        title: title,
        thumbnail: thumbnail,
        createdById: session.user.id,
        playlistId: room.playlist.id
      }
    })
  } catch (error) {
    console.log("failed to add song ", error)
    return { error: "DB-error : could not add song" }
  }

  let isNowCurrent = false
  if (!room.currentSongId) {
    await prisma.room.update({
      where: { id: roomId },
      data: { currentSongId: createdSong.id },
    });
    isNowCurrent = true
  }

  broadcast(roomId, 'song-added', { song: createdSong })

  if (isNowCurrent) {
    broadcast(roomId, 'song-changed', { song: createdSong })
  }

  revalidatePath(`/rooms/${room.id}`)
  return {}

}
