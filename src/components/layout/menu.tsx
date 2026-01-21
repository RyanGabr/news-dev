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
          <img
            src="https://pbs.twimg.com/profile_images/1999199376619581440/8W7FN5gc_400x400.jpg"
            alt=""
            className="min-w-7 max-w-7 rounded-full"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end" sideOffset={10}>
        <DropdownMenuItem
          onClick={() => navigate(`/${profile.username}`)}
          className="justify-normal gap-3"
        >
          <img
            src="https://pbs.twimg.com/profile_images/1999199376619581440/8W7FN5gc_400x400.jpg"
            alt=""
            className="rounded-full min-w-9 max-w-9"
          />

          <div className="flex flex-col">
            <span className="text-base font-medium">{profile.username}</span>
            <span className="text-xs font-medium text-muted-foreground line-clamp-1 text-ellipsis">
              {profile.bio}
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
