import { useCreatePost } from "@/hooks/use-create-post";
import { postSchema, type PostFormData } from "@/schemas/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import "easymde/dist/easymde.min.css";
import { useEffect, useMemo, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Controller, useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import SimpleMdeEditor from "react-simplemde-editor";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const LOCAL_STORAGE_DRAFT_KEY = "content-new";

// Obtem o rascunho do Local Storage
const getDraftFromLocalStorage = (): PostFormData | null => {
  const savedDraftString = localStorage.getItem(LOCAL_STORAGE_DRAFT_KEY);
  if (savedDraftString) {
    try {
      return JSON.parse(savedDraftString);
    } catch (e) {
      console.error("Erro ao carregar rascunho:", e);
      localStorage.removeItem(LOCAL_STORAGE_DRAFT_KEY);
    }
  }
  return null;
};

export function PublishForm() {
  const { mutateAsync, isPending } = useCreatePost();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: getDraftFromLocalStorage() || { title: "", content: "" },
  });

  const formValues = watch();

  useEffect(() => {
    if (formValues.title.trim() || formValues.content.trim()) {
      try {
        const draftString = JSON.stringify(formValues);
        localStorage.setItem(LOCAL_STORAGE_DRAFT_KEY, draftString);
      } catch (e) {
        console.error("Erro ao salvar rascunho:", e);
      }
    } else {
      localStorage.removeItem(LOCAL_STORAGE_DRAFT_KEY);
    }
  }, [formValues]);

  async function createPost(data: PostFormData) {
    await mutateAsync(data, {
      onSuccess: (newPostData) => {
        localStorage.removeItem(LOCAL_STORAGE_DRAFT_KEY);
        reset({ title: "", content: "" });
        navigate(`/post/${newPostData[0].id}`);
        setDialogIsOpen(false);
      },
      onError: (err) => {
        console.log(err);
      },
    });
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
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" rounded="full" size="icon">
              <HugeiconsIcon icon={Add01Icon} strokeWidth={2} size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={5}>Publicar</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="w-2xl">
        <form onSubmit={handleSubmit(createPost)} className="space-y-5">
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
                    type="text"
                    placeholder="Dê um título para sua postagem"
                    className="w-full text-2xl placeholder:font-medium font-semibold outline-none"
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
                  className={`text-sm text-muted-foreground ${formValues.content.length > 20000 && "text-red-400 font-semibold"}`}
                >
                  {formValues.content.length} / 20000
                </span>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-end gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                rounded="full"
                onClick={() => {
                  setTimeout(() => {
                    reset({ title: "", content: "" });
                  }, 500);
                  localStorage.removeItem(LOCAL_STORAGE_DRAFT_KEY);
                }}
              >
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isPending} rounded="full">
              Publicar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
