"use client";

import { signInAction, signOutAction } from "@/lib/actions/auth";

export function SignIn({ provider }: { provider?: string }) {
  return (
    <form action={signInAction.bind(null, provider)}>
      <button
        type="submit"
        className="rounded-full bg-gradient-to-r from-purple-600 to-violet-700 px-6 py-2 text-sm font-semibold text-white hover:from-purple-500 hover:to-violet-600 transition-all shadow-lg shadow-purple-500/30"
      >
        Sign In
      </button>
    </form>
  );
}

export function SignOut() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="rounded-full bg-gradient-to-r from-purple-600 to-violet-700 px-6 py-2 text-sm font-semibold text-white hover:from-purple-500 hover:to-violet-600 transition-all shadow-lg shadow-purple-500/30"
      >
        Sign Out
      </button>
    </form>
  );
}
