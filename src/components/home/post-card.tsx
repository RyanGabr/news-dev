import { Link } from "react-router-dom";
import { MarkdownCleaner } from "./markdown-cleaner";
import type { PostWithAuthor } from "@/types/post";

interface PostCardProps {
  post: PostWithAuthor;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      to={`/post/${post.id}`}
      className="flex flex-col gap-3 p-5 cursor-pointer bg-secondary transition rounded-4xl squircle border border-border/40 hover:border-border"
    >
      <div className="flex items-center gap-2">
        <img
          src="https://pbs.twimg.com/profile_images/1999199376619581440/8W7FN5gc_400x400.jpg"
          alt=""
          className="min-w-6 max-w-6 rounded-full"
        />

        <p className="font-medium text-muted-foreground text-sm">
          {post.profiles.username}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="w-fit">
          <p className="line-clamp-2 text-ellipsis font-medium text-lg">
            {post.title}
          </p>
        </div>

        <div>
          <MarkdownCleaner markdown={post.content} />
        </div>
      </div>
    </Link>
  );
}
