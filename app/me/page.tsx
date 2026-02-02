import Navbar from "@/components/nav"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function() {
  const session = await auth()

  if (!session) {
    redirect('/')
  }
  return (
    <>
      <Navbar />
    </>
  )
}
