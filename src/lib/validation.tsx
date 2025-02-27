import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().trim().email(),
  displayName: z
    .string({ message: "Display name is required" })
    .nonempty("Display name is required")
    .min(3, "Display name must be at least 3 characters long")
    .trim()
    .regex(/^[a-zA-Z -0-9_-]+$/, "Special characters are not allowed"),
  password: z
    .string()
    .nonempty()
    .min(8, "Password must be at least 8 characters long"),
});
export type SignUpValues = z.infer<typeof signupSchema>;

export const signInSchema = z.object({
  email: z.string().nonempty().trim().email(),
  password: z
    .string()
    .nonempty()
    .min(8, "Password must be at least 8 characters long"),
});
export type SignInValues = z.infer<typeof signInSchema>;
