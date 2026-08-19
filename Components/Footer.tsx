"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clapperboard } from "lucide-react";

// The movie details page is a locked single-screen experience — no footer
// (it would push the page past 100dvh and force a scrollbar).
const HIDDEN_ON = /^\/movies\/[^/]+$/;

export default function Footer() {
  const pathname = usePathname();

  if (HIDDEN_ON.test(pathname)) return null;

  return (
    <footer className="border-t border-hairline bg-ink-soft">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10 xl:px-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold tracking-tight text-paper"
        >
          <Clapperboard className="h-4 w-4 text-ember" strokeWidth={1.75} />
          Movie Explorer
        </Link>

        <p className="max-w-md text-xs leading-relaxed text-mist-dim">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB. All movie data, artwork, and trailers are provided by{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mist underline decoration-hairline-strong underline-offset-2 transition hover:text-ember-bright"
          >
            The Movie Database
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
