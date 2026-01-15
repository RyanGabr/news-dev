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
    <div className="flex items-start gap-3">
      <div>
        <img
          src="https://pbs.twimg.com/profile_images/1999199376619581440/8W7FN5gc_400x400.jpg"
          alt=""
          className="min-w-7 max-w-7 rounded-full"
        />
      </div>

      <form className="flex flex-col gap-3 w-full">
        <div>
          <textarea
            ref={textAreaRef}
            rows={1}
            placeholder="Adicione um comentário..."
            className="border-b w-full outline-none focus:border-foreground resize-none h-9 pb-2 overflow-hidden"
            value={inputValue}
            onChange={handleInput}
          />
        </div>

        <Activity mode={inputValue.trim().length > 0 ? "visible" : "hidden"}>
          <div className="flex items-center justify-end w-full gap-2">
            <Button
              onClick={cancelComment}
              type="button"
              variant="ghost"
              rounded="full"
              size="sm"
            >
              Cancelar
            </Button>

            <Button
              onClick={createComment}
              type="button"
              rounded="full"
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
