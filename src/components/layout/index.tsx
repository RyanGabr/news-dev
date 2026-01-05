import { AddCircleHalfDotIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useUser } from "@supabase/auth-helpers-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu } from "./menu";

export function Layout() {
  const user = useUser();
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col">
      <header className="px-6 w-full xl:px-0 xl:w-3/4 2xl:w-1/2 mx-auto py-4 flex items-center justify-between">
        <div>
          <Link to="/">
            <img
              src="https://www.notion.com/front-static/favicon.ico"
              alt=""
              className="w-10"
            />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {!user && (
            <Button onClick={() => navigate("/login")} size="sm" rounded="full">
              Entrar ou Inscrever-se
            </Button>
          )}
          {user && (
            <>
              <Button
                onClick={() => navigate("/publish")}
                variant="secondary"
                rounded="full"
                className="p-3.5"
              >
                <HugeiconsIcon
                  icon={AddCircleHalfDotIcon}
                  strokeWidth={2}
                  size={20}
                />
              </Button>
              <Menu />
            </>
          )}
        </div>
      </header>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
