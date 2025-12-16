import { useUserLogout } from "@/hooks/use-user-logout";
import {
  ArrowUpRight01Icon,
  LogoutSquare02Icon,
  PencilEdit02Icon,
  Settings03Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useUser } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useGetProfileById } from "@/hooks/use-get-profile";

export function Menu() {
  const { mutateAsync } = useUserLogout();
  const navigate = useNavigate();
  const user = useUser();

  const { data: profile } = useGetProfileById({
    id: user?.id || "",
  });

  async function handleLogout() {
    await mutateAsync();
    navigate("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer hover:opacity-90 transition rounded-full">
          <img
            src="https://pbs.twimg.com/profile_images/1999199376619581440/8W7FN5gc_400x400.jpg"
            alt=""
            className="w-10 rounded-full"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuItem>
          <div>
            <img
              src="https://pbs.twimg.com/profile_images/1999199376619581440/8W7FN5gc_400x400.jpg"
              alt=""
              className="min-w-10 max-w-10 rounded-full"
            />
          </div>
          <div>
            <strong>{profile.username}</strong>
            {profile.bio && (
              <p className="text-foreground/50 text-sm line-clamp-1 text-ellipsis">
                {profile.bio}
              </p>
            )}
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="opacity-50 mx-2" />

        <DropdownMenuItem>
          <HugeiconsIcon icon={PencilEdit02Icon} strokeWidth={2} />
          Editar perfil
        </DropdownMenuItem>

        <DropdownMenuItem>
          <HugeiconsIcon icon={Settings03Icon} strokeWidth={2} />
          Configurações
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            window.open("https://github.com/RyanGabr/news-dev", "_blank")
          }
        >
          <HugeiconsIcon icon={StarIcon} strokeWidth={2} />
          Apoiar projeto
          <div className="grow flex justify-end">
            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              strokeWidth={2}
              className="opacity-50"
            />
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleLogout}>
          <HugeiconsIcon icon={LogoutSquare02Icon} strokeWidth={2} />
          Sair da conta
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
