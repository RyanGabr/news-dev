import { Link } from "react-router-dom";
import type { PostWithAuthor } from "@/types/post";
import Avvvatars from "avvvatars-react";
import type { PROFILE_POSTS_PAGE_SIZE } from "@/services/post";
import { MarkdownCleaner } from "./markdown-cleaner";

interface PostCardProps {
  post: PostWithAuthor;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  const postCreatedAt = new Date(post.created_at!);

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const postFormattedDate = new Intl.DateTimeFormat("en", dateOptions).format(
    postCreatedAt,
  );

  return (
    <Link
      to={`/post/${post.id}`}
      className={`flex items-center justify-between p-6 transition ${index % 2 === 0 ? "bg-secondary" : ""}`}
    ></Link>
  );
}
