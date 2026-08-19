"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "favorites";
const FAVORITES_EVENT = "favorites:change";

const EMPTY_IDS: number[] = [];

let cachedRaw: string | null = null;
let cachedIds: number[] = EMPTY_IDS;

function getSnapshot(): number[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (raw === cachedRaw) return cachedIds;

  cachedRaw = raw;
  try {
    cachedIds = raw ? (JSON.parse(raw) as number[]) : EMPTY_IDS;
  } catch {
    cachedIds = EMPTY_IDS;
  }

  return cachedIds;
}

function getServerSnapshot(): number[] {
  return EMPTY_IDS;
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(FAVORITES_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(FAVORITES_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function writeFavorites(ids: number[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent(FAVORITES_EVENT));
}

// True only once the client has taken over from the server-rendered markup.
// Using useSyncExternalStore (instead of an effect + setState) avoids an
// extra render-triggering side effect and matches React's recommended
// pattern for subscribing to state that lives outside React.
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/**
 * Shared client-side access to the favorites list stored in localStorage.
 * Every consumer (favorite buttons, nav badge, favorites page, homepage
 * row) reads from the same external store and re-renders together the
 * instant any of them toggles a favorite — no prop drilling required.
 */
export function useFavorites() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useHydrated();

  const isFavorite = useCallback((movieId: number) => ids.includes(movieId), [ids]);

  const toggleFavorite = useCallback(
    (movieId: number) => {
      const next = ids.includes(movieId)
        ? ids.filter((id) => id !== movieId)
        : [...ids, movieId];

      writeFavorites(next);
    },
    [ids],
  );

  return { ids, hydrated, isFavorite, toggleFavorite };
}
