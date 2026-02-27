"use server"
import ReactPlayer from "react-player"
import { z } from "zod";
import prisma from "../prisma";
import { auth } from "../auth";

const songSchema = z.object({
  songUrl: z.url().nonempty()
})

type ActionState = {
  error?: string
}

export async function addsong(prevState_: any, formdata: FormData,): Promise<ActionState | never> {

  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Please LogIn" }
  }

  const parsed = songSchema.safeParse({
    url: formdata.get("url")
  })

  if (!parsed.success) {
    return { error: "name canot be empty" }
  }

  try {
    const song = prisma.song.create({
      data: {

      }
    })
  } catch (error) {

  }

  return {}

}
