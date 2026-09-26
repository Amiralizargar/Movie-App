"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Info, Play, Star } from "lucide-react";
import type { Movie } from "../types/movie";
import TrailerModal from "./TrailerModal";
import { backdropUrl, formatRating, releaseYear, formatRuntime } from "../lib/utils";
import { cn } from "../lib/utils";

type HeroSectionProps = {
  movies: Movie[];
};

const AUTO_ADVANCE_MS = 8000;

export default function HeroSection({ movies }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);

  const movie = movies[activeIndex];

  useEffect(() => {
    if (paused || movies.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((index) => (index + 1) % movies.length);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(timer);
  }, [paused, movies.length]);

  if (!movie) return null;

  const backdrop = backdropUrl(movie.backdrop_path, "original");
  const trailer = movie.videos?.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );
  const year = releaseYear(movie.release_date);
  const runtime = formatRuntime(movie.runtime);

  return (
    <section
      className="relative h-[92vh] min-h-[600px] w-full overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {backdrop && (
            <Image
              src={backdrop}
              alt=""
              fill
              priority={activeIndex === 0}
              sizes="100vw"
              className="object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* One uniform wash across the entire hero — the navbar sits on the
          exact same tint as the rest of the image, so it never looks like
          it has its own separate background */}
      <div className="absolute inset-0 bg-ink/35" />

      {/* Extra darkening toward the bottom, purely for the title block's
          legibility — layered on top of the uniform wash, not instead of it */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/50 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-20 sm:px-6 lg:px-10 xl:px-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-ember">
              Trending Now
            </p>

            <h1 className="mt-3 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-paper sm:text-5xl md:text-6xl">
              {movie.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-sm text-mist">
              <span className="flex items-center gap-1 text-ember-bright">
                <Star className="h-3.5 w-3.5 fill-ember-bright" strokeWidth={0} />
                {formatRating(movie.vote_average)}
              </span>
              {year && <span>{year}</span>}
              {runtime && <span>{runtime}</span>}
              {movie.genres && movie.genres.length > 0 && (
                <span className="hidden text-mist-dim sm:inline">
                  {movie.genres
                    .slice(0, 3)
                    .map((g) => g.name)
                    .join(" · ")}
                </span>
              )}
            </div>

            <p className="mt-5 line-clamp-3 max-w-xl text-sm leading-7 text-mist sm:text-base">
              {movie.overview || "No overview available."}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {trailer && (
                <button
                  type="button"
                  onClick={() => setTrailerOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ink transition hover:bg-ember-bright active:scale-95"
                >
                  <Play className="h-4 w-4 fill-ink" strokeWidth={0} />
                  Watch Trailer
                </button>
              )}

              <Link
                href={`/movies/${movie.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-hairline-strong bg-ink/40 px-6 py-3 text-sm font-semibold text-paper backdrop-blur-md transition hover:border-paper/40 active:scale-95"
              >
                <Info className="h-4 w-4" strokeWidth={1.75} />
                Explore Movie
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot controls */}
        {movies.length > 1 && (
          <div className="mt-10 flex items-center gap-2">
            {movies.map((m, index) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show featured movie ${index + 1}`}
                aria-current={index === activeIndex}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-8 bg-ember"
                    : "w-4 bg-white/25 hover:bg-white/40",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {trailer && (
        <TrailerModal
          trailerKey={trailer.key}
          title={movie.title}
          isOpen={trailerOpen}
          onClose={() => setTrailerOpen(false)}
        />
      )}
    </section>
  );
}
