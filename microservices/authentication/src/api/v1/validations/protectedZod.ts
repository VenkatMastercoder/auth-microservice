import { z } from "zod";

export const protectedSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(40).optional(),
});
