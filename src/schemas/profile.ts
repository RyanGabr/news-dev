import z from "zod/v3";

export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(1, "O nome de usuário deve ter no mínimo 1 caracter"),
  bio: z.string().nullable().optional(),
  display_name: z
    .string()
    .min(1, "O nome de usuário deve ter no mínimo 1 caracter"),
  avatar_url: z
    .union([z.string(), z.instanceof(File)])
    .nullable()
    .optional()
    .refine((file) => {
      if (!(file instanceof File)) return true;
      return file.size <= 2 * 1024 * 1024;
    }, "A imagem deve ter no máximo 2MB")
    .refine((file) => {
      if (!(file instanceof File)) return true;
      return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    }, "Formatos aceitos: JPEG, PNG e WebP"),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
