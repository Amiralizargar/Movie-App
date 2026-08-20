import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* ================= HERO ================= */}
      <section
        className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/30" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center px-6 py-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm text-slate-200 backdrop-blur-md">
              🎬 Movie Explorer
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Discover movies.
              <span className="mt-2 block text-slate-300">
                Find your next favorite.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
              Search, discover, and explore thousands of movies powered by
              TMDB. Find popular titles, check ratings, and discover your next
              favorite movie.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/movies"
                className="rounded-xl bg-white px-7 py-3.5 font-semibold text-slate-950 shadow-lg transition hover:bg-slate-200 active:scale-95"
              >
                Explore Movies →
              </Link>

              <Link
                href="/favorites"
                className="rounded-xl border border-white/20 bg-black/30 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition hover:bg-white/10 active:scale-95"
              >
                ❤️ Favorites
              </Link>
            </div>

            {/* Small information row */}
            <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-7">
              <div>
                <p className="text-lg font-semibold">TMDB</p>
                <p className="mt-1 text-sm text-slate-400">
                  Movie database
                </p>
              </div>

              <div>
                <p className="text-lg font-semibold">Search</p>
                <p className="mt-1 text-sm text-slate-400">
                  Find movies
                </p>
              </div>

              <div>
                <p className="text-lg font-semibold">❤️ Favorites</p>
                <p className="mt-1 text-sm text-slate-400">
                  Save your picks
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20">
          {/* Section heading */}
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Explore
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Everything you need to discover movies.
            </h2>

            <p className="mt-4 max-w-2xl text-slate-400">
              Search, filter, and explore movie information in one simple
              place.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid gap-5 md:grid-cols-3">
            {/* Search */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7 transition hover:-translate-y-1 hover:border-slate-600">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-2xl">
                🔎
              </div>

              <h3 className="text-xl font-semibold">
                Search Movies
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Search for movies by title and quickly find exactly what
                you're looking for.888888
              </p>
            </div>

            {/* Discover */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7 transition hover:-translate-y-1 hover:border-slate-600">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-2xl">
                🎯
              </div>

              <h3 className="text-xl font-semibold">
                Discover
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Browse popular movies and use filters to discover something
                new.
              </p>
            </div>

            {/* Details */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7 transition hover:-translate-y-1 hover:border-slate-600">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-2xl">
                ⭐
              </div>

              <h3 className="text-xl font-semibold">
                Movie Details
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                View ratings, genres, release dates, overviews, and trailers
                for every movie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <div className="text-5xl">🍿</div>

          <h2 className="mt-6 text-3xl font-bold md:text-4xl">
            Ready to find your next movie?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Browse popular movies, search for something specific, or discover
            a new favorite.
          </p>

          <Link
            href="/movies"
            className="mt-8 inline-flex rounded-xl bg-white px-8 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200 active:scale-95"
          >
            Start Exploring →
          </Link>
        </div>
      </section>
    </main>
  );
}