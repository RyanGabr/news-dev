import { useGetPost } from "@/hooks/use-get-post";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";

export function PostContent() {
  const { id } = useParams();
  const { data: post } = useGetPost(id ?? "");

  if (!id) {
    return "Post não encontrado";
  }

  return (
    <div className="prose prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-3xl md:prose-h1:text-4xl md:text-lg leading-8 prose-zinc dark:prose-invert prose-strong:font-semibold">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
    </div>
  );
}
