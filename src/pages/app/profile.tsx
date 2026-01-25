import { PostList } from "@/components/profile/post-list";
import { VerifiedIcon } from "@/components/ui/verified-icon";
import { useGetProfileByUsername } from "@/hooks/use-profile";
import Avvvatars from "avvvatars-react";
import { useParams } from "react-router-dom";

export function Profile() {
  const { username } = useParams();

  const { data: profile } = useGetProfileByUsername({
    username: username!,
  });

  return (
    <div className="w-1/2 mx-auto px-4 lg:px-0 pt-10 pb-32 space-y-10">
      <div className="space-y-8">
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            className="min-w-20 max-w-20 rounded-full"
          />
        ) : (
          <Avvvatars value={profile.display_name} size={64} style="shape" />
        )}

        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <h2 className="text-2xl font-semibold">{profile.username}</h2>
            <VerifiedIcon />
          </div>

          <p className="text-muted-foreground">{profile.bio}</p>
        </div>
      </div>

      <PostList />
    </div>
  );
}
