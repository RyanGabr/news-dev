import { useGetPost } from "@/hooks/use-get-post";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { PostOptions } from "./post-options";

export function PostHeader() {
  const { id } = useParams();
  const { data: post } = useGetPost(id ?? "");
  const navigate = useNavigate();

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
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => navigate(-1)}
          variant="secondary"
          size="sm"
          rounded="full"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} size={20} strokeWidth={2} />
        </Button>

        <PostOptions />
      </div>

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
      </div>
    </div>
  );
}
