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
          className="flex items-center gap-2 bg-secondary border border-border/50 p-3 rounded-3xl squircle hover:border-border transition"
        >
          <HugeiconsIcon
            icon={CpuChargeIcon}
            size={28}
            className="text-sky-400"
          />
          <p className="font-medium">Tecnologia</p>
        </Link>

        <Link
          to=""
          className="flex items-center gap-2 bg-secondary border border-border/50 p-3 rounded-3xl squircle hover:border-border transition"
        >
          <HugeiconsIcon
            icon={Joystick04Icon}
            size={28}
            className="text-red-400"
          />
          <p className="font-medium">Games</p>
        </Link>

        <Link
          to=""
          className="flex items-center gap-2 bg-secondary border border-border/50 p-3 rounded-3xl squircle hover:border-border transition"
        >
          <HugeiconsIcon
            icon={Film01Icon}
            size={28}
            className="text-amber-400"
          />
          <p className="font-medium">Filmes</p>
        </Link>

        <Link
          to=""
          className="flex items-center gap-2 bg-secondary border border-border/50 p-3 rounded-3xl squircle hover:border-border transition"
        >
          <HugeiconsIcon
            icon={Plant01Icon}
            size={28}
            className="text-green-400"
          />
          <p className="font-medium">Ciência</p>
        </Link>
      </div>
    </>
  );
}
