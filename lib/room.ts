import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse, } from "next/server";
import { playlistSchema } from "./zodSchema";

export async function POST(req: NextRequest) {

  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({
      success: false,
      error: "Unauthorized",
    }, {
      status: 401
    })
  }

  const body = await req.json()
  const { success, data } = playlistSchema.safeParse(body)

  if (!success) {
    return NextResponse.json({
      success: false,
      error: "Invalid request schema"
    })
  }

  const roomDb = await prisma.room.create({
    data: {
      name: data.name,
      adminId: session.user.id
    }
  })

  return NextResponse.json({
    success: true,
    data: roomDb
  })
}
