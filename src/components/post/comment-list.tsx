import { useGetComments } from "@/hooks/use-comments";
import { MoreVerticalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DeleteComment } from "./delete-comment";
import { EditComment } from "./edit-comment";

export function CommentList() {
  const { id } = useParams();

  if (!id) {
    throw new Error("Post not found");
  }

  const postId = id;

  const { data: comments } = useGetComments({
    postId: postId,
  });

  return (
    <div className="space-y-10">
      {comments.map((comment) => (
        <div key={comment.id} className="space-y-4">
          <div className="flex items-center justify-between">
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" rounded="full">
                    <HugeiconsIcon icon={MoreVerticalIcon} size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-40 p-1.5">
                  <EditComment comment={comment} />
                  <DeleteComment commentId={comment.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div>
            <p className="wrap-break-word">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
