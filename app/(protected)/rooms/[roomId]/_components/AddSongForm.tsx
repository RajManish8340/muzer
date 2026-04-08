"use client";

import { addSong } from "@/lib/actions/addSong";
import { useActionState } from "react";

export function AddSongForm({ roomId }: { roomId: string }) {
  const [state, formAction, isPending] = useActionState(addSong, { error: "" })

  return (
    <form action={formAction}>
      <input type="hidden" name="roomId" value={roomId} />
      <label htmlFor="name" >song url</label>
      <div className="flex gap-2">
        <input
          type="url"
          name="url"
          required
          placeholder="Pate the Youtube url"
        />

        <button type="submit"
          disabled={isPending}
        >{isPending ? "Adding..." : "Add Song"}</button>

        {state.error && (
          <p>{state.error}</p>
        )}
      </div>

    </form>
  )
}
