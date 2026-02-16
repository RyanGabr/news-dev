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
import Avvvatars from "avvvatars-react";
import { useGetCurrentProfile } from "@/hooks/use-profile";

export function CommentList() {
  const { id } = useParams();
  const { data: currentProfile } = useGetCurrentProfile();

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
        <div key={comment.id} className="flex items-start gap-3">
          <div>
            {comment.author?.avatar_url ? (
              <img
                src={comment.author?.avatar_url ?? ""}
                alt="Profile avatar"
                className="min-w-8 max-w-8 min-h-8 max-h-8 rounded-full"
              />
            ) : (
              <Avvvatars
                value={comment.author?.username ?? ""}
                size={32}
                style="shape"
              />
            )}
          </div>

          <div className="w-full space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-2">
                  <Link to="" className="flex items-center gap-2">
                    <p className="font-medium text-[15px]">
                      {comment.author?.display_name}
                    </p>
                    <p className="text-[15px] text-muted-foreground">
                      @{comment.author?.username}
                    </p>
                  </Link>

                  <p className="text-muted-foreground text-[15px]">3d</p>
                </div>
              </div>

              {currentProfile?.id === comment.author_id && (
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="blank" className="p-0">
                        <HugeiconsIcon icon={MoreVerticalIcon} size={20} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-52">
                      <EditComment comment={comment} />
                      <DeleteComment commentId={comment.id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>

            <div>
              <p className="wrap-break-word text-[15px]">{comment.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
