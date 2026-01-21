import { Account } from "@/components/settings/account";
import { Loading } from "@/components/settings/loading";
import { Theme } from "@/components/settings/theme";
import { useUser } from "@supabase/auth-helpers-react";
import { Suspense } from "react";

export function Settings() {
  const user = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="px-4 max-w-4xl mx-auto pt-8 py-10 space-y-10 divide-y">
      <Suspense fallback={<Loading />}>
        <Account user={user} />
        <Theme />
      </Suspense>
    </div>
  );
}
