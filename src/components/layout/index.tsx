import { useUserLogout } from "@/hooks/use-user-logout";
import { LogoutSquare02Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useUser } from "@supabase/auth-helpers-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Layout() {
  const user = useUser();
  const navigate = useNavigate();
  const { mutateAsync } = useUserLogout();

  async function handleLogout() {
    await mutateAsync();
    navigate("/");
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <header className="w-full py-4 px-5 bg-gray-900 text-white flex items-center justify-between">
        <div>
          <Link to="/">News dev</Link>
        </div>
        <div className="flex items-center">
          {!user && (
            <Link to="/login" className="p-1 text-sm cursor-pointer">
              Login
            </Link>
          )}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded-md cursor-pointer">
                  <HugeiconsIcon icon={Menu01Icon} size={20} strokeWidth={2} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-52" align="end">
                <DropdownMenuItem onClick={handleLogout} variant="destructive">
                  <HugeiconsIcon icon={LogoutSquare02Icon} />
                  Fazer logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
