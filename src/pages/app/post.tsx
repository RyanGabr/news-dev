import { useGetPost } from "@/hooks/use-get-post";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";

export function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  if (!id) {
    return "Post não encontrado";
  }

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-0 py-16 space-y-10">
      <div>
        <button
          onClick={() => navigate("/")}
          className="bg-foreground/5 cursor-pointer flex items-center gap-1 rounded-full px-4.5 py-2.5 font-semibold hover:bg-foreground/8 transition"
        >
          Todas as postagens
          <HugeiconsIcon icon={ArrowLeft02Icon} size={20} />
        </button>
      </div>

      <div className="space-y-14">
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
                Por <Link to="/">{post.profiles.username}</Link>
              </p>
              <p className="text-sm text-foreground/50">{post.profiles.bio}</p>
            </div>
          </div>
        </div>

        <div className="prose prose-headings:font-bold text-lg leading-8 prose-zinc">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
