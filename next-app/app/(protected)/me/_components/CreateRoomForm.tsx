"use client";

import { useActionState } from "react";
import { createRoom } from "@/lib/actions/createRoom";

type ActionState = {
  error?: string;
};

export function CreateRoomForm() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    createRoom,
    {}
  );

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-purple-200/80 mb-2"
        >
          Room Name
        </label>
        <input
          id="name"
          name="name"
          required
          type="text"
          placeholder="e.g., Study Group, Gaming Night, Book Club"
          className="w-full rounded-lg border border-purple-900/50 bg-black/60 px-4 py-2.5 text-white placeholder:text-purple-300/40 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-gradient-to-r from-purple-600 to-violet-700 px-6 py-2.5 text-sm font-semibold text-white hover:from-purple-500 hover:to-violet-600 transition-all shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Creating..." : "Create Room"}
      </button>

      {state?.error && (
        <p className="text-sm text-red-400 bg-red-950/30 border border-red-800/50 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}
    </form>
  );
}
