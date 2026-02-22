import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useUser } from "@supabase/auth-helpers-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PostOptions } from "../post/post-options";
import { Button } from "../ui/button";
import { Menu } from "./menu";
import { Search } from "./search";
import { PublishActions } from "./publish-actions";
import Logo from "@/assets/logo.svg";

export function NavigationBar() {
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const isPostPage = location.pathname.includes("post");
  const isPublishPage = location.pathname.includes("publish");
  const isStandardView = !isPostPage && !isPublishPage;

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
        },
      });
    } catch {
      toast.error("Não foi possível copiar o link.");
    }
  }

  return (
    <nav className="w-full py-3 sticky top-0 bg-background rounded-t-2xl z-50">
      <div
        className={`mx-auto flex items-center justify-between px-4 ${isStandardView ? "max-w-5xl xl:px-0" : "w-full"}`}
      >
        {/* Lado Esquerdo: Logo ou Voltar */}
        <div>
          {isStandardView ? (
            <Link to="/" className="flex items-center gap-2.5">
              <img src={Logo} alt="Logo" className="w-7 dark:invert" />
            </Link>
          ) : (
            <Button
              onClick={() => navigate("/")}
              aria-label="Fechar"
              variant="outline"
              className="px-2"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={18} />
            </Button>
          )}
        </div>

        {/* Lado Direito: Busca + Ações Contextuais */}
        <div className="flex items-center gap-2">
          {!isPublishPage && <Search />}

          {isStandardView && (
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <Button size="sm" onClick={() => navigate("/publish")}>
                    Criar
                  </Button>
                  <Menu />
                </>
              ) : (
                <Button onClick={() => navigate("/login")} size="sm">
                  Entrar
                </Button>
              )}
            </div>
          )}
          {isPostPage && (
            <div className="flex items-center gap-2">
              <Button onClick={copyPostLink} size="sm">
                Compartilhar
              </Button>
              <PostOptions />
            </div>
          )}
          {isPublishPage && <PublishActions />}
        </div>
      </div>
    </nav>
  );
}
