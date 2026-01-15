import {
  deleteComment,
  getComments,
  type CreateCommentProps,
  type DeleteCommentProps,
  type GetCommentsProps,
} from "@/services/comment";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createComment } from "@/services/comment";
import { useUser } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteCommentData = DeleteCommentProps & {
  postId: string;
};

type CreateCommentData = Omit<CreateCommentProps, "authorId">;

export function useGetComments({ postId }: GetCommentsProps) {
  return useSuspenseQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments({ postId: postId }),
  });
}

export function useCreateComment() {
  const user = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content, postId }: CreateCommentData) =>
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

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: DeleteCommentData) =>
      deleteComment({ commentId: variables.commentId }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
    },
  });
}
