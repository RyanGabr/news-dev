import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);

  const diffMs = now.getTime() - past.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSec < 10) return "agora há pouco";

  if (diffMin < 1) return `${diffSec} segundo${diffSec > 1 ? "s" : ""} atrás`;
  if (diffHours < 1) return `${diffMin} minuto${diffMin > 1 ? "s" : ""} atrás`;
  if (diffDays < 1) return `${diffHours} hora${diffHours > 1 ? "s" : ""} atrás`;
  if (diffMonths < 1) return `${diffDays} dia${diffDays > 1 ? "s" : ""} atrás`;
  if (diffYears < 1)
    return `${diffMonths} mês${diffMonths > 1 ? "es" : ""} atrás`;

  return `${diffYears} ano${diffYears > 1 ? "s" : ""} atrás`;
}
