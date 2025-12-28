import { PostList } from "@/components/profile/post-list";
import { useGetProfileByUsername } from "@/hooks/use-get-profile";
import { CheckmarkBadge02Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useParams } from "react-router-dom";

export function Profile() {
  const { username } = useParams();

  const { data: profile } = useGetProfileByUsername({
    username: username || "",
  });

  return (
    <div className="max-w-214 mx-auto px-4 lg:px-0 pt-10 pb-32 space-y-10">
      <div className="space-y-8 px-4 md:px-8">
        <img
          src="https://pbs.twimg.com/profile_images/1999199376619581440/8W7FN5gc_400x400.jpg"
          alt=""
          className="w-20 rounded-full"
        />

        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <h2 className="text-2xl font-semibold">{profile.username}</h2>
            <div className="relative">
              <HugeiconsIcon
                icon={Tick02Icon}
                className="z-20 absolute top-1/2 left-1/2 -translate-1/2 text-white"
                size={14}
                strokeWidth={2.5}
              />
              <HugeiconsIcon
                icon={CheckmarkBadge02Icon}
                fill="dodgerblue"
                className="text-transparent"
                size={28}
              />
            </div>
          </div>

          <p className="text-muted-foreground">{profile.bio}</p>
        </div>
      </div>

      <PostList />
    </div>
  );
}
