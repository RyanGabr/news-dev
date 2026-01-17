import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Activity, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CommandDialog, CommandInput } from "../ui/command";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { SearchResults } from "./search-results";

export function Search() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [search, setSearch] = useState("");

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
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="blank"
            className="py-0 text-muted-foreground hover:text-foreground px-2"
            onClick={() => setCommandOpen(true)}
          >
            <HugeiconsIcon icon={Search01Icon} strokeWidth={2} size={17} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Buscar — Ctrl + K</TooltipContent>
      </Tooltip>

      <CommandDialog
        open={commandOpen}
        onOpenChange={setCommandOpen}
        className="max-w-xl bg-popover backdrop-blur-lg shadow-none rounded-lg border border-border/20"
        showCloseButton={false}
      >
        <CommandInput
          placeholder="O que você quer encontrar?"
          value={search}
          onValueChange={(search: string) => setSearch(search)}
          className="text-xl bg-transparent placeholder:opacity-80 px-1.5"
        />

        <Activity mode={search.trim().length > 0 ? "visible" : "hidden"}>
          <SearchResults search={search} setCommandOpen={setCommandOpen} />
        </Activity>
      </CommandDialog>
    </>
  );
}
