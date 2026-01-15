import { Categories } from "@/components/home/categories";
// import { Header } from "@/components/home/header";
import { Loading } from "@/components/home/loading";
import { PostList } from "@/components/home/post-list";
import { Suspense } from "react";

export function Home() {
  return (
    <div className="px-6 w-full xl:px-0 xl:w-3/4 2xl:w-1/2 mx-auto py-10 space-y-5">
      <Suspense fallback={<Loading />}>
        {/*<Header />*/}
        <Categories />
        <PostList />
      </Suspense>
    </div>
  );
}
