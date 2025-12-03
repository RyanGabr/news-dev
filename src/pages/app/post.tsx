import { useGetPost } from "@/hooks/use-get-post";
import { timeAgo } from "@/lib/utils";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";

export function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post } = useGetPost(id ?? "");

  if (!id) {
    return "Post não encontrado";
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="text-sm cursor-pointer flex items-center gap-1"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
          Voltar para o início
        </button>
      </div>

      <div className="space-y-2">
        <div>
          <h1 className="font-semibold text-4xl">{post.title}</h1>
        </div>

        <div className="flex items-center gap-3 text-foreground/70 text-sm">
          <div className="size-6 rounded-full bg-foreground/10 flex items-center justify-center text-foreground/50">
            {post.profiles.username.split("")[0]}
          </div>

          <div>
            Publicado por{" "}
            <Link to="/" className="hover:underline">
              {post.profiles.username}
            </Link>
          </div>

          <span>{timeAgo(post.created_at!)}</span>
        </div>
      </div>

      <div>
        <p className="leading-7 text-foreground/90 prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </p>
      </div>
    </div>
  );
}
