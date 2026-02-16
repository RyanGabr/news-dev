import { useGetPostById } from "@/hooks/use-posts";
import { Link, useParams } from "react-router-dom";
import Avvvatars from "avvvatars-react";
import { useEffect } from "react";

export function PostHeader() {
  const { id: postId } = useParams();

  if (!postId) {
    throw new Error("Publicação não encontrada");
  }

  const { data: post } = useGetPostById({
    id: postId,
  });

  useEffect(() => {
    document.title = post.title;
  }, [post]);

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
    <div className="flex flex-col gap-4 items-center justify-center">
      <div>
        <p className="text-muted-foreground text-[15px]">{postFormattedDate}</p>
      </div>

      <div>
        <h1 className="font-bold text-3xl lg:text-[40px] lg:leading-12 tracking-tight text-center">
          {post.title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {post.profiles.avatar_url ? (
          <img
            src={post.profiles.avatar_url}
            alt="Profile avatar"
            className="min-w-6 max-w-6 rounded-full"
          />
        ) : (
          <Avvvatars value={post.profiles.username} size={24} style="shape" />
        )}

        <div>
          <Link
            to={`/${post.profiles.username}`}
            className="text-[15px] font-medium"
          >
            {post.profiles.display_name}
          </Link>
        </div>
      </div>
    </div>
  );
}
