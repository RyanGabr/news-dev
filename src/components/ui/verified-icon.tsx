import { cn } from "@/lib/utils";
import { CheckmarkBadge02Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface VerifiedIconProps {
  className?: string;
}

export function VerifiedIcon({ className }: VerifiedIconProps) {
  return (
    <div className={cn("relative", className)}>
      <HugeiconsIcon
        icon={Tick02Icon}
        className="z-20 absolute top-1/2 left-1/2 -translate-1/2 text-white"
        size={14}
        strokeWidth={2.5}
      />
      <HugeiconsIcon
        icon={CheckmarkBadge02Icon}
        fill="SeaGreen"
        className="text-transparent"
        size={28}
      />
    </div>
  );
}
