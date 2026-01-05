import { PostCard } from "@/components/home/post-card";
import { Button } from "@/components/ui/button";
import { useGetPostsByAuthor } from "@/hooks/use-get-posts-by-author";
import { useGetProfileByUsername } from "@/hooks/use-get-profile";
import { PROFILE_POSTS_PAGE_SIZE } from "@/services/post";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function PostList() {
  const { username } = useParams();
  const [page, setPage] = useState(1);

  const { data: profile } = useGetProfileByUsername({
    username: username || "",
  });

  const {
    data: { data: posts, count },
  } = useGetPostsByAuthor({
    authorId: profile.id,
    page: page,
  });

  const hasNextPage = count ? page * PROFILE_POSTS_PAGE_SIZE < count : false;

  const handleNext = () => {
    if (hasNextPage) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <span className="font-medium text-muted-foreground text-lg">
          Publicações
        </span>

        <div className="flex flex-col gap-5">
          {posts
            ? posts.map((post) => <PostCard key={post.id} post={post} />)
            : "Nenhuma publicação encontrada"}
        </div>
      </div>

      <div className="w-full flex items-center justify-end gap-2">
        <Button
          disabled={page === 1}
          onClick={handlePrev}
          variant="secondary"
          className="py-3"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={18} strokeWidth={2} />
          Anterior
        </Button>
        <Button
          disabled={!hasNextPage}
          onClick={handleNext}
          variant="secondary"
          className="py-3"
        >
          Próximo
          <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} />
        </Button>
      </div>
    </>
  );
}
