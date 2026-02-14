import { useCreateComment } from "@/hooks/use-comments";
import { Button } from "../ui/button";
import { Activity, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export function CommentForm() {
  const { id } = useParams();
  const { mutateAsync, isPending } = useCreateComment();
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  if (!id) {
    throw new Error("Post not found");
  }

  const postId = id;

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const element = e.target;

    element.style.height = "auto";

    element.style.height = `${element.scrollHeight}px`;
    setInputValue(element.value);
  }

  function cancelComment() {
    setInputValue("");

    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
    }
  }

  async function createComment() {
    await mutateAsync(
      {
        content: inputValue,
        postId: postId,
      },
      {
        onSuccess: () => {
          setInputValue("");

          if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
          }
        },
      },
    );
  }

  return (
    <div className="flex items-start gap-3 bg-secondary p-4 rounded-lg">
      <form className="flex flex-col gap-3 w-full">
        <textarea
          ref={textAreaRef}
          rows={1}
          placeholder="Escreva um comentário..."
          className="w-full outline-none focus:border-foreground resize-none overflow-hidden text-[15px]"
          value={inputValue}
          onChange={handleInput}
        />

        <Activity mode={inputValue.trim().length > 0 ? "visible" : "hidden"}>
          <div className="flex items-center justify-end w-full gap-2">
            <Button
              onClick={cancelComment}
              type="button"
              variant="ghost"
              size="sm"
            >
              Cancelar
            </Button>

            <Button
              onClick={createComment}
              type="button"
              size="sm"
              disabled={isPending}
            >
              Comentar
            </Button>
          </div>
        </Activity>
      </form>
    </div>
  );
}
