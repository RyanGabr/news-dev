import { AiMagicIcon, VisualStudioCodeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useUser } from "@supabase/auth-helpers-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Menu } from "./menu";
import { PublishForm } from "./publish-form";
import { Search } from "./search";

export function Layout() {
  const user = useUser();
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen">
      <header className="w-full p-3.5 bg-background fixed top-0">
        <div className="relative flex items-center justify-between">
          <Link to="/">
            <HugeiconsIcon
              icon={AiMagicIcon}
              fill="var(--foreground)"
              className="opacity-60"
            />
          </Link>

          <div className="flex items-center">
            {user ? (
              <>
                <PublishForm />
                <Search />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="blank"
                      className="py-0 text-muted-foreground hover:text-foreground px-2"
                    >
                      <HugeiconsIcon icon={VisualStudioCodeIcon} size={17} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Código — GitHub</TooltipContent>
                </Tooltip>
                <Menu />
              </>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                size="sm"
                rounded="full"
              >
                Entrar ou Inscrever-se
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="w-full mt-18">
        <Outlet />
      </main>
    </div>
  );
}
