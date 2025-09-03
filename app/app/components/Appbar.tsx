"use client"
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
    const session = useSession()

    return <div className="flex items-center justify-between ">
        <div className="flex justify-between m-2 p-2 bg-purple-500">
            muzi
        </div>
        <div>
            {session.data?.user &&<button className="cursor-pointer m-2 p-2 bg-blue-400" onClick={() => signOut()}> Logout</button> }
            {!session.data?.user &&<button className=" cursor-pointer m-2 p-2 bg-blue-400" onClick={() => signIn()}> SignIn</button> }
        </div>
    </div>
}
