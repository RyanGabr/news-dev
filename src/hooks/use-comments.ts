import {
  deleteComment,
  getComments,
  type GetCommentsParams,
  type CreateCommentData as CreateCommentPayload,
  type DeleteCommentParams as DeleteCommentServiceParams,
  type UpdateCommentData as UpdateCommentPayload,
  updateComment,
} from "@/services/comment";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createComment } from "@/services/comment";
import { useUser } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateCommentData = Omit<CreateCommentPayload, "authorId">;

type UpdateCommentData = UpdateCommentPayload & {
  postId: string;
};

type DeleteCommentParams = DeleteCommentServiceParams & {
  postId: string;
};

export function useGetComments(params: GetCommentsParams) {
  return useSuspenseQuery({
    queryKey: ["comments", params.postId],
    queryFn: () => getComments({ postId: params.postId }),
  });
}

export function useCreateComment() {
  const user = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentData) =>
      createComment({
        authorId: user!.id,
        content: data.content,
        postId: data.postId,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
    },
  });
}

export function useUpdateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCommentData) =>
      updateComment({
        commentId: data.commentId,
        content: data.content,
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
    mutationFn: (params: DeleteCommentParams) =>
      deleteComment({ commentId: params.commentId }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
    },
  });
}
