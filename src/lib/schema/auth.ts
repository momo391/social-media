import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "name must be at least 2 letters")
    .max(50, "name must be at most 50 letters"),
  email: z.string().email(),
  passowrd: z.string().min(8, "must be at least 8 letters"),
});
