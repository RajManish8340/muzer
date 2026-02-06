
"use client"
import { auth } from "@/lib/auth"
import { SessionProvider } from "next-auth/react"


export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
