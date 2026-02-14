import { useGetPostById } from "@/hooks/use-posts";
import { MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useUser } from "@supabase/auth-helpers-react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
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
          <Button variant="outline" className="px-2">
            <HugeiconsIcon icon={MoreHorizontalIcon} size={18} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52">
          <EditPost post={post} />
          <DeletePost />
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
