import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "../ui/theme-provider";

export function Theme() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between pb-10">
      <div className="space-y-3">
        <h3 className="font-medium opacity-90">Aparência</h3>

        <p className="text-sm text-muted-foreground">
          Personalize a aparência do Lumi no seu dispositivo.
        </p>
      </div>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-sm">
              {theme === "dark"
                ? "Escuro"
                : theme === "light"
                  ? "Claro"
                  : "Sistema"}
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            <DropdownMenuItem onClick={() => setTheme("system")}>
              Usar configuração do sistema
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Claro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Escuro
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
