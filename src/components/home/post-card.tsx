import { Link } from "react-router-dom";

interface PostCardProps {
  postId: string;
  title: string;
  date?: string;
  content: string;
}

export function PostCard(props: PostCardProps) {
  return (
    <Link
      to={`/post/${props.postId}`}
      className="flex flex-col gap-1.5 px-4 py-8 md:p-8 rounded-xl cursor-pointer hover:bg-foreground/5 transition"
    >
      <div>
        <p className="text-foreground/50 text-sm">7 de jul. de 2025</p>
      </div>

      <div className="w-fit">
        <p className="line-clamp-2 text-ellipsis font-semibold text-2xl">
          {props.title}
        </p>
      </div>

      <div>
        <p className="text-foreground/50 line-clamp-2 text-ellipsis">
          {props.content}
        </p>
      </div>
    </Link>
  );
}
