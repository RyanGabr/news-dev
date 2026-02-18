import { Alert02Icon, Refresh01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouteError } from "react-router-dom";
import { Button } from "./button";

export function ErrorState() {
  const error = useRouteError() as Error;

  console.error("Erro capturado pela rota:", error);

  return (
    <div className="h-screen flex flex-col gap-3 items-center justify-center p-6 text-center">
      <div className="rounded-lg bg-red-500/20 p-2 text-red-400">
        <HugeiconsIcon icon={Alert02Icon} size={24} strokeWidth={2} />
      </div>

      <strong className="text-2xl font-semibold">Ops! Algo deu errado</strong>

      <p className="max-w-md text-sm text-muted-foreground">
        Não conseguimos conectar ao servidor do Lumi. Verifique sua conexão ou
        tente novamente mais tarde.
      </p>

      <div className="mt-2">
        <Button onClick={() => window.location.reload()} className="text-sm">
          <HugeiconsIcon icon={Refresh01Icon} size={18} strokeWidth={2} />
          Tentar novamente
        </Button>
      </div>

      <div className="absolute bottom-10">
        <p className="font-mono dark:text-red-400 text-sm">{error.message}</p>
      </div>
    </div>
  );
}
