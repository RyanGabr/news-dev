import { useDeleteComment } from "@/hooks/use-comments";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface DeleteCommentProps {
  commentId: string;
}

export function DeleteComment({ commentId }: DeleteCommentProps) {
  const { id } = useParams();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { mutateAsync, isPending } = useDeleteComment();

  if (!id) {
    throw new Error("Post not found");
  }

  const postId = id;

  async function deleteComment() {
    await mutateAsync(
      {
        commentId: commentId,
        postId: postId,
      },
      {
        onSuccess: () => {
          toast.success("Comentário removido com sucesso!", {
            position: "bottom-center",
            style: {
              fontSize: 16,
              height: 50,
              backgroundColor: "var(--foreground)",
              color: "var(--background)",
              border: "none",
            },
          });
        },
      },
    );
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setDialogIsOpen(true);
          }}
        >
          <HugeiconsIcon icon={Delete02Icon} />
          Excluir
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="w-md">
        <p className="text-lg font-medium">Deletar comentário</p>
        <DialogDescription>
          Você realmente deseja deletar seu comentário permanentemente?
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" size="sm" rounded="md">
              Cancelar
            </Button>
          </DialogClose>

          <Button
            onClick={deleteComment}
            disabled={isPending}
            size="sm"
            rounded="md"
          >
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
