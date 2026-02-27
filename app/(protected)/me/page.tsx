import Navbar from "@/components/nav";
import { Create_room_form } from "./_components/roomForm";

export default async function MePage() {
  return (
    <>
      <Navbar />
      <h1>Your Dashboard</h1>
      <Create_room_form />
    </>

  )
}
