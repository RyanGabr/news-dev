import { useGetPosts } from "@/hooks/use-posts";
import { PAGE_SIZE } from "@/services/post";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { PostCard } from "./post-card";
import { Button } from "../ui/button";

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
      <div>
        <h2 className="text-xl font-medium">Postagens</h2>
      </div>

      <div className="flex flex-col gap-4 divide-y">
        {posts.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </div>

      <div className="w-full flex items-center justify-end gap-2">
        <Button
          disabled={page === 1}
          onClick={handlePrev}
          variant="secondary"
          rounded="full"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={18} strokeWidth={2} />
          Anterior
        </Button>
        <Button
          disabled={!hasNextPage}
          onClick={handleNext}
          variant="secondary"
          rounded="full"
        >
          Próximo
          <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} />
        </Button>
      </div>
    </>
  );
}
