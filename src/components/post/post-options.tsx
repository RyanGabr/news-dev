import {
  Delete02Icon,
  Edit03Icon,
  MoreHorizontalIcon,
  Share08Icon,
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
import { useDeletePost } from "@/hooks/use-delete-post";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";

export function PostOptions() {
  const { id } = useParams();
  const { data: post } = useGetPost(id ?? "");
  const user = useUser();

  const { mutateAsync, isPending } = useDeletePost();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function deletePost() {
    if (id) {
      await mutateAsync(id);
      navigate("/");
    }
  }

  return (
    <div className="flex items-center gap-2">
      {post.author_id === user?.id && (
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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDialogOpen(true);
                  }}
                >
                  Deletar
                  <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="w-sm">
                <DialogTitle>Deletar postagem</DialogTitle>
                <DialogDescription>
                  Você tem certeza dessa ação? A postagem será deletada
                  permanentemente.
                </DialogDescription>

                <DialogFooter className="flex-row sm:justify-normal">
                  <DialogClose asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      rounded="full"
                      className="w-full"
                    >
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={deletePost}
                    disabled={isPending}
                    size="sm"
                    rounded="full"
                    className="w-full"
                  >
                    Deletar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
