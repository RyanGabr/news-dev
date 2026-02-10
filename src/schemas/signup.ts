import { z } from "zod";

export const signupSchema = z.object({
  display_name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  username: z
    .string()
    .trim()
    .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
    .regex(/^\S+$/, "Não pode conter espaços")
    .transform((val) => val.toLowerCase()),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
