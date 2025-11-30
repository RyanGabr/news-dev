import { useSession } from "@supabase/auth-helpers-react";
import type React from "react";
import { Navigate } from "react-router-dom";

export function AuthRedirect({ children }: { children: React.ReactNode }) {
  const session = useSession();

  if (session) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
