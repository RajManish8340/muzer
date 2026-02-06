"use client"

import { useActionState } from "react"
import { createRoom } from "@/lib/actions/createRoom"

type ActionState = {
  error?: string
}

export function RoomForm() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    createRoom,
    {}
  )

  return (
    <form action={formAction} className="space-y-3">
      <label htmlFor="name" className="block text-sm font-medium">
        Room Name
      </label>

      <input
        id="name"
        name="name"
        required
        className="border p-2 rounded w-full"
        placeholder="Enter room name"
      />

      <button
        type="submit"
        disabled={isPending}
        className="bg-neutral-800 text-white px-4 py-2 rounded disabled:opacity-60"
      >
        {isPending ? "Creating..." : "Create Room"}
      </button>

      {state?.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}
    </form>
  )
}
