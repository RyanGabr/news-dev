import { Link } from "react-router-dom";
import { MarkdownCleaner } from "./markdown-cleaner";

interface PostCardProps {
  postId: string;
  title: string;
  date: string | null;
  contentPreview: string;
}

export function PostCard(props: PostCardProps) {
  const postCreatedAt = new Date(props.date || "");

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const postFormattedDate = new Intl.DateTimeFormat(
    "pt-BR",
    dateOptions,
  ).format(postCreatedAt);

  return (
    <Link
      to={`/post/${props.postId}`}
      className="flex flex-col gap-1.5 px-4 py-8 md:p-8 rounded-xl cursor-pointer hover:bg-foreground/5 transition"
    >
      <div>
        <p className="text-foreground/50 text-sm">{postFormattedDate}</p>
      </div>

      <div className="w-fit">
        <p className="line-clamp-2 text-ellipsis font-semibold text-[22px]">
          {props.title}
        </p>
      </div>

      <div>
        <MarkdownCleaner markdown={props.contentPreview} />
      </div>
    </Link>
  );
}
