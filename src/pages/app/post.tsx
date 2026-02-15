import { Card } from "@/components/post/card";
import { Comments } from "@/components/post/comments";
import { Loading } from "@/components/post/loading";
import { PostContent } from "@/components/post/post-content";
import { PostHeader } from "@/components/post/post-header";
import { Suspense } from "react";

export function Post() {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-0 pb-10 space-y-8">
      <Suspense fallback={<Loading />}>
        <PostHeader />

        <div className="max-w-2xl mx-auto space-y-8">
          <PostContent />
          <Card />
          <Comments />
        </div>
      </Suspense>
    </div>
  );
}
