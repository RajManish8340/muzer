"use client";

import { useState, useEffect } from "react";
import { Player } from "./Player";
import { vote } from "@/lib/actions/vote";
import { advanceToNextSong } from "@/lib/actions/advanceToNext";
import { Trash } from "lucide-react";
import { delteSong } from "@/lib/actions/deleteSong";
import { deleteRoom } from "@/lib/actions/deleteRoom";
import { socket } from "@/lib/socket";

interface Song {
  id: string;
  title: string;
  url: string;
  thumbnail: string | null;
  upvotes: number;
  downvotes: number;
  played: boolean;
}

interface RoomClientProps {
  roomId: string;
  isAdmin: boolean;
  initialCurrentSong: Song | null;
  initialSongs: Song[];
}

export function RoomClient({
  roomId,
  isAdmin,
  initialCurrentSong,
  initialSongs,
}: RoomClientProps) {

  const [currentSong, setCurrentSong] = useState(initialCurrentSong);
  const [songs, setSongs] = useState(initialSongs);

  useEffect(() => {
    socket.on("song-added", ({ song }) => {
      setSongs((prev) => [...prev, song])
    })

    socket.on("vote-updated", ({ songId, upvotes, downvotes }) => {
      setSongs((prev) => prev.map(s => s.id === songId ? { ...s, upvotes, downvotes } : s))
    })

    socket.on("song-changed", ({ song }) => {
      setCurrentSong(song)
      if (song) setSongs(prev => prev.filter(s => s.id !== song.id))
    })

    socket.on("song-deleted", ({ songId }) => {
      setSongs(prev => prev.filter(s => s.id !== songId))
    })

    return () => {
      socket.off("add-song")
      socket.off("vote-updated")
      socket.off("song-changed")
      socket.off("song-deleted")
    }
  }, [roomId]);

  const handleVote = async (formData: FormData) => {
    await vote(formData);
  };

  const handleSongDelete = async (formData: FormData) => {
    await delteSong(formData, roomId)
  }

  const handleRoomDelete = async () => {
    await deleteRoom(roomId)
  }

  const handleNext = async () => {
    if (!isAdmin) return
    try {
      await advanceToNextSong(roomId)
    } catch (err) {
      console.error("Failed to advance:", err);
    }
  };

  return (
    <div className="space-y-6">
      <Player
        currentSong={currentSong}
        isAdmin={isAdmin}
        onEnded={handleNext}
      />

      {isAdmin && (
        <div>
          <button
            onClick={handleNext}
            className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Next Song
          </button>
          <button onClick={handleRoomDelete} className="bg-red-300 text-white mx-4 px-4 py-2 rounded">DeleteRoom</button>
        </div>
      )}

      <div>
        <h2 className="text-lg font-medium">Playlist</h2>
        {songs.length === 0 ? (
          <p className="text-sm text-neutral-500 mt-2">No songs yet</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {songs.map((song) => (
              <li
                key={song.id}
                className="border p-2 rounded flex items-center gap-3"
              >
                {song.thumbnail && (
                  <img
                    src={song.thumbnail}
                    alt={song.title}
                    className="w-20 h-auto rounded"
                  />
                )}

                <div className="flex-1">
                  <p className="font-medium">{song.title}</p>
                  <p className="text-sm text-gray-600">
                    Score: {song.upvotes - song.downvotes} (↑{song.upvotes} ↓
                    {song.downvotes})
                  </p>
                </div>

                <div className="flex gap-1">
                  <form action={handleVote}>
                    <input type="hidden" name="songId" value={song.id} />
                    <input type="hidden" name="value" value="up" />
                    <button
                      type="submit"
                      className="px-2 py-1 bg-green-100 rounded hover:bg-green-200"
                    >
                      👍
                    </button>
                  </form>
                  <form action={handleVote}>
                    <input type="hidden" name="songId" value={song.id} />
                    <input type="hidden" name="value" value="down" />
                    <button
                      type="submit"
                      className="px-2 py-1 bg-red-100 rounded hover:bg-red-200"
                    >
                      👎
                    </button>
                  </form>
                </div>

                {isAdmin &&
                  <div>
                    <form action={handleSongDelete}>
                      <button type="submit">
                        <input type="hidden" name="songId" value={song.id} />
                        <Trash />
                      </button>
                    </form>
                  </div>
                }

              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
