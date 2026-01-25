import { useUserLogout } from "@/hooks/use-auth";
import { useGetProfileById } from "@/hooks/use-profile";
import { useUser } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import { LogoutSquare01Icon, Settings03Icon } from "@hugeicons/core-free-icons";
import Avvvatars from "avvvatars-react";

export function Menu() {
  const { mutateAsync } = useUserLogout();
  const navigate = useNavigate();
  const user = useUser();

  const { data: profile } = useGetProfileById({
    id: user!.id,
  });

  async function handleLogout() {
    await mutateAsync();
    navigate("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer hover:scale-98 transition ml-2">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              className="min-w-7 max-w-7 rounded-full"
            />
          ) : (
            <Avvvatars value={profile.display_name} size={24} style="shape" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end" sideOffset={10}>
        <DropdownMenuItem
          onClick={() => navigate(`/${profile.username}`)}
          className="justify-normal gap-3"
        >
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              className="min-w-9 max-w-9 rounded-full"
            />
          ) : (
            <Avvvatars value={profile.display_name} size={36} style="shape" />
          )}

          <div className="flex flex-col">
            <span className="text-base font-medium line-clamp-1 text-ellipsis">
              {profile.display_name}
            </span>
            <span className="text-xs font-medium text-muted-foreground line-clamp-1 text-ellipsis">
              @{profile.username}
            </span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/settings")}>
            Configurações <HugeiconsIcon icon={Settings03Icon} />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            Sair <HugeiconsIcon icon={LogoutSquare01Icon} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
