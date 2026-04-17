import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { AddSongForm } from "./_components/AddSongForm";  // ← import the form
import { RoomClient } from "./_components/RoomClient";
import { Chat } from "./_components/Chat";
import Navbar from "@/components/nav";

type PageProps = {
  params: Promise<{ roomId: string }>;
};

export default async function RoomPage({ params }: PageProps) {
  const { roomId } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: {
      playlist: {
        include: {
          songs: {
            where: { played: false },
            orderBy: { createdAt: "desc" },
          },
        },
      },
      admin: true,
      currentSong: true,
    },
  });

  if (!room) notFound();

  const messages = await prisma.message.findMany({
    where: { roomId },
    select: { sender: true, content: true },
    orderBy: { createdAt: "asc" },
  });

  const isAdmin = room.adminId === session.user.id;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Room header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent sm:text-4xl">
              {room.name}
            </h1>
            <p className="mt-1 text-sm text-purple-300/60">
              Created by: {room.admin.name ?? "Unknown"}
            </p>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left column: AddSongForm + Player + Playlist */}
            <div className="lg:col-span-2 space-y-6">
              {/* AddSongForm card */}
              <div className="rounded-2xl border border-purple-900/30 bg-black/40 backdrop-blur-sm p-4 shadow-xl shadow-purple-500/10">
                <AddSongForm roomId={roomId} />
              </div>
              {/* RoomClient (Player + Playlist) card */}
              <div className="rounded-2xl border border-purple-900/30 bg-black/40 backdrop-blur-sm p-4 shadow-xl shadow-purple-500/10">
                <RoomClient
                  roomId={roomId}
                  isAdmin={isAdmin}
                  initialCurrentSong={room.currentSong}
                  initialSongs={room.playlist?.songs ?? []}
                />
              </div>
            </div>

            {/* Right column: Chat */}
            <div className="rounded-2xl border border-purple-900/30 bg-black/40 backdrop-blur-sm p-4 shadow-xl shadow-purple-500/10 h-[calc(100vh-12rem)] sticky top-24">
              <Chat
                roomId={roomId}
                sender={session.user.name ?? "Anonymous"}
                initialMessages={messages}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
