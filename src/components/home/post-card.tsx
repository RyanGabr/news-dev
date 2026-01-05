import { Link } from "react-router-dom";
import { MarkdownCleaner } from "./markdown-cleaner";
import type { PostWithAuthor } from "@/types/post";

interface PostCardProps {
  post: PostWithAuthor;
}

export function PostCard({ post }: PostCardProps) {
  // const postCreatedAt = new Date(post.created_at || "");

  // const dateOptions: Intl.DateTimeFormatOptions = {
  //   month: "short",
  //   day: "numeric",
  // };

  // const postFormattedDate = new Intl.DateTimeFormat(
  //   "pt-BR",
  //   dateOptions,
  // ).format(postCreatedAt);

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
          <p className="line-clamp-2 text-ellipsis font-medium text-xl">
            {post.title}
          </p>
        </div>

        <div>
          <MarkdownCleaner markdown={post.content} />
        </div>
      </div>

      {/*<div className="flex items-center gap-2">
        <img
          src="https://pbs.twimg.com/profile_images/1999199376619581440/8W7FN5gc_400x400.jpg"
          alt=""
          className="min-w-6 max-w-6 rounded-full"
        />
        <div>
          <span className="text-sm text-muted-foreground">
            {post.profiles.username}
          </span>
        </div>
      </div>*/}
    </Link>
  );
}
