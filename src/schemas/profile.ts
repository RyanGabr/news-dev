import z from "zod/v3";

export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(1, "O nome de usuário deve ter no mínimo 1 caracter"),
  bio: z.string().nullable().optional(),
  display_name: z
    .string()
    .min(1, "O nome de usuário deve ter no mínimo 1 caracter"),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
