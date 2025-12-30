import { PostContent } from "@/components/post/post-content";
import { PostHeader } from "@/components/post/post-header";
import { PostOptions } from "@/components/post/post-options";

export function Post() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-0 py-16 space-y-10">
      <PostOptions />

      <div className="space-y-14">
        <PostHeader />
        <PostContent />
      </div>
    </div>
  );
}
