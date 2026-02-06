import { auth } from "./lib/auth";

export async function proxy() {
  const session = await auth()


}
