"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";
import SectionHeader from "./SectionHeader";

type MovieRowProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  movies: Movie[];
  genreMap?: Record<number, string>;
  priority?: boolean;
};

export default function MovieRow({
  eyebrow,
  title,
  description,
  href,
  movies,
  genreMap,
  priority = false,
}: MovieRowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByAmount(direction: 1 | -1) {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.85, behavior: "smooth" });
  }

  if (movies.length === 0) return null;

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            href={href}
          />

          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              aria-label={`Scroll ${title} left`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-mist transition hover:border-hairline-strong hover:text-paper"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              aria-label={`Scroll ${title} right`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-mist transition hover:border-hairline-strong hover:text-paper"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar mt-6 flex gap-4 overflow-x-auto scroll-smooth px-4 pb-2 sm:px-6 lg:px-10 xl:px-14"
        style={{ scrollSnapType: "x proximity" }}
      >
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="w-[42vw] shrink-0 sm:w-[26vw] md:w-[20vw] lg:w-[15vw] xl:w-180px"
            style={{ scrollSnapAlign: "start" }}
          >
            <MovieCard movie={movie} genreMap={genreMap} priority={priority && index === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}
