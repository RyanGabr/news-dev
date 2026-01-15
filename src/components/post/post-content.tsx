import { useGetPostById } from "@/hooks/use-posts";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";

export function PostContent() {
  const { id } = useParams();

  if (!id) {
    throw new Error("Post not found");
  }

  const postId = id;

  const { data: post } = useGetPostById({
    id: postId,
  });

  if (!id) {
    return "Post não encontrado";
  }

  return (
    <div className="prose prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-[28px] md:prose-h1:text-[32px] md:text-lg leading-7.5 prose-zinc dark:prose-invert prose-strong:font-semibold prose-hr:my-5">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
    </div>
  );
}
