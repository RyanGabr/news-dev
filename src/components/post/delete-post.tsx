import { useDeletePost } from "@/hooks/use-posts";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
      await mutateAsync(
        {
          postId,
        },
        {
          onSuccess: () => {
            navigate("/");
            toast.success("Publicação removida com sucesso!", {
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
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setIsDialogOpen(true);
          }}
        >
          <HugeiconsIcon icon={Delete02Icon} />
          Deletar
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="w-md gap-8">
        <div className="space-y-2">
          <p className="text-lg font-medium">Deletar postagem</p>
          <DialogDescription>
            Você tem certeza dessa ação? A publicação será deletada
            permanentemente.
          </DialogDescription>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" size="sm" rounded="md">
              Cancelar
            </Button>
          </DialogClose>

          <Button
            onClick={deletePost}
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
