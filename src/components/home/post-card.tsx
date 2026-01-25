import { Link } from "react-router-dom";
import { MarkdownCleaner } from "./markdown-cleaner";
import type { PostWithAuthor } from "@/types/post";
import Avvvatars from "avvvatars-react";

interface PostCardProps {
  post: PostWithAuthor;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      to={`/post/${post.id}`}
      className="flex flex-col gap-4 py-6 cursor-pointer transition"
    >
      <div className="w-fit">
        <p className="line-clamp-2 text-ellipsis text-lg">{post.title}</p>
      </div>

      <div className="flex items-center gap-2">
        {post.profiles.avatar_url ? (
          <img
            src={post.profiles.avatar_url}
            className="min-w-6 max-w-6 rounded-full"
          />
        ) : (
          <Avvvatars
            value={post.profiles.display_name}
            size={24}
            style="shape"
          />
        )}

        <p className="text-muted-foreground text-sm">
          {post.profiles.username}
        </p>
      </div>

      <div>
        <MarkdownCleaner markdown={post.content} />
      </div>
    </Link>
  );
}
