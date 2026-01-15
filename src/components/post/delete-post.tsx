import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useDeletePost } from "@/hooks/use-posts";
import { useNavigate, useParams } from "react-router-dom";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";

export function DeletePost() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutateAsync, isPending } = useDeletePost();
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    throw new Error("Post not found");
  }

  const postId = id;

  async function deletePost() {
    if (id) {
      await mutateAsync({
        postId,
      });
      navigate("/");
    }
  }

  return (
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
          Você tem certeza dessa ação? A postagem será deletada permanentemente.
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
  );
}
