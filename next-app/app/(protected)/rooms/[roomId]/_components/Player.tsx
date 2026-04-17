"use client";

import { useState } from "react";
import ReactPlayer from "react-player";
import { VolumeX, Volume2 } from "lucide-react";

interface PlayerProps {
  currentSong: { url: string; title: string } | null;
  isAdmin: boolean;
  onEnded: () => void;
}

export function Player({ currentSong, isAdmin, onEnded }: PlayerProps) {
  const [muted, setMuted] = useState(true);

  if (!currentSong) {
    return (
      <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-purple-900/40 to-black flex items-center justify-center border border-purple-900/30">
        <p className="text-purple-300/60 text-lg">No song playing</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-xl shadow-purple-500/20">
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
        className="inline-flex items-center gap-2 rounded-full bg-purple-600/30 px-4 py-1.5 text-sm text-white hover:bg-purple-600/50 transition"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        Unmute
      </button>
    </div>
  );
}
