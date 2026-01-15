import { useGetPostById } from "@/hooks/use-posts";
import { Link, useParams } from "react-router-dom";
import { PostOptions } from "./post-options";

export function PostHeader() {
  const { id } = useParams();

  if (!id) {
    throw new Error("Post not found");
  }

  const postId = id;

  const { data: post } = useGetPostById({
    id: postId,
  });

  const postCreatedAt = new Date(post.created_at!);

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const postFormattedDate = new Intl.DateTimeFormat(
    "pt-BR",
    dateOptions,
  ).format(postCreatedAt);

  return (
    <div className="space-y-5 mt-5">
      <div>
        <h1 className="font-semibold text-3xl md:text-[40px] tracking-tight">
          {post.title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <img
          src="https://pbs.twimg.com/profile_images/1999199376619581440/8W7FN5gc_400x400.jpg"
          alt=""
          className="w-7 rounded-full"
        />

        <div>
          <Link
            to={`/${post.profiles.username}`}
            className="text-sm md:text-base"
          >
            {post.profiles.username}
          </Link>
        </div>

        <hr className="h-5 w-px bg-foreground/30" />

        <p className="text-muted-foreground text-center text-sm md:text-base">
          {postFormattedDate}
        </p>

        <PostOptions />
      </div>
    </div>
  );
}
