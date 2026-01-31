import { Button } from "../ui/button";

export function Header() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 md:pt-10">
      <h1 className="hidden md:block text-5xl font-medium tracking-tight text-center">
        Leia, escreva e compartilhe <br /> com a comunidade.
      </h1>

      <h1 className="md:hidden text-4xl font-medium">Explorar</h1>

      <p className="text-muted-foreground text-lg font-medium hidden md:block text-center">
        Uma comunidade feita para compartilhar conhecimentos, debater <br />{" "}
        ideias e encontrar relevância em assuntos variados.
      </p>

      <div className="items-center gap-3 hidden md:flex">
        <Button>Start now</Button>
        <Button variant="outline">Estrela no GitHub</Button>
      </div>
    </div>
  );
}
