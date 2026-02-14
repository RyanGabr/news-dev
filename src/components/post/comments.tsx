import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";

export function Comments() {
  return (
    <section className="space-y-10">
      <CommentForm />
      <CommentList />
    </section>
  );
}
