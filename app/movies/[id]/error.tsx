"use client";

import { Film } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-ink px-4 pb-10 pt-16 text-paper">
      <div className="mx-auto flex min-h-[500px] max-w-7xl items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-hairline bg-surface text-ember">
            <Film className="h-6 w-6" strokeWidth={1.5} />
          </div>

          <h1 className="mt-6 text-3xl font-bold">Movie couldn&apos;t be loaded</h1>

          <p className="mt-3 max-w-sm text-sm leading-6 text-mist">
            We couldn&apos;t load this movie. Please try again.
          </p>

          <button
            onClick={() => reset()}
            className="mt-7 rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ink transition hover:bg-ember-bright active:scale-95"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}
