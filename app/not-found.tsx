import Link from "next/link";
import { Clapperboard, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[85vh] items-center justify-center bg-ink px-4 pt-16 text-paper">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-hairline bg-surface text-ember">
          <Clapperboard className="h-7 w-7" strokeWidth={1.5} />
        </div>

        <p className="mt-8 font-mono text-sm font-semibold uppercase tracking-[0.25em] text-ember">
          404
        </p>

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Scene not found
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-mist">
          The page you&apos;re looking for was cut from the final edit.
          Let&apos;s get you back to something worth watching.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ink transition hover:bg-ember-bright active:scale-95"
          >
            <Home className="h-4 w-4" strokeWidth={1.75} />
            Back to Home
          </Link>

          <Link
            href="/movies"
            className="inline-flex items-center gap-2 rounded-full border border-hairline-strong bg-surface px-6 py-3 text-sm font-semibold text-paper transition hover:border-paper/40 active:scale-95"
          >
            <Search className="h-4 w-4" strokeWidth={1.75} />
            Explore Movies
          </Link>
        </div>
      </div>
    </main>
  );
}
