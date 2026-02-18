import { Button } from "@/components/ui/button";
import { useGetPostsByAuthor } from "@/hooks/use-posts";
import {
  useGetCurrentProfile,
  useGetProfileByUsername,
} from "@/hooks/use-profile";
import { PROFILE_POSTS_PAGE_SIZE } from "@/services/post";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  File02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Avvvatars from "avvvatars-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export function PostList() {
  const { username } = useParams();
  const [page, setPage] = useState(1);

  const { data: profile } = useGetProfileByUsername({
    username: username || "",
  });
  const { data: currentProfile } = useGetCurrentProfile();

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

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-20">
        <HugeiconsIcon
          icon={File02Icon}
          className="text-muted-foreground"
          size={40}
        />

        <div className="text-center space-y-1">
          <p className="font-medium">Nenhuma publicação</p>
          {currentProfile?.username === profile.username ? (
            <p className="text-sm text-muted-foreground">
              Você ainda não possui nenhuma publicação
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">
              Este usuário não possui nenhuma publicação
            </p>
          )}
        </div>

        {currentProfile?.username === profile.username && (
          <Button size="sm" rounded="md">
            Criar publicação
          </Button>
        )}
      </div>
    );
  }

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
          size="xs"
          className="px-1.5"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={18} strokeWidth={2} />
        </Button>
        <Button
          disabled={!hasNextPage}
          onClick={handleNext}
          aria-label="Próxima página"
          variant="secondary"
          size="xs"
          className="px-1.5"
        >
          <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}
