
"use server"

import prisma from "@/lib/prisma"

export async function FetchSongs({ roomId }: { roomId: string }) {
  const songs = await prisma.song.findMany({
    where: {
      playlist: {
        roomId: roomId
      }
    },
  })

  if (songs.length == 0) {
    return <p> NO songs yet</p>
  }

  return (

    <ul className="flex flex-col">{songs.map((song) => (
      <li key={song.id}>
        {song.thumbnail && (
          <img src={song.thumbnail} alt={song.title} />
        )}
        <div>
          <p>{song.title}</p>
          <p> Votes :{song.upvotes - song.downvotes}  </p>
        </div>
      </li>

    ))}</ul>
  )
}
