import { notFound, redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

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

  // 🔒 Only admin allowed (matches your schema)
  if (room.adminId !== session.user.id) {
    redirect("/me")
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">{room.name}</h1>

      <p className="text-sm text-neutral-500">
        Created by: {room.admin.name ?? "Unknown"}
      </p>

      <div className="mt-4">
        <h2 className="text-lg font-medium">Playlist</h2>

        {room.playlist?.songs.length ? (
          <ul className="mt-2 space-y-2">
            {room.playlist.songs.map(song => (
              <li key={song.id} className="border p-2 rounded">
                <p className="font-medium">{song.title}</p>
                {song.url && (
                  <a
                    href={song.url}
                    target="_blank"
                    className="text-sm text-blue-600 underline"
                  >
                    Open
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-neutral-500 mt-2">
            No songs yet
          </p>
        )}
      </div>
    </div>
  )
}
