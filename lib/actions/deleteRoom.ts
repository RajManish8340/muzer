"use server"

import { redirect } from "next/navigation"
import { auth } from "../auth"
import prisma from "../prisma"

export async function deleteRoom(roomId: string) {

  const session = await auth()
  if (!session?.user?.id) {
    return { error: "please login" }
  }

  const room = await prisma.room.findUnique({
    where: {
      id: roomId
    },
    select: { admin: true }
  })

  if (session.user.id !== room?.admin.id) {
    return { error: "only admin can delte Room" }
  }
  if (room) {
    await prisma.room.delete({
      where: {
        id: roomId
      }
    })
    console.log("executing room deletion")
    redirect("/me")
  }
}

