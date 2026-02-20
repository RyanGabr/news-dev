import { Account } from "@/components/settings/account";
import { Header } from "@/components/settings/header";
import { Theme } from "@/components/settings/theme";
import { useUser } from "@supabase/auth-helpers-react";

export default function Settings() {
  const user = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="px-6 md:px-0 max-w-2xl mx-auto pt-0 md:pt-10 py-10 space-y-10">
      <Header />
      <Account user={user} />
      <Theme />
    </div>
  );
}
