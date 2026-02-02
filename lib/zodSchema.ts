
import z from "zod";

export const playlistSchema = z.object({
  name: z.string().min(1)
})
