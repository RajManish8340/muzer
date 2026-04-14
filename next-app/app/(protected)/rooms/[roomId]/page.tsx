import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NavbarForRoom } from "./_components/NavForRoom";
import { AddSongForm } from "./_components/AddSongForm";
import { RoomClient } from "./_components/RoomClient";
import { Chat } from "./_components/Chat";

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
    orderBy: { createdAt: "asc" }
  })

  const isAdmin = room.adminId === session.user.id;

  return (
    <>
      <NavbarForRoom />
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold">{room.name}</h1>
        <p className="text-sm text-neutral-500">
          Created by: {room.admin.name ?? "Unknown"}
        </p>
        <AddSongForm roomId={roomId} />
        <RoomClient
          roomId={roomId}
          isAdmin={isAdmin}
          initialCurrentSong={room.currentSong}
          initialSongs={room.playlist?.songs ?? []}
        />
        <Chat
          roomId={roomId}
          sender={session.user.name ?? "Anonymous"}
          initialMessages={messages}
        />
      </div>
    </>
  );
}
