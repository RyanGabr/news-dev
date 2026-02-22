import {
  Moon02Icon,
  Settings05Icon,
  Sun01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "../ui/theme-provider";
import { showSuccessToast } from "@/lib/utils";

export function Theme() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="font-medium">Tema da interface</p>
        <p className="text-muted-foreground text-sm">
          Selecione ou personalize seu tema de UI.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => {
            setTheme("system");
            showSuccessToast({
              message: "Tema alterado com sucesso!",
            });
          }}
          className="flex flex-col gap-3 items-start cursor-pointer group"
        >
          <div className="w-full h-20 sm:h-32 bg-foreground/10 rounded-lg opacity-50 flex items-center justify-center group-hover:bg-foreground/5 transition">
            <HugeiconsIcon
              icon={Settings05Icon}
              size={32}
              className="text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Sistema</p>

            {theme === "system" && (
              <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2} />
            )}
          </div>
        </button>

        <button
          onClick={() => {
            setTheme("dark");
            showSuccessToast({
              message: "Tema alterado com sucesso!",
            });
          }}
          className="flex flex-col gap-3 items-start cursor-pointer group"
        >
          <div className="w-full h-20 sm:h-32 bg-foreground/10 rounded-lg opacity-50 flex items-center justify-center group-hover:bg-foreground/5 transition">
            <HugeiconsIcon
              icon={Moon02Icon}
              size={32}
              className="text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Escuro</p>

            {theme === "dark" && (
              <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2} />
            )}
          </div>
        </button>

        <button
          onClick={() => {
            setTheme("light");
            showSuccessToast({
              message: "Tema alterado com sucesso!",
            });
          }}
          className="flex flex-col gap-3 items-start cursor-pointer group"
        >
          <div className="w-full h-20 sm:h-32 bg-foreground/10 rounded-lg opacity-50 flex items-center justify-center group-hover:bg-foreground/5 transition">
            <HugeiconsIcon
              icon={Sun01Icon}
              size={32}
              className="text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Claro</p>

            {theme === "light" && (
              <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2} />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
