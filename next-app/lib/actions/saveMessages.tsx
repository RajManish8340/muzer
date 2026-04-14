"use server"
import prisma from "../prisma";

export async function saveMessages({ roomId, content, sender }: {
  roomId: string
  content: string
  sender: string
}) {
  await prisma.message.create({
    data: {
      content,
      sender,
      roomId
    }
  })
}
