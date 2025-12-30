import {
  ArrowLeft02Icon,
  Delete02Icon,
  Edit03Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useGetPost } from "@/hooks/use-get-post";
import { useUser } from "@supabase/auth-helpers-react";

export function PostOptions() {
  const { id } = useParams();
  const { data: post } = useGetPost(id ?? "");
  const user = useUser();

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={() => navigate(-1)}
        variant="secondary"
        className="py-2.5"
      >
        Voltar
        <HugeiconsIcon icon={ArrowLeft02Icon} size={20} />
      </Button>

      {post.author_id === user?.id && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="py-2.5">
              <HugeiconsIcon icon={MoreHorizontalIcon} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem>
              <HugeiconsIcon icon={Edit03Icon} strokeWidth={2} />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
