import { PostList } from "@/components/home/post-list";

export function Home() {
  return (
    <div className="max-w-214 mx-auto px-4 lg:px-0 pt-10 pb-32 space-y-5">
      <div className="px-4 md:px-8 space-y-2">
        <h1 className="text-4xl font-bold">Para você</h1>
        <p className="text-muted-foreground">
          Encontre todos os melhores modelos e configurações criados pela
          comunidade do Notion
        </p>
      </div>

      <PostList />
    </div>
  );
}
