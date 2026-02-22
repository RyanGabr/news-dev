import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ShowSuccessToastProps {
  message: string;
}

export function showSuccessToast(props: ShowSuccessToastProps) {
  return toast.success(props.message, {
    position: "bottom-center",
    style: {
      fontSize: 16,
      height: 50,
      backgroundColor: "var(--foreground)",
      color: "var(--background)",
      border: "none",
    },
  });
}
