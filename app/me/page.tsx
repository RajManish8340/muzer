import Navbar from "@/components/nav";
import { RoomForm } from "./_components/roomForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function MePage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/')
  }
  return (
    <>
      <Navbar />
      <h1>Your Dashboard</h1>
      <RoomForm />

    </>

  )
}
