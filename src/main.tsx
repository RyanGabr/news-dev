import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { supabase } from "./lib/supabase";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
      <Toaster />
    </SessionContextProvider>
  </StrictMode>,
);
