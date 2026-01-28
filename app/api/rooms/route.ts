import { auth } from "@/lib/auth";
import { NextRequest, NextResponse, } from "next/server";

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
  return NextResponse.json({
    success: true,
    data: session.user.id
  })
}
