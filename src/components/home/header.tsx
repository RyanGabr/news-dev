import { useGetPostById } from "@/hooks/use-posts";
import { Link } from "react-router-dom";
import { MarkdownCleaner } from "./markdown-cleaner";

export function Header() {
  const { data: post } = useGetPostById({
    id: "144a6c0e-818b-4e47-8fbc-089b00eab70f",
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
    <div className="flex flex-col gap-8">
      <strong className="text-3xl lg:text-4xl font-semibold tracking-tight">
        Início
      </strong>

      <Link
        to={`/post/${post.id}`}
        className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-12 items-center"
      >
        <div>
          <div className="bg-brand rounded-md h-64" />
        </div>

        <div className="space-y-2">
          <p className="text-sm lg:text-base text-muted-foreground">
            {postFormattedDate}
          </p>
          <p className="font-semibold text-2xl lg:text-3xl">{post.title}</p>
          <MarkdownCleaner markdown={post.content} />
        </div>
      </Link>
    </div>
  );
}
