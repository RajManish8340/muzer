
"use client";

import { useState } from "react";
import ReactPlayer from "react-player";

interface PlayerProps {
  currentSong: { url: string; title: string } | null;
  isAdmin: boolean;
  onEnded: () => void;
}

export function Player({ currentSong, isAdmin, onEnded }: PlayerProps) {
  const [muted, setMuted] = useState(true);

  if (!currentSong) {
    return (
      <div className="aspect-video w-full bg-black flex items-center justify-center text-white">
        No song playing
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="aspect-video w-full bg-black">
        <ReactPlayer
          src={currentSong.url}
          width="100%"
          height="100%"
          playing={true}
          muted={muted}
          controls={isAdmin}
          onEnded={onEnded}
        />
      </div>
      <button
        onClick={() => setMuted(false)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Unmute
      </button>
    </div>
  );
}
