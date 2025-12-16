import { useUser } from "@supabase/auth-helpers-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu } from "./menu";

export function Layout() {
  const user = useUser();
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col">
      <header className="w-200 mx-auto py-4 flex items-center justify-between">
        <div>
          <Link to="/">
            <img
              src="https://www.notion.com/front-static/favicon.ico"
              alt=""
              className="w-10"
            />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {!user && (
            <>
              <Button onClick={() => navigate("/signup")} variant="secondary">
                Cadastrar
              </Button>
              <Button onClick={() => navigate("/login")}>Entrar</Button>
            </>
          )}
          {user && (
            <>
              <Button onClick={() => navigate("/publish")}>Postar</Button>
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
