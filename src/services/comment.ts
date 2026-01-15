import { supabase } from "@/lib/supabase";
import type { CommentWithAutor } from "@/types/comment";

interface getCommentsProps {
  postId: string;
}

interface CreateCommentProps {
  postId: string;
  authorId: string;
  content: string;
}

interface DeleteCommentProps {
  commentId: string;
}

export async function getComments({
  postId,
}: getCommentsProps): Promise<CommentWithAutor[]> {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
        *,
        author:profiles (
          username
        )
      `,
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createComment({
  authorId,
  content,
  postId,
}: CreateCommentProps) {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ post_id: postId, author_id: authorId, content }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteComment({ commentId }: DeleteCommentProps) {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    throw new Error(error.message || "Falha ao excluir comentário");
  }
}
