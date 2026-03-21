"use client";

import { useState, useEffect } from "react";
import { Player } from "./Player";
import { vote } from "@/lib/actions/vote";
import { advanceToNextSong } from "@/lib/actions/advanceToNext";

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

  // Sync with props after revalidation
  useEffect(() => {
    setCurrentSong(initialCurrentSong);
  }, [initialCurrentSong]);

  useEffect(() => {
    setSongs(initialSongs);
  }, [initialSongs]);

  const handleVote = async (formData: FormData) => {
    await vote(formData);
    // Revalidation will trigger props update, which will sync state.
  };

  const handleNext = async () => {
    if (isAdmin) {
      try {
        const next = await advanceToNextSong(roomId);
        if (next) setCurrentSong(next);
      } catch (err) {
        console.error("Failed to advance:", err);
      }
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
        <button
          onClick={handleNext}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Next Song
        </button>
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
