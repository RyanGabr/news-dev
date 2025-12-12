import { PostForm } from "@/components/publish/post-form";

export function Publish() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-5">
      <div>
        <h1 className="font-semibold text-3xl">Publicar</h1>
      </div>

      <PostForm />
    </div>
  );
}
