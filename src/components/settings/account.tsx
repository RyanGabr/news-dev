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
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="font-medium">Email</p>
        <p className="text-muted-foreground text-sm">
          Conectado como {user.email}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="font-medium">Informações da conta</p>
          <p className="text-muted-foreground text-sm">
            Edite as informações da sua conta.
          </p>
        </div>

        <div>
          <UpdateProfile profile={profile} />
        </div>
      </div>
    </div>
  );
}
