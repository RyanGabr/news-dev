import { useGetProfileByUsername } from "@/hooks/use-profile";
import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Avvvatars from "avvvatars-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function Header() {
  const { username } = useParams();

  const { data: profile } = useGetProfileByUsername({
    username: username!,
  });

  useEffect(() => {
    document.title = `${profile.display_name} (@${profile.username})`;
  }, [profile]);

  const profileCreatedAt = new Date(profile.created_at!);

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };

  const profileFormattedDate = new Intl.DateTimeFormat(
    "pt-BR",
    dateOptions,
  ).format(profileCreatedAt);

  return (
    <div className="bg-popover dark:bg-secondary rounded-lg">
      <div className="h-40 bg-foreground rounded-t-lg" />

      <div className="p-6 space-y-5 relative">
        <div className="flex items-center gap-5 absolute -top-14">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              className="min-w-24 max-w-24 rounded-full border-4 border-popover"
            />
          ) : (
            <div className="rounded-full border-4 border-popover">
              <Avvvatars value={profile.username} size={96} style="shape" />
            </div>
          )}
        </div>

        <div className="mt-8 space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-xl lg:text-2xl font-semibold">
              {profile.display_name}
            </p>
          </div>

          <div>
            {profile.bio && (
              <p className="text-sm leading-4 lg:text-[15px]">{profile.bio}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-muted-foreground">
          <HugeiconsIcon icon={Calendar03Icon} size={18} />
          <p className="text-sm">Entrou em {profileFormattedDate}</p>

          <div className="size-0.5 bg-muted-foreground" />

          <p className="text-sm">@{profile.username}</p>
        </div>
      </div>
    </div>
  );
}
