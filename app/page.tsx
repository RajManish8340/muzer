import Navbar from "@/components/nav";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth()

  if (session) {
    redirect('/me')
  }
  return (
    <>
      <Navbar />
      <>This is home page </>
    </>

  );
};

