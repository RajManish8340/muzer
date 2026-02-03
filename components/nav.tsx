"use server"
import { auth } from "@/lib/auth"
import { SignIn, SignOut } from "./auth-button"

export default async function Navbar() {

  const session = await auth()

  return (
    <div className=" bg-amber-600 flex items-center  p-2 justify-between" >
      <div className="text-3xl font-bold text-amber-200 "> Muzer</div>
      <div className="bg-neutral-800 rounded-2xl p-2 ">
        {!session ? (
          <div className="text-center">
            <SignIn provider="google" />
          </div>
        ) : (
          <div className=" flex items-center p-1 justify-between ">
            <p className="text-white text-center pr-5 items-center content-center">{session.user?.name?.split(" ")[0].toUpperCase()}</p>
            <SignOut />
          </div>
        )}
      </div>
    </div >
  )
}
