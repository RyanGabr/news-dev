import { useGetPost } from "@/hooks/use-get-post";
import {
  Edit03Icon,
  MoreHorizontalIcon,
  Share08Icon,
} from "@hugeicons/core-free-icons";
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

export function PostOptions() {
  const { id } = useParams();
  const { data: post } = useGetPost(id ?? "");
  const user = useUser();

  return (
    post.author_id === user?.id && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm" rounded="full">
            <HugeiconsIcon icon={MoreHorizontalIcon} size={20} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-52 p-1.5">
          <DropdownMenuItem>
            Compartilhar
            <HugeiconsIcon icon={Share08Icon} strokeWidth={2} />
          </DropdownMenuItem>
          <DropdownMenuItem>
            Editar
            <HugeiconsIcon icon={Edit03Icon} strokeWidth={2} />
          </DropdownMenuItem>
          <DeletePost />
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
