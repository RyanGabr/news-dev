import { useGetPosts } from "@/hooks/use-posts";
import { PAGE_SIZE } from "@/services/post";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import Avvvatars from "avvvatars-react";

export function PostList() {
  const [page, setPage] = useState(1);

  const {
    data: { data: posts, count },
  } = useGetPosts({ page: page });

  const hasNextPage = count ? page * PAGE_SIZE < count : false;

  const handleNext = () => {
    if (hasNextPage) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xl lg:text-2xl font-semibold">Postagens recentes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {posts.map((post) => {
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
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="flex flex-col gap-4 bg-popover dark:bg-secondary p-4 rounded-md hover:opacity-70 transition"
            >
              <div className="flex items-start justify-between">
                <p className="font-medium text-sm">
                  Por {post.profiles.display_name}
                </p>

                {post.profiles.avatar_url ? (
                  <img
                    src={post.profiles.avatar_url}
                    className="min-w-8 max-w-8 rounded-full"
                    alt="Profile avatar"
                  />
                ) : (
                  <Avvvatars
                    value={post.profiles.username}
                    size={32}
                    style="shape"
                  />
                )}
              </div>

              <div className="space-y-1">
                <p className="font-semibold leading-5">{post.title}</p>
                <p className="text-muted-foreground text-[15px]">
                  {postFormattedDate}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="w-full flex items-center justify-end gap-2">
        <Button
          disabled={page === 1}
          onClick={handlePrev}
          aria-label="Página anterior"
          variant="secondary"
          size="sm"
          rounded="lg"
          className="px-1.5"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={18} strokeWidth={2} />
        </Button>
        <Button
          disabled={!hasNextPage}
          onClick={handleNext}
          aria-label="Próxima página"
          variant="secondary"
          size="sm"
          rounded="lg"
          className="px-1.5"
        >
          <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}
