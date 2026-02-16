import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      document.title = "Lumi - Leia, escreva e compartilhe com a comunidade";
    } else if (location.pathname === "/settings") {
      document.title = "Configurações";
    } else if (location.pathname === "/login") {
      document.title = "Login";
    } else if (location.pathname === "/signup") {
      document.title = "Inscrever-se";
    }
  }, [location]);

  return null;
}
