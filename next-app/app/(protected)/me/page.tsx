import Navbar from "@/components/nav";
import { CreateRoomForm } from "./_components/CreateRoomForm";

export default async function MePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header section */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent sm:text-5xl">
              Your Dashboard
            </h1>
            <p className="mt-3 text-purple-300/60 text-sm sm:text-base">
              Create and manage your rooms
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-purple-900/30 bg-black/40 backdrop-blur-sm p-6 shadow-xl shadow-purple-500/10 sm:p-8">
            <CreateRoomForm />
          </div>

          {/* Optional: You can add a list of existing rooms here later */}
        </div>
      </main>
    </>
  );
}
