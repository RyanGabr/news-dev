import { PostContent } from "@/components/post/post-content";
import { PostHeader } from "@/components/post/post-header";

export function Post() {
  return (
    <div className="max-w-2xl mx-auto px-6 lg:px-0 py-10 space-y-10">
      <div className="space-y-8 md:space-y-14">
        <PostHeader />
        <PostContent />
      </div>
    </div>
  );
}
