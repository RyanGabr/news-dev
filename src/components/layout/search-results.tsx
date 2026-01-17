import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetPostsBySearch } from "@/hooks/use-posts";
import { CommandList } from "../ui/command";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";

function PostSkeleton() {
  return (
    <div className="flex items-center gap-3.5 px-3 py-4 w-full">
      <div>
        <Skeleton className="bg-foreground/10 min-w-9 max-w-9 rounded-full h-9" />
      </div>

      <div className="space-y-2">
        <Skeleton className="bg-foreground/10 rounded-[2px] w-64 h-3" />
        <Skeleton className="bg-foreground/10 rounded-[2px] w-32 h-3" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <div className="bg-foreground/10 p-3 rounded-full text-muted-foreground">
        <HugeiconsIcon icon={Search01Icon} strokeWidth={3} />
      </div>

      <p className="text-muted-foreground font-medium text-lg">
        Nenhum resultado encontrado
      </p>
    </div>
  );
}

interface SearchResultsProps {
  search: string;
  setCommandOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchResults({ search, setCommandOpen }: SearchResultsProps) {
  const debouncedSearch = useDebounce(search, 500);
  const isTyping = search !== debouncedSearch;

  const { data: posts, isLoading } = useGetPostsBySearch({
    search: debouncedSearch,
  });

  function renderContent() {
    if (isLoading || isTyping) {
      return Array.from({ length: 3 }).map((_, index) => (
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
        className="px-3 py-3 flex items-center gap-3.5 rounded-md hover:bg-foreground/7 cursor-pointer transition"
        onClick={() => setCommandOpen(false)}
      >
        <div>
          <img
            src="https://pbs.twimg.com/profile_images/1999199376619581440/8W7FN5gc_400x400.jpg"
            alt=""
            className="min-w-8 max-w-8 rounded-full"
          />
        </div>

        <div>
          <h3 className="text-base line-clamp-1 text-ellipsis">{post.title}</h3>
        </div>
      </Link>
    ));
  }

  return (
    <CommandList className="p-2 border-t w-full">{renderContent()}</CommandList>
  );
}
