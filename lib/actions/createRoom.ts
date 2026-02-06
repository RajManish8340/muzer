"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const roomSchema = z.object({
  name: z.string().min(1),
})

type ActionState = {
  error?: string
}

export async function createRoom(_prevState: ActionState, formData: FormData): Promise<ActionState | never> {

  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Please log in" }
  }

  const parsed = roomSchema.safeParse({
    name: formData.get("name"),
  })

  if (!parsed.success) {
    return { error: "name canot be empty" }
  }

  const room = await prisma.room.create({
    data: {
      name: parsed.data.name,
      adminId: session.user.id,
      playlist: {
        create: {
          name: parsed.data.name,
        },
      },
    },
  })

  revalidatePath("/me")

  redirect(`/rooms/${room.id}`)
}
