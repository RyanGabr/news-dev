import { useUserLogout } from "@/hooks/use-auth";
import { useGetProfileById } from "@/hooks/use-profile";
import { useUser } from "@supabase/auth-helpers-react";
import Avvvatars from "avvvatars-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  LogoutSquare01Icon,
  Settings02Icon,
  UserFullViewIcon,
} from "@hugeicons/core-free-icons";

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
        <button aria-label="Abrir menu do usuário" className="cursor-pointer">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              className="min-w-8 max-w-8 rounded-full"
              alt="Profile avatar"
            />
          ) : (
            <Avvvatars value={profile.username} size={32} style="shape" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="end" sideOffset={10}>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate(`/${profile.username}`)}>
            <HugeiconsIcon icon={UserFullViewIcon} />
            Ver perfil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/settings")}>
            <HugeiconsIcon icon={Settings02Icon} />
            Configuraçoes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <HugeiconsIcon icon={LogoutSquare01Icon} />
            Sair
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
