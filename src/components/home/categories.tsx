import {
  CpuChargeIcon,
  Film01Icon,
  Joystick04Icon,
  Plant01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router-dom";

export function Categories() {
  return (
    <>
      <div>
        <h2 className="font-medium text-xl">Navegar por categoria</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          to=""
          className="flex items-center gap-2 bg-secondary-foreground p-2 rounded-lg transition"
        >
          <HugeiconsIcon
            icon={CpuChargeIcon}
            size={24}
            className="text-sky-400"
          />
          <p className="font-medium text-sm">Tecnologia</p>
        </Link>

        <Link
          to=""
          className="flex items-center gap-2 bg-secondary-foreground p-2 rounded-lg transition"
        >
          <HugeiconsIcon
            icon={Joystick04Icon}
            size={24}
            className="text-red-400"
          />
          <p className="font-medium text-sm">Games</p>
        </Link>

        <Link
          to=""
          className="flex items-center gap-2 bg-secondary-foreground p-2 rounded-lg transition"
        >
          <HugeiconsIcon
            icon={Film01Icon}
            size={24}
            className="text-amber-400"
          />
          <p className="font-medium text-sm">Filmes</p>
        </Link>

        <Link
          to=""
          className="flex items-center gap-2 bg-secondary-foreground p-2 rounded-lg transition"
        >
          <HugeiconsIcon
            icon={Plant01Icon}
            size={24}
            className="text-green-400"
          />
          <p className="font-medium text-sm">Ciência</p>
        </Link>
      </div>
    </>
  );
}
