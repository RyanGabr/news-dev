import { supabase } from "@/lib/supabase";
import type { CommentWithAutor } from "@/types/comment";

interface getCommentsProps {
  postId: string;
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
