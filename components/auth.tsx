import { signIn, signOut } from "@/lib/auth"

export function SignIn({ provider }: { provider?: string }) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <button className=" cursor-pointer bg-neutral-800 text-white p-2">
        SigIn
      </button>
    </form>
  )
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
      className="w-full"
    >
      <button className=" cursor-pointer bg-neutral-700 text-white p-2 rounded-md items-center content-center">
        Sign Out
      </button>
    </form>
  )
}
