import { useGetPosts } from "@/hooks/use-get-posts";
import { timeAgo } from "@/lib/utils";
import { PAGE_SIZE } from "@/services/post";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Link } from "react-router-dom";

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
    <>
      <div className="flex flex-col gap-3">
        {posts.map((post, index) => {
          const postNumber = (page - 1) * PAGE_SIZE + index + 1;

          return (
            <div key={post.id} className="flex items-start gap-2">
              <div>
                <span className="font-medium">{postNumber}.</span>
              </div>

              <div className="flex flex-col">
                <div>
                  <Link
                    to={`/post/${post.id}`}
                    className="hover:underline line-clamp-2 text-ellipsis font-medium"
                  >
                    {post.title}
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-foreground/60 hover:underline cursor-pointer">
                    Postado por {post.profiles.username}
                  </span>
                  {post.created_at && (
                    <span className="text-[13px] text-foreground/60">
                      {timeAgo(post.created_at)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full flex items-center justify-center gap-5">
        <button
          disabled={page === 1}
          onClick={handlePrev}
          className="cursor-pointer disabled:opacity-50 disabled:cursor-default flex items-center gap-1"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
          Anterior
        </button>
        <button
          disabled={!hasNextPage}
          onClick={handleNext}
          className="cursor-pointer disabled:opacity-50 disabled:cursor-default flex items-center gap-1"
        >
          Próximo
          <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
        </button>
      </div>
    </>
  );
}
