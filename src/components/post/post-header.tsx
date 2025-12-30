import { useGetPost } from "@/hooks/use-get-post";
import { Link, useParams } from "react-router-dom";

export function PostHeader() {
  const { id } = useParams();
  const { data: post } = useGetPost(id ?? "");

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
    <div className="space-y-4">
      <div>
        <p className="text-muted-foreground">
          Publicado em {postFormattedDate}
        </p>
      </div>

      <div>
        <h1 className="font-bold text-5xl sm:text-[54px]">{post.title}</h1>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <img
          src="https://pbs.twimg.com/profile_images/1999199376619581440/8W7FN5gc_400x400.jpg"
          alt=""
          className="w-10 rounded-full"
        />

        <div>
          <p>
            Por{" "}
            <Link to={`/${post.profiles.username}`}>
              {post.profiles.username}
            </Link>
          </p>
          <p className="text-sm text-foreground/50 line-clamp-1 text-ellipsis">
            {post.profiles.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
