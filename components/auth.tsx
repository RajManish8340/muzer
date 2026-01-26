"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function AuthButton() {
  const { data: session } = useSession()

  if (!session) {
    return <button onClick={() => signIn("google")} className="bg-blue-700 cursor-pointer p-3 " >Sign In</button>
  }

  return <button onClick={() => signOut()}>Sign Out</button>
}
