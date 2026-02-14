import { FileAddIcon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Activity, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { SearchResults } from "./search-results";
import { useNavigate } from "react-router-dom";

export function Search() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setCommandOpen(true)}
        size="sm"
        rounded="md"
        className="w-64 justify-start hidden sm:flex"
      >
        <HugeiconsIcon icon={Search01Icon} strokeWidth={2.5} size={15} />
        Pesquisar publicações
      </Button>

      <CommandDialog
        open={commandOpen}
        onOpenChange={setCommandOpen}
        className="max-w-2xl bg-popover backdrop-blur-lg shadow-none rounded-[20px] dark:border border-border"
        showCloseButton={false}
      >
        <CommandInput
          placeholder="Pesquisar publicações..."
          value={search}
          onValueChange={(search: string) => setSearch(search)}
          className="text-lg bg-transparent placeholder:opacity-80 px-1.5"
        />

        <CommandList className="border-t py-1.5 h-64">
          <CommandGroup>
            <CommandItem
              value="publish"
              onSelect={() => {
                // 1. Primeiro sinalizamos que o modal deve fechar
                setCommandOpen(false);
                navigate("/publish");
              }}
            >
              <HugeiconsIcon icon={FileAddIcon} />
              Criar publicação
            </CommandItem>
          </CommandGroup>
        </CommandList>

        <Activity mode={search.trim().length > 0 ? "visible" : "hidden"}>
          <SearchResults search={search} setCommandOpen={setCommandOpen} />
        </Activity>
      </CommandDialog>
    </>
  );
}
