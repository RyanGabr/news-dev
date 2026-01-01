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
          <DropdownMenuContent align="end" className="w-52 p-1.5">
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
              <DialogContent>
                <DialogTitle>Deletar postagem</DialogTitle>
                <DialogDescription>
                  Você tem certeza dessa ação? A postagem será deletada
                  permanentemente.
                </DialogDescription>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary">Cancelar</Button>
                  </DialogClose>
                  <Button onClick={deletePost} disabled={isPending}>
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
