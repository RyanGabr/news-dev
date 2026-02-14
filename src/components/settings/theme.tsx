import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "../ui/theme-provider";

export function Theme() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-5">
      <p className="font-medium text-muted-foreground">Tema</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <button
          onClick={() => setTheme("system")}
          className="flex flex-col cursor-pointer group"
        >
          <div className="h-20 bg-secondary rounded-t-lg opacity-50"></div>
          <div className="bg-secondary px-4 py-3 flex items-center justify-between rounded-b-lg">
            <p className="text-sm font-medium">Sistema</p>

            {theme === "system" && (
              <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2} />
            )}
          </div>
        </button>

        <button
          onClick={() => setTheme("dark")}
          className="flex flex-col cursor-pointer group"
        >
          <div className="h-20 bg-secondary rounded-t-lg opacity-50"></div>
          <div className="bg-secondary px-4 py-3 flex items-center justify-between rounded-b-lg">
            <p className="text-sm font-medium">Escuro</p>

            {theme === "dark" && (
              <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2} />
            )}
          </div>
        </button>

        <button
          onClick={() => setTheme("light")}
          className="flex flex-col cursor-pointer group"
        >
          <div className="h-20 bg-secondary rounded-t-lg opacity-50"></div>
          <div className="bg-secondary px-4 py-3 flex items-center justify-between rounded-b-lg">
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
