import { Header } from "@/components/profile/header";
import { PostList } from "@/components/profile/post-list";

export default function Profile() {
  return (
    <div className="px-6 lg:px-0 max-w-5xl mx-auto space-y-10">
      <Header />
      <PostList />
    </div>
  );
}
