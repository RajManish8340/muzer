import z from "zod";
import { auth } from "../auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

const voteSchema = z.object({
  songId: z.string(),
  value: z.enum(["up", "down"])
})

export async function vote(formData: FormData) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "unauthorized" }
  }

  const parsed = voteSchema.safeParse({
    songId: formData.get("songId"),
    value: formData.get("value")
  })

  if (!parsed.success) {
    return { error: "Invalid Data" }
  }

  const { songId, value } = parsed.data

  const numericValue = value === "up" ? 1 : -1

  await prisma.$transaction(async (tx) => {

    const existing = await tx.vote.findUnique({
      where: {
        userId_songId: {
          userId: session.user?.id!,
          songId: songId
        }
      }
    })

    if (existing) {
      if (existing.value === numericValue) {
        await tx.vote.delete({
          where: {
            id: existing.id
          }
        })

        await tx.song.update({
          where: {
            id: songId
          },
          data: {
            upvotes: { decrement: numericValue === 1 ? 1 : 0 },
            downvotes: { decrement: numericValue === -1 ? 1 : 0 }
          }
        })

      } else {
        await tx.vote.update({
          where: {
            id: existing?.id
          },
          data: {
            value: numericValue
          }
        })

        await tx.song.update({
          where: {
            id: songId
          },
          data: {
            upvotes: { increment: numericValue === 1 ? 1 : -1 },
            downvotes: { increment: numericValue === -1 ? 1 : -1 }
          }
        })
      }
    } else {
      await tx.vote.create({
        data: {
          songId: songId,
          userId: session?.user?.id!,
          value: numericValue
        }
      })

      await tx.song.update({
        where: {
          id: songId
        },
        data: {
          upvotes: { increment: numericValue === 1 ? 1 : 0 },
          downvotes: { increment: numericValue === -1 ? 1 : 0 }
        }
      })
    }
  })

  const song = await prisma.song.findUnique({
    where: { id: songId },
    select: { playlist: { select: { roomId: true } } }
  })

  if (song) {
    revalidatePath(`/rooms/${song.playlist.roomId}`)
  }
}
