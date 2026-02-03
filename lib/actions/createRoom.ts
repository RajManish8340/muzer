
'use server'
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const roomSchema = z.object({
  name: z.string().min(1)
})

export async function createRoom(prevState: any, formData: FormData) {

  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "please logIn"
    }
  }

  const validatedSchema = roomSchema.safeParse({
    name: formData.get('name')
  })

  if (!validatedSchema.success) {
    return {
      error: "name canot be empty"
    }
  }

  let roomId: string | null = null;

  try {
    const roomDb = await prisma.room.create({
      data: {
        name: validatedSchema.data.name,
        adminId: session?.user?.id,
        playlist: {
          create: {
            name: validatedSchema.data.name
          }
        }
      }
    })

    roomId = roomDb.id

    revalidatePath('/me')

  } catch {
    return {
      error: "Database Error while creating Room "
    }
  }
  redirect(`/rooms/${roomId}`)
}

