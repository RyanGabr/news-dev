import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(3, "O título deve ter pelo menos 3 caracteres.")
    .max(160, "O título deve ter no máximo 160 caracteres."),

  content: z
    .string()
    .min(10, "O corpo do post deve ter pelo menos 10 caracteres.")
    .max(
      20000,
      "O corpo do post excedeu o limite máximo de 20.000 caracteres.",
    ),
});

export type PostFormData = z.infer<typeof postSchema>;
export type CreatePostData = PostFormData & {
  author_id: string;
};
