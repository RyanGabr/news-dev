import { useUser } from "@supabase/auth-helpers-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu } from "./menu";
import { PublishForm } from "./publish-form";
import { Search } from "./search";

export function Layout() {
  const user = useUser();
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen">
      <header className="w-full px-6 py-4 bg-background fixed top-0">
        <div className="relative flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://www.notion.com/front-static/favicon.ico"
                alt=""
                className="w-9"
              />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Search />
                <PublishForm />
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
