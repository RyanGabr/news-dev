import { Account } from "@/components/settings/account";
import { Header } from "@/components/settings/header";
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
    <div className="px-6 md:px-0 max-w-2xl mx-auto pt-8 py-10 space-y-10">
      <Suspense fallback={<Loading />}>
        <Header />
        <Account user={user} />
        <Theme />
      </Suspense>
    </div>
  );
}
