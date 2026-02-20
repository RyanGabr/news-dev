import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "../ui/theme-provider";

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
          onClick={() => setTheme("system")}
          className="flex flex-col gap-3 items-start cursor-pointer group"
        >
          <div className="w-full h-20 sm:h-32 bg-foreground/10 rounded-lg opacity-50"></div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Sistema</p>

            {theme === "system" && (
              <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2} />
            )}
          </div>
        </button>

        <button
          onClick={() => setTheme("dark")}
          className="flex flex-col gap-3 items-start cursor-pointer group"
        >
          <div className="w-full h-20 sm:h-32 bg-foreground/10 rounded-lg opacity-50"></div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Escuro</p>

            {theme === "dark" && (
              <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2} />
            )}
          </div>
        </button>

        <button
          onClick={() => setTheme("light")}
          className="flex flex-col gap-3 items-start cursor-pointer group"
        >
          <div className="w-full h-20 sm:h-32 bg-foreground/10 rounded-lg opacity-50"></div>
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
