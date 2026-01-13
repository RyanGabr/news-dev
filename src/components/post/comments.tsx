import { useGetComments } from "@/hooks/use-comments";
import { Link, useParams } from "react-router-dom";

export function Comments() {
  const { id } = useParams();
  const { data: comments } = useGetComments({
    postId: id ?? "",
  });

  return (
    <section>
      <h2 className="font-semibold text-2xl tracking-tight">Comentários</h2>

      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4 py-6">
            <div className="flex items-center gap-2.5 mt-3">
              <img
                src="https://pbs.twimg.com/profile_images/1999199376619581440/8W7FN5gc_400x400.jpg"
                alt=""
                className="min-w-7 max-w-7 rounded-full"
              />

              <div className="flex items-center gap-2">
                <Link to="">
                  <p className="font-semibold">{comment.author?.username}</p>
                </Link>

                <div className="w-[3px] h-[3px] rounded-full bg-muted-foreground" />

                <p className="text-muted-foreground">5 horas atrás</p>
              </div>
            </div>

            <div>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
