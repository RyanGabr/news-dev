import { Button } from "../ui/button";

export function Categories() {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm" rounded="full">
        Recentes
      </Button>
      <Button variant="ghost" size="sm" rounded="full">
        Tecnologia
      </Button>
      <Button variant="ghost" size="sm" rounded="full">
        Games
      </Button>
      <Button variant="ghost" size="sm" rounded="full">
        Política
      </Button>
      <Button variant="ghost" size="sm" rounded="full">
        Ciência
      </Button>
      <Button variant="ghost" size="sm" rounded="full">
        Entretenimento
      </Button>
      <Button variant="ghost" size="sm" rounded="full">
        Outro
      </Button>
    </div>
  );
}
