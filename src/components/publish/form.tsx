import { useCreatePost } from "@/hooks/use-posts";
import { postSchema, type PostFormData } from "@/schemas/post";
import { zodResolver } from "@hookform/resolvers/zod";
import "easymde/dist/easymde.min.css";
import { useEffect, useMemo } from "react";
import ReactDOMServer from "react-dom/server";
import { Controller, useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import SimpleMdeEditor from "react-simplemde-editor";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

export const LOCAL_STORAGE_DRAFT_KEY = "content-new";

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

export function Form() {
  const { mutateAsync } = useCreatePost();
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
        toast.success("Publicação criada com sucesso!", {
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
      onError: (err: Error) => {
        console.log(err);
      },
    });
  }

  const adjustTextAreaHeight = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const mdeOptions = useMemo((): EasyMDE.Options => {
    return {
      spellChecker: false,
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
      placeholder: "Comece a escrever",
    };
  }, []);

  return (
    <form
      id="create-post-form"
      onSubmit={handleSubmit(createPost)}
      className="space-y-5 p-6"
    >
      <div className="flex flex-col gap-6">
        <div className="space-y-1.5 w-full">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                autoFocus
                spellCheck={false}
                placeholder="Título"
                className="w-full text-5xl font-bold tracking-tight outline-none text-center resize-none overflow-hidden placeholder:opacity-60"
                onChange={(e) => {
                  field.onChange(e);
                  adjustTextAreaHeight(e.target);
                }}
                ref={(el) => {
                  field.ref(el);
                  if (el) adjustTextAreaHeight(el);
                }}
                rows={1}
              />
            )}
          />
          {errors.title && (
            <p className="text-sm text-red-400">{errors.title.message}</p>
          )}
        </div>
      </div>

      <hr className="max-w-2xl mx-auto" />

      <div className="space-y-2 max-w-2xl mx-auto">
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
              <p className="text-sm text-red-400">{errors.content.message}</p>
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
    </form>
  );
}
