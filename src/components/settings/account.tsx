import { useGetProfileById } from "@/hooks/use-profile";
import { type User } from "@supabase/auth-helpers-react";
import Avvvatars from "avvvatars-react";
import { UpdateProfile } from "./update-profile";

interface AccountProps {
  user: User;
}

export function Account({ user }: AccountProps) {
  const { data: profile } = useGetProfileById({
    id: user.id,
  });

  return (
    <div className="space-y-5">
      <p className="font-medium text-muted-foreground">Conta</p>

      <div className="bg-secondary px-4 py-3 rounded-lg">
        <p className="text-sm">Email</p>
        <p className="text-sm text-muted-foreground">
          Conectado como {user.email}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt=""
              className="min-w-12 max-w-12 rounded-full"
            />
          ) : (
            <Avvvatars value={profile.username} size={48} style="shape" />
          )}

          <div>
            <p className="font-medium text-sm">{profile.display_name}</p>
            <p className="text-[13px] text-muted-foreground line-clamp-1">
              {profile.bio}
            </p>
          </div>
        </div>

        <div>
          <UpdateProfile profile={profile} />
        </div>
      </div>
    </div>
  );
}
