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
        <button className="cursor-pointer">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              className="min-w-8 max-w-8 rounded-full"
            />
          ) : (
            <Avvvatars value={profile.username} size={32} style="shape" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="end" sideOffset={10}>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate(`/${profile.username}`)}>
            Ver perfil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/settings")}>
            Configuraçoes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
