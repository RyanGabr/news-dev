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
    <div className="bg-popover dark:bg-secondary rounded-2xl">
      <div className="h-32 bg-foreground/10 rounded-t-2xl" />

      <div className="p-5 sm:p-6 space-y-5 relative">
        <div className="flex items-center gap-5 absolute -top-14">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              className="min-w-24 max-w-24 rounded-full border-4 border-popover"
              alt="Profile avatar"
            />
          ) : (
            <div className="rounded-full border-4 border-popover">
              <Avvvatars value={profile.username} size={96} style="shape" />
            </div>
          )}
        </div>

        <div className="mt-8 space-y-2">
          <div className="flex items-center gap-2">
            <p className="text-xl lg:text-2xl font-semibold">
              {profile.display_name}
            </p>
            <p className="text-xl text-muted-foreground">@{profile.username}</p>
          </div>

          <div>
            {profile.bio && (
              <p className="text-sm lg:text-[15px]">{profile.bio}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-muted-foreground">
          <HugeiconsIcon icon={Calendar03Icon} size={16} />
          <p className="text-sm">Entrou em {profileFormattedDate}</p>
        </div>
      </div>
    </div>
  );
}
