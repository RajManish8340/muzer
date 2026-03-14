"use client"

import { redirect } from "next/navigation"

export function NavbarForRoom() {
  return (
    <div className=" bg-amber-600 flex items-center  p-2 justify-between" >
      <div onClick={() => redirect("/me")} className="text-3xl font-bold text-amber-200 cursor-pointer " > Muzer</div>
    </div >
  )
}
