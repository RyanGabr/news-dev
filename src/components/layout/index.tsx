import { useUser } from "@supabase/auth-helpers-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu } from "./menu";
import { PublishForm } from "./publish-form";

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
          {user ? (
            <>
              <PublishForm />
              <Menu />
            </>
          ) : (
            <Button onClick={() => navigate("/login")} size="sm" rounded="full">
              Entrar ou Inscrever-se
            </Button>
          )}
        </div>
      </header>

      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
