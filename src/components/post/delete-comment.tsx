import { HugeiconsIcon } from "@hugeicons/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
import { useState } from "react";
import { useDeleteComment } from "@/hooks/use-comments";
import { useParams } from "react-router-dom";

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
    await mutateAsync({
      commentId: commentId,
      postId: postId,
    });
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setDialogIsOpen(true);
          }}
          variant="destructive"
        >
          Excluir
          <HugeiconsIcon icon={Delete02Icon} />
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="w-sm">
        <DialogTitle>Excluir comentário</DialogTitle>
        <DialogDescription>
          Excluir seu comentário permanentemente?
        </DialogDescription>

        <DialogFooter className="flex-row sm:justify-normal">
          <DialogClose asChild>
            <Button variant="secondary" size="sm" className="w-full">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            onClick={deleteComment}
            disabled={isPending}
            size="sm"
            className="w-full"
          >
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
