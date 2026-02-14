import { useGetPostById } from "@/hooks/use-posts";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate, useParams } from "react-router-dom";
import { PostOptions } from "../post/post-options";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { toast } from "sonner";

export function PostNavigationBar() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    throw new Error("Post not found");
  }

  const { data: post } = useGetPostById({
    id,
  });

  async function copyPostLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast("Link da publicação copiado!", {
        position: "bottom-center",
        style: {
          fontSize: 16,
          height: 50,
          backgroundColor: "var(--foreground)",
          color: "var(--background)",
          border: "none",
        },
      });
    } catch {
      toast.error("Não foi possível copiar o link.");
    }
  }

  return (
    <div className="xl:px-4 flex items-center justify-between relative">
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="px-2"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            Fechar
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-1/2">
        <p className="font-medium line-clamp-1 invisible sm:visible">
          {post.title}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={copyPostLink} size="sm">
          Compartilhar
        </Button>
        <PostOptions />
      </div>
    </div>
  );
}
