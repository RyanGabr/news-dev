import { Header } from "@/components/home/header";
import { PostList } from "@/components/home/post-list";

export default function Home() {
  return (
    <div className="px-6 xl:px-0 max-w-5xl mx-auto space-y-10 lg:space-y-20 sm:mt-20">
      <Header />
      <PostList />
    </div>
  );
}
