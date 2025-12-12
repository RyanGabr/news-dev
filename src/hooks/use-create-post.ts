import type { PostFormData } from "@/schemas/post";
import { createPost } from "@/services/post";
import { useUser } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePost() {
  const user = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postData: PostFormData) => {
      const authorId = user?.id;
      if (!authorId) {
        throw new Error("Usuário não autenticado. Faça login para publicar.");
      }

      return createPost({
        author_id: authorId,
        content: postData.content,
        title: postData.title,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
