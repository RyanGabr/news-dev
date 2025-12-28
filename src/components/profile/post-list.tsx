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
      <div>
        <span className="font-semibold text-muted-foreground px-4 md:px-8">
          Publicações
        </span>

        <hr className="my-3 mx-4 md:mx-8" />

        {posts
          ? posts.map((post) => (
              <PostCard
                key={post.id}
                postId={post.id}
                contentPreview={post.content}
                title={post.title}
                date={post.created_at}
              />
            ))
          : "Nenhuma publicação encontrada"}
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
