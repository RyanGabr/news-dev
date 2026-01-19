import type { PostFormData } from "@/schemas/post";
import { useUser } from "@supabase/auth-helpers-react";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  getPostsByAuthor,
  getPostsBySearch,
  updatePost,
  type DeletePostParams,
  type GetPostByIdParams,
  type GetPostsByAuthorParams,
  type GetPostsBySearchParams,
  type GetPostsParams,
  type UpdatePostData,
} from "../services/post";
import type { PostWithAuthor } from "../types/post";

type GetPostsResponse = {
  data: PostWithAuthor[];
  count: number | null;
};

export function useGetPosts(params: GetPostsParams) {
  return useSuspenseQuery<GetPostsResponse>({
    queryKey: ["posts", params.page],
    queryFn: () => getPosts({ page: params.page }),
  });
}

export function useGetPostById(params: GetPostByIdParams) {
  return useSuspenseQuery({
    queryKey: ["post", params.id],
    queryFn: () =>
      getPostById({
        id: params.id,
      }),
  });
}

export function useGetPostsByAuthor(params: GetPostsByAuthorParams) {
  return useSuspenseQuery({
    queryKey: ["posts-by-author", params.authorId, params.page],
    queryFn: () =>
      getPostsByAuthor({ authorId: params.authorId, page: params.page }),
  });
}

export function useGetPostsBySearch(params: GetPostsBySearchParams) {
  return useSuspenseQuery({
    queryKey: ["search-posts", params.search],
    queryFn: () =>
      getPostsBySearch({
        search: params.search,
      }),
  });
}

export function useCreatePost() {
  const user = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostFormData) => {
      const authorId = user?.id;
      if (!authorId) {
        throw new Error("Usuário não autenticado. Faça login para publicar.");
      }

      return createPost({
        author_id: authorId,
        content: data.content,
        title: data.title,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeletePostParams) =>
      deletePost({
        postId: params.postId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePostData) => updatePost(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
