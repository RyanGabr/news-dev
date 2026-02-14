import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="flex flex-col gap-8">
      <strong className="text-3xl lg:text-4xl font-semibold tracking-tight">
        Início
      </strong>

      <Link
        to=""
        className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-12 items-center"
      >
        <div>
          <div className="bg-brand rounded-md h-64" />
        </div>

        <div className="space-y-2">
          <p className="text-sm lg:text-base text-muted-foreground">
            14 de fevereiro de 2026
          </p>
          <p className="font-semibold text-2xl lg:text-3xl">
            Seja bem-vindo ao Lumi. Leia, escreva e compartilhe com a comunidade
          </p>
          <p className="text-sm lg:text-base text-muted-foreground line-clamp-3">
            O Lumi é um projeto pessoal dedicado à publicação de textos, artigos
            e à interação entre pessoas que buscam conteúdo relevante. Criado
            com uma estética minimalista, o espaço prioriza a leitura e a troca
            direta de informações.
          </p>
        </div>
      </Link>
    </div>
  );
}
