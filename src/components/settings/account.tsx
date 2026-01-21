import { useGetProfileById } from "@/hooks/use-profile";
import { type User } from "@supabase/auth-helpers-react";
import { UpdateProfile } from "./update-profile";

interface AccountProps {
  user: User;
}

export function Account({ user }: AccountProps) {
  const { data: profile } = useGetProfileById({
    id: user.id,
  });

  return (
    <div className="space-y-10">
      <h3 className="font-medium opacity-90">Conta</h3>

      <div className="space-y-3">
        <h2 className="text-2xl">
          Escolha como quer aparecer e o que será exibido para você no Lumi
        </h2>

        <p className="text-muted-foreground text-sm">
          Conectado como {user?.email}
        </p>
      </div>

      <hr />

      <div className="space-y-3">
        <h2 className="font-semibold text-xl">Seu perfil do Lumi</h2>

        <p className="text-xs text-muted-foreground">
          Esta é a exibição do seu perfil no Lumi. É preciso ter uma conta criar
          suas próprias postagens e fazer comentários.
        </p>

        <div className="my-10 flex items-center gap-5">
          <div>
            <img
              src="https://pbs.twimg.com/profile_images/1999199376619581440/8W7FN5gc_400x400.jpg"
              alt=""
              className="min-w-12 max-w-12 rounded-full"
            />
          </div>

          <div className="space-y-1">
            <p>{profile.username}</p>
            <p className="text-xs text-muted-foreground max-w-56 truncate text-ellipsis">
              {profile.bio}
            </p>

            <UpdateProfile profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}
