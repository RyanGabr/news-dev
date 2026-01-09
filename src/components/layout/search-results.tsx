import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetPostsBySearch } from "@/hooks/use-get-posts-by-search";
import { CommandList } from "../ui/command";

function PostSkeleton() {
  return (
    <div className="flex items-center gap-3.5 px-3 py-4 w-full">
      <div>
        <Skeleton className="bg-foreground/10 min-w-9 max-w-9 rounded-full h-9" />
      </div>

      <div className="space-y-2">
        <Skeleton className="bg-foreground/10 rounded-full w-64 h-3" />
        <Skeleton className="bg-foreground/10 rounded-full w-32 h-3" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex items-center justify-center py-5">
      <p className="text-muted-foreground">Nenhum resultado encontrado</p>
    </div>
  );
}

interface SearchResultsProps {
  search: string;
}

export function SearchResults({ search }: SearchResultsProps) {
  const debouncedSearch = useDebounce(search, 500);
  const isTyping = search !== debouncedSearch;

  const { data: posts, isLoading } = useGetPostsBySearch({
    search: debouncedSearch,
  });

  function formatPostDate(date: string) {
    const postCreatedAt = new Date(date);

    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("pt-BR", dateOptions).format(postCreatedAt);
  }

  function renderContent() {
    if (isLoading || isTyping) {
      return Array.from({ length: 5 }).map((_, index) => (
        <PostSkeleton key={index} />
      ));
    }

    if (!posts || posts.length === 0) {
      return <EmptyState />;
    }

    return posts.map((post) => (
      <Link
        key={post.id}
        to={`/post/${post.id}`}
        className="px-3 py-4 flex items-center gap-3.5 rounded-md hover:bg-foreground/7 cursor-pointer transition"
      >
        <div>
          <img
            src="https://pbs.twimg.com/profile_images/1999199376619581440/8W7FN5gc_400x400.jpg"
            alt=""
            className="min-w-9 max-w-9 rounded-full"
          />
        </div>

        <div>
          <h3 className="text-base line-clamp-1 text-ellipsis">{post.title}</h3>
          <p className="text-xs text-muted-foreground">
            {post.created_at && formatPostDate(post.created_at)}
          </p>
        </div>
      </Link>
    ));
  }

  return (
    <CommandList className="p-2 border-t w-full">{renderContent()}</CommandList>
  );
}
