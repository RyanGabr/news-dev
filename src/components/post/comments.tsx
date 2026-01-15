import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";

export function Comments() {
  return (
    <section className="space-y-10">
      <h2 className="font-semibold text-2xl tracking-tight">Comentários</h2>

      <CommentForm />
      <CommentList />
    </section>
  );
}
