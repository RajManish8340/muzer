import { notFound, redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NavbarForRoom } from "./_components/NavForRoom"
import { AddSongForm } from "./_components/AddSongForm"
import { FetchSongs } from "./_components/FetchSongs"

type PageProps = {
  params: Promise<{
    roomId: string
  }>
}

export default async function RoomPage({ params }: PageProps) {
  const { roomId } = await params

  const session = await auth()

  if (!session?.user?.id) {
    redirect("/")
  }

  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
    include: {
      playlist: {
        include: {
          songs: true,
        },
      },
      admin: true,
    },
  })

  if (!room) {
    notFound()
  }


  return (
    <>
      <NavbarForRoom />
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold">{room.name}</h1>
        <p className="text-sm text-neutral-500">
          Created by: {room.admin.name ?? "Unknown"}
        </p>

        <AddSongForm roomId={roomId} />

        <div className="mt-4">
          <h2 className="text-lg font-medium">Playlist</h2>
          <FetchSongs roomId={roomId} />
        </div>
      </div>
    </>
  )
}
