import { useCreatePost } from "@/hooks/use-create-post";
import { postSchema, type PostFormData } from "@/schemas/post";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactDOMServer from "react-dom/server";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import ReactMarkdown from "react-markdown";
import "easymde/dist/easymde.min.css";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SimpleMdeEditor from "react-simplemde-editor";

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

export function PostForm() {
  const { mutateAsync, isPending } = useCreatePost();
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
        "side-by-side",
        "fullscreen",
      ],
      sideBySideFullscreen: false,
      status: false,
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(createPost)} className="space-y-5">
      <div className="space-y-1.5">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              autoFocus
              type="text"
              placeholder="Digite o título da sua publicação"
              className="p-2.5 rounded-md border border-black/15 text-sm w-full"
            />
          )}
        />
        {errors.title && (
          <p className="text-sm text-red-400">{errors.title.message}</p>
        )}
      </div>

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

      <div className="w-full flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem(LOCAL_STORAGE_DRAFT_KEY);
            navigate("/");
          }}
          className="bg-transparent rounded-md py-2 px-4 text-muted-foreground text-sm cursor-pointer hover:bg-foreground/5"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="bg-black rounded-md py-2 px-4 text-white text-sm disabled:opacity-50 cursor-pointer"
        >
          Publicar
        </button>
      </div>
    </form>
  );
}
