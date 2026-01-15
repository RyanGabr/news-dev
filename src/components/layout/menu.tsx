import { useGetProfileById } from "@/hooks/use-profile";
import { useUserLogout } from "@/hooks/use-auth";
import { useUser } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  Edit03Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { VerifiedIcon } from "../ui/verified-icon";

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
        <button className="cursor-pointer hover:scale-98 transition">
          <img
            src="https://pbs.twimg.com/profile_images/1999199376619581440/8W7FN5gc_400x400.jpg"
            alt=""
            className="min-w-9 max-w-9 rounded-full"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-0" align="end" sideOffset={10}>
        <div className="relative">
          <div className="bg-foreground/8 w-full h-20" />
          <div>
            <img
              src="https://pbs.twimg.com/profile_images/1999199376619581440/8W7FN5gc_400x400.jpg"
              alt=""
              className="min-w-18 max-w-18 rounded-full border-4 border-popover absolute left-3 -bottom-6 z-50"
            />
          </div>
        </div>

        <div className="mt-10 mx-4 flex flex-col gap-1.5">
          <div className="flex items-center">
            <strong
              className="font-medium cursor-pointer hover:underline"
              onClick={() => navigate(`/${profile.username}`)}
            >
              {profile.username}
            </strong>
            <VerifiedIcon className="scale-80" />
          </div>
          <p className="text-[13px] text-muted-foreground line-clamp-2 text-ellipsis">
            {profile.bio}
          </p>
        </div>

        <DropdownMenuSeparator className="mt-4 mx-4" />

        <div className="bg-secondary-foreground dark:bg-foreground/5 m-4 rounded-md">
          <DropdownMenuItem className="px-4 py-3 rounded-md rounded-b-none">
            Editar perfil
            <HugeiconsIcon icon={Edit03Icon} strokeWidth={2} />
          </DropdownMenuItem>
          <DropdownMenuItem className="px-4 py-3 rounded-none">
            Configurações
            <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="px-4 py-3 rounded-md rounded-t-none"
          >
            Sair da conta
            <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
