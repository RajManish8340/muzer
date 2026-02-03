"use client"

import { signInAction, signOutAction } from "@/lib/actions/auth"

export function SignIn({ provider }: { provider?: string }) {
  return (
    <form action={signInAction.bind(null, provider)}>
      <button className="bg-neutral-800 text-white p-2">
        Sign In
      </button>
    </form>
  )
}

export function SignOut() {
  return (
    <form action={signOutAction}>
      <button className="bg-neutral-700 text-white p-2 rounded-md">
        Sign Out
      </button>
    </form>
  )
}
