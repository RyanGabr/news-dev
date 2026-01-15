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
        size="icon"
        rounded="full"
        onClick={() => setCommandOpen(true)}
      >
        <HugeiconsIcon icon={Search01Icon} strokeWidth={2.5} size={18} />
      </Button>

      <CommandDialog
        open={commandOpen}
        onOpenChange={setCommandOpen}
        className="max-w-xl shadow-none dark:bg-secondary-foreground rounded-xl"
        showCloseButton={false}
      >
        <CommandInput
          placeholder="O que você deseja encontrar?"
          value={search}
          onValueChange={(search: string) => setSearch(search)}
        />

        <Activity mode={search.trim().length > 0 ? "visible" : "hidden"}>
          <SearchResults search={search} setCommandOpen={setCommandOpen} />
        </Activity>
      </CommandDialog>
    </>
  );
}
