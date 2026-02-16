import { HugeiconsIcon } from "@hugeicons/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Edit03Icon } from "@hugeicons/core-free-icons";
import { useLayoutEffect, useRef, useState } from "react";
import type { CommentWithAutor } from "@/types/comment";
import { Button } from "../ui/button";
import { useUpdateComment } from "@/hooks/use-comments";
import { useParams } from "react-router-dom";
import z from "zod/v3";
import Avvvatars from "avvvatars-react";
import { toast } from "sonner";

interface EditCommentProps {
  comment: CommentWithAutor;
}

export function EditComment({ comment }: EditCommentProps) {
  const { id } = useParams();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(comment.content);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  if (!id) {
    throw new Error("Post not found");
  }

  const postId = z.string().uuid().parse(id);

  const { mutateAsync, isPending } = useUpdateComment();

  function adjustHeight() {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }

  useLayoutEffect(() => {
    adjustHeight();
  }, [inputValue]);

  useLayoutEffect(() => {
    if (dialogIsOpen) {
      const handle = requestAnimationFrame(() => {
        adjustHeight();

        textAreaRef.current?.focus();
        const length = textAreaRef.current?.value.length || 0;
        textAreaRef.current?.setSelectionRange(length, length);
      });
      return () => cancelAnimationFrame(handle);
    }
  }, [dialogIsOpen]);

  async function updateComment() {
    await mutateAsync(
      {
        commentId: comment.id,
        content: inputValue,
        postId: postId,
      },
      {
        onSuccess: () => {
          setDialogIsOpen(false);
          toast.success("Comentário atualizado com sucesso!", {
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
          <HugeiconsIcon icon={Edit03Icon} />
          Editar comentário
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="w-lg gap-8">
        <div className="flex items-center gap-2.5">
          {comment.author?.avatar_url ? (
            <img
              src={comment.author.avatar_url}
              alt="Profile avatar"
              className="min-w-8 max-w-8 rounded-full"
            />
          ) : (
            <Avvvatars
              value={comment.author?.username ?? ""}
              size={32}
              style="shape"
            />
          )}

          <p className="text-lg">{comment.author?.username}</p>
        </div>

        <div className="m-0">
          <textarea
            ref={textAreaRef}
            rows={1}
            placeholder="Editar comentário..."
            className="w-full outline-none resize-none overflow-hidden"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <DialogFooter className="m-0">
          <DialogClose asChild>
            <Button variant="outline" size="sm" rounded="md">
              Cancelar
            </Button>
          </DialogClose>

          <Button
            type="button"
            size="sm"
            rounded="md"
            onClick={updateComment}
            disabled={inputValue.trim() === comment.content || isPending}
          >
            Editar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
