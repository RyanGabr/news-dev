import { toast } from "sonner";
import { Button } from "../ui/button";

export function Card() {
  async function copyPostLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast("Link da publicação copiado!", {
        position: "bottom-center",
        style: {
          fontSize: 16,
          height: 50,
          backgroundColor: "var(--foreground)",
          color: "var(--background)",
          border: "none",
        },
      });
    } catch {
      toast.error("Não foi possível copiar o link.");
    }
  }

  return (
    <div className="bg-secondary py-14 px-5 rounded-lg flex flex-col items-center justify-center gap-5">
      <div className="text-center space-y-1">
        <h2 className="text-lg font-medium">Compartilhe com seus amigos</h2>
        <p className="text-sm text-muted-foreground">
          Leia, escreva e compartilhe com a comunidade
        </p>
      </div>

      <Button onClick={copyPostLink} size="sm">
        Compartilhar
      </Button>
    </div>
  );
}
