import { HugeiconsIcon } from "@hugeicons/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Edit03Icon } from "@hugeicons/core-free-icons";
import { useMemo, useState } from "react";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { Button } from "../ui/button";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { postSchema, type PostFormData } from "@/schemas/post";
import SimpleMdeEditor from "react-simplemde-editor";
import type { PostWithAuthor } from "@/types/post";
import { useUpdatePost } from "@/hooks/use-posts";
import { useParams } from "react-router-dom";
import z from "zod/v3";

interface EditPostProps {
  post: PostWithAuthor;
}

export function EditPost({ post }: EditPostProps) {
  const { id } = useParams();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { mutateAsync, isPending } = useUpdatePost();

  if (!id) {
    throw new Error("Post not found");
  }

  const postId = z.string().uuid().parse(id);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  });

  const formValues = useWatch({
    control: control,
  });

  async function editComment(data: PostFormData) {
    await mutateAsync(
      {
        title: data.title,
        content: data.content,
        postId,
      },
      {
        onSuccess: () => {
          setDialogIsOpen(false);
        },
      },
    );
  }

  const mdeOptions = useMemo((): EasyMDE.Options => {
    return {
      spellChecker: false,
      minHeight: "500px",
      maxHeight: "500px",
      previewRender(markdownText: string) {
        return ReactDOMServer.renderToString(
          <div className="prose prose-blue prose-headings:font-semibold prose-headings:my-4 prose-p:m-0 prose-hr:my-4 prose-li:m-0 prose-p:mb-5 prose-p:mt-5 prose-code:text-foreground">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {markdownText}
            </ReactMarkdown>
          </div>,
        );
      },
      toolbar: [
        "heading",
        "bold",
        "italic",
        "quote",
        "link",
        "code",
        "unordered-list",
        "ordered-list",
        "strikethrough",
        "horizontal-rule",
        "image",
        "|",
        "guide",
        "preview",
        // "side-by-side",
        // "fullscreen",
      ],
      sideBySideFullscreen: false,
      status: false,
      placeholder: "O que está acontecendo?",
    };
  }, []);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setDialogIsOpen(true);
          }}
        >
          Editar
          <HugeiconsIcon icon={Edit03Icon} strokeWidth={2} />
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="w-3xl border border-border/70">
        <form onSubmit={handleSubmit(editComment)} className="space-y-5">
          <div className="flex flex-col gap-6">
            <div>
              <img
                src="https://pbs.twimg.com/profile_images/1999199376619581440/8W7FN5gc_400x400.jpg"
                alt=""
                className="rounded-full min-w-11 max-w-11"
              />
            </div>

            <div className="space-y-1.5 w-full">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    autoFocus
                    spellCheck={false}
                    type="text"
                    placeholder="Título da postagem"
                    className="w-full text-3xl font-semibold outline-none"
                  />
                )}
              />
              {errors.title && (
                <p className="text-sm text-red-400">{errors.title.message}</p>
              )}
            </div>
          </div>

          <hr />

          <div className="space-y-2">
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <SimpleMdeEditor
                  value={field.value}
                  onChange={field.onChange}
                  options={mdeOptions}
                />
              )}
            />
            <div className="flex items-center justify-between">
              <div>
                {errors.content && (
                  <p className="text-sm text-red-400">
                    {errors.content.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1">
                <span
                  className={`text-sm text-muted-foreground ${formValues.content && formValues.content.length > 20000 && "text-red-400 font-semibold"}`}
                >
                  {formValues.content?.length ?? 0} / 20000
                </span>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-end gap-2">
            <DialogClose asChild>
              <Button
                onClick={() => {
                  setTimeout(() => {
                    reset({ title: post.title, content: post.content });
                  }, 500);
                }}
                type="button"
                variant="ghost"
                rounded="full"
              >
                Cancelar
              </Button>
            </DialogClose>

            <Button
              type="submit"
              rounded="full"
              disabled={
                (formValues.title?.trim() === post.title &&
                  formValues.content?.trim() === post.content) ||
                isPending
              }
            >
              Editar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
