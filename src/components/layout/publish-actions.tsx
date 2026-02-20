import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_DRAFT_KEY } from "../publish/form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";

export function PublishActions() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => {
          navigate("/");
          localStorage.removeItem(LOCAL_STORAGE_DRAFT_KEY);
        }}
      >
        Cancelar
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">Continuar</Button>
        </DialogTrigger>
        <DialogContent className="w-md gap-8">
          <div className="space-y-2">
            <p className="text-lg font-medium">
              Tem certeza que deseja publicar?
            </p>
            <DialogDescription>
              Qualquer pessoa poderá ver o conteúdo da sua publicação.
            </DialogDescription>
          </div>

          <DialogFooter className="flex-row">
            <DialogClose asChild>
              <Button variant="outline" size="sm" rounded="md">
                Cancelar
              </Button>
            </DialogClose>

            <Button form="create-post-form" size="sm" rounded="md">
              Publicar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
