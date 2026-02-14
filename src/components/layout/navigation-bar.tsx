import { useUser } from "@supabase/auth-helpers-react";
import { Activity } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu } from "./menu";
import { PostNavigationBar } from "./post-navigation-bar";
import { Search } from "./search";
import { PublishBar } from "./publish-bar";

export function NavigationBar() {
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const isPostPage = location.pathname.includes("post");
  const isPublishPage = location.pathname.includes("publish");

  return (
    <>
      <nav className="w-full px-6 xl:px-0 py-3 sticky top-0 bg-background rounded-t-2xl">
        <Activity mode={isPostPage || isPublishPage ? "hidden" : "visible"}>
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-5">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="https://www.notion.com/front-static/favicon.ico"
                  alt=""
                  className="w-6"
                />

                <h3 className="font-extrabold text-lg">lumi</h3>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Search />
              {user ? (
                <>
                  <Button size="sm" onClick={() => navigate("/publish")}>
                    Criar
                  </Button>
                  <Menu />
                </>
              ) : (
                <Button onClick={() => navigate("/login")} size="sm">
                  Entrar ou Inscrever-se
                </Button>
              )}
            </div>
          </div>
        </Activity>

        {isPostPage && <PostNavigationBar />}
        {isPublishPage && <PublishBar />}
      </nav>
    </>
  );
}
