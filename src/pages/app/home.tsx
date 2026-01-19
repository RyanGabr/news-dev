import { Categories } from "@/components/home/categories";
import { Header } from "@/components/home/header";
import { Loading } from "@/components/home/loading";
import { PostList } from "@/components/home/post-list";
import { Suspense } from "react";

export function Home() {
  return (
    <div className="px-4 max-w-4xl mx-auto pt-8 py-10 space-y-5">
      <Suspense fallback={<Loading />}>
        <Header />
        <Categories />
        <hr />
        <PostList />
      </Suspense>
    </div>
  );
}
