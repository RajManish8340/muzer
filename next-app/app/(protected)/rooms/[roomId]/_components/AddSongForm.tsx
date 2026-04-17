"use client";

import { addSong } from "@/lib/actions/addSong";
import { useActionState } from "react";
import { Plus } from "lucide-react";

export function AddSongForm({ roomId }: { roomId: string }) {
  const [state, formAction, isPending] = useActionState(addSong, { error: "" });

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="roomId" value={roomId} />
      <label htmlFor="url" className="block text-sm font-medium text-purple-200/80">
        Song URL
      </label>
      <div className="flex gap-2">
        <input
          type="url"
          name="url"
          id="url"
          required
          placeholder="Paste a YouTube URL"
          className="flex-1 rounded-full border border-purple-900/50 bg-black/60 px-4 py-2 text-sm text-white placeholder:text-purple-300/40 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 px-5 py-2 text-sm font-semibold text-white hover:from-purple-500 hover:to-violet-600 transition-all shadow-lg shadow-purple-500/30 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          {isPending ? "Adding..." : "Add Song"}
        </button>
      </div>
      {state.error && (
        <p className="text-sm text-red-400 bg-red-950/30 border border-red-800/50 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}
    </form>
  );
}
