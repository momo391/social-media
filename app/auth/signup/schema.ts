import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/;

export const signUpSchema = z
  .object({
    first_name: z
      .string()
      .min(1, "first name required")
      .max(50, "first name must be at most 50 letters")
      .refine((value) => /^[A-Za-z\s'-]+$/.test(value), {
        message:
          "First name can only contain letters, spaces, hyphens, and apostrophes",
      }),
    last_name: z
      .string()
      .min(1, "last name required")
      .max(50, "last name must be at most 50 letters")
      .refine((value) => /^[A-Za-z\s'-]+$/.test(value), {
        message:
          "Last name can only contain letters, spaces, hyphens, and apostrophes",
      }),
    username: z
      .string()
      .min(2, "username required")
      .max(50, "username must be at most 50 letters"),
    email: z
      .string()
      .min(1, "email required")
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, "password must be at least 8 letters")
      .max(50, "are you trying to store this ?")
      .refine((value) => passwordRegex.test(value), {
        message:
          "Password must include lowercase, uppercase, numbers, and special characters",
      }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
