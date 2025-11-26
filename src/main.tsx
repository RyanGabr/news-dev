import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./lib/supabase";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </StrictMode>,
);
