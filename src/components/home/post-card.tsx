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
      className="flex flex-col gap-10 p-5 cursor-pointer bg-secondary hover:scale-99 transition rounded-2xl"
    >
      <div className="bg-foreground px-2 py-1 w-fit rounded-sm">
        <p className="text-background text-xs dark:font-medium">
          {post.profiles.username}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="w-fit">
          <p className="line-clamp-2 text-ellipsis font-medium text-lg md:text-xl">
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
