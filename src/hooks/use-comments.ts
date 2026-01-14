import { getComments } from "@/services/comment";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createComment } from "@/services/comment";
import { useUser } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useGetCommentsProps {
  postId: string;
}

export function useGetComments({ postId }: useGetCommentsProps) {
  return useSuspenseQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments({ postId: postId }),
  });
}

interface CreateCommentProps {
  content: string;
  postId: string;
}

export function useCreateComment() {
  const user = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content, postId }: CreateCommentProps) =>
      createComment({
        authorId: user!.id,
        content: content,
        postId: postId,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
    },
  });
}
