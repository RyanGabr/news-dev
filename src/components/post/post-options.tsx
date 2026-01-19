import { useGetPostById } from "@/hooks/use-posts";
import { MoreHorizontalIcon, Share08Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useUser } from "@supabase/auth-helpers-react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DeletePost } from "./delete-post";
import { EditPost } from "./edit-post";

export function PostOptions() {
  const { id } = useParams();
  const user = useUser();

  if (!id) {
    throw new Error("Post not found");
  }

  const postId = id;

  const { data: post } = useGetPostById({
    id: postId,
  });

  return (
    post.author_id === user?.id && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm" rounded="full">
            <HugeiconsIcon icon={MoreHorizontalIcon} size={20} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-52">
          <DropdownMenuItem>
            Compartilhar
            <HugeiconsIcon icon={Share08Icon} strokeWidth={2} />
          </DropdownMenuItem>
          <EditPost post={post} />
          <DeletePost />
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
