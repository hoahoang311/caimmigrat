import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calendlyKeys: Record<string, string> = {
  mou: "mou-icbmlaw",
  richard: "richard-icbmlaw",
};

export const durationToKeysMou: Record<number, string> = {
  60: "30-minute-meeting-clone",
  30: "30min",
};

export const durationToKeysRich: Record<number, string> = {
  60: "30-minutes-consultation-initial-clone",
  30: "30min",
};

export const getCalendlyLink = (duration: number, officer: string, now: Date) =>
  `https://calendly.com/${calendlyKeys[officer]}/${
    (officer === "mou" ? durationToKeysMou : durationToKeysRich)[duration]
  }?back=0&month=${now.getFullYear()}-${now.getMonth() + 1}`;
