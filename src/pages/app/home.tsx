import { Categories } from "@/components/home/categories";
import { PostList } from "@/components/home/post-list";

export function Home() {
  return (
    <div className="px-4 w-full xl:px-0 xl:w-3/4 2xl:w-1/2 mx-auto py-10 space-y-5">
      <Categories />
      <PostList />
    </div>
  );
}
