import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
    .regex(/^\S+$/, "Não pode conter espaços"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
