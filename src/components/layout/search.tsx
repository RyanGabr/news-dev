import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Activity, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CommandDialog, CommandInput } from "../ui/command";
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
        className="max-w-2xl bg-popover shadow-none rounded-2xl top-10 sm:top-1/3"
        showCloseButton={false}
      >
        <CommandInput
          placeholder="Pesquise pelo título de publicações..."
          value={search}
          onValueChange={(search: string) => setSearch(search)}
          className="bg-transparent placeholder:opacity-80 px-1.5 text-lg"
        />

        <Activity mode={search.trim().length > 0 ? "visible" : "hidden"}>
          <SearchResults search={search} setCommandOpen={setCommandOpen} />
        </Activity>
      </CommandDialog>
    </>
  );
}
