import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, resolving Tailwind conflicts sensibly. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export type PosterSize = "w185" | "w342" | "w500" | "original";
export type BackdropSize = "w780" | "w1280" | "original";

export function posterUrl(path: string | null | undefined, size: PosterSize = "w500") {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function backdropUrl(path: string | null | undefined, size: BackdropSize = "w1280") {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

/** "2026-08-19" -> "2026" */
export function releaseYear(date: string | null | undefined) {
  if (!date) return null;
  const year = date.slice(0, 4);
  return /^\d{4}$/.test(year) ? year : null;
}

/** 148 -> "2h 28m" */
export function formatRuntime(minutes: number | null | undefined) {
  if (!minutes || minutes <= 0) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export function formatRating(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";
  return value.toFixed(1);
}

/** "2026-08-19" -> "Aug 19, 2026" */
export function formatDate(date: string | null | undefined) {
  if (!date) return null;
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
