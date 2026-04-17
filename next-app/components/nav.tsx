"use server";

import { auth } from "@/lib/auth";
import { SignIn, SignOut } from "./auth-button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 border-b border-purple-900/30 bg-black/50 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-violet-700 shadow-lg shadow-purple-500/50">
            <Sparkles className="h-5 w-5 text-white" fill="white" />
          </div>
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
            Muzer
          </Link>
        </div>

        {/* Auth section */}
        <div className="flex items-center gap-4">
          {!session ? (
            <SignIn provider="google" />
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-purple-300/80">
                {session.user?.name}
              </span>
              <SignOut />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
