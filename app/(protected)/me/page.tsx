import Navbar from "@/components/nav";
import { RoomForm } from "./_components/roomForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function MePage() {
  return (
    <>
      <Navbar />
      <h1>Your Dashboard</h1>
      <RoomForm />

    </>

  )
}
