"use client";

import { Clapperboard } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-ink px-4 pt-16 text-paper">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-hairline bg-surface text-ember">
          <Clapperboard className="h-6 w-6" strokeWidth={1.5} />
        </div>

        <h1 className="mt-6 text-3xl font-bold">Something went wrong</h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-mist">
          We couldn&apos;t load Movie Explorer. Please try again in a moment.
        </p>

        <button
          onClick={() => reset()}
          className="mt-7 rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ink transition hover:bg-ember-bright active:scale-95"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
