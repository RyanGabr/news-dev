import { Comments } from "@/components/post/comments";
import { Loading } from "@/components/post/loading";
import { PostContent } from "@/components/post/post-content";
import { PostHeader } from "@/components/post/post-header";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export function Post() {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-0 pb-10 space-y-8">
      <Suspense fallback={<Loading />}>
        <PostHeader />

        <div className="max-w-2xl mx-auto space-y-8">
          <PostContent />
          <div className="bg-secondary py-14 px-5 rounded-lg flex flex-col items-center justify-center gap-5">
            <div className="text-center space-y-1">
              <h2 className="text-lg font-medium">
                Compartilhe com seus amigos
              </h2>
              <p className="text-sm text-muted-foreground">
                Leia, escreva e compartilhe com a comunidade
              </p>
            </div>

            <Button size="sm">Compartilhar</Button>
          </div>
          <Comments />
        </div>
      </Suspense>
    </div>
  );
}
