import Navbar from "@/components/nav";
import { CreateRoomForm } from "./_components/CreateRoomForm";
import { Player } from "./_components/Player";

export default async function MePage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col ">
        <h1>Your Dashboard</h1>
        <CreateRoomForm />
        <Player />
      </div>

    </>

  )
}
