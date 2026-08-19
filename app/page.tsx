import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-24 text-center md:py-32">
          <div className="mb-6 text-6xl">🎬</div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Welcome to Movie Explorer
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Discover movies.
            <span className="block text-slate-400">
              Find your next favorite.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Movie Explorer is a simple movie discovery app powered by the
            TMDB API. Search for movies, explore popular titles, and view
            detailed information about each movie.
          </p>

          <div className="mt-10">
            <Link
              href="/movies"
              className="inline-flex rounded-lg bg-white px-7 py-3 font-semibold text-slate-950 transition hover:bg-slate-200 active:scale-95"
            >
              Explore Movies →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
            What you can do
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Explore movies your way
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Search */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-slate-700">
            <div className="mb-5 text-3xl">🔎</div>

            <h3 className="text-xl font-semibold">
              Search Movies
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Search for movies by title and quickly find the movies
              you are looking for.
            </p>
          </div>

          {/* Discover */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-slate-700">
            <div className="mb-5 text-3xl">🎥</div>

            <h3 className="text-xl font-semibold">
              Discover Popular Movies
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Browse popular movies and discover something new to
              watch.
            </p>
          </div>

          {/* Details */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-slate-700">
            <div className="mb-5 text-3xl">⭐</div>

            <h3 className="text-xl font-semibold">
              Explore Movie Details
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              View ratings, release dates, posters, and detailed
              movie overviews.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="mx-auto max-w-5xl px-4 py-20">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
              How it works
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Simple, fast, and easy to use
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 font-bold">
                1
              </div>

              <h3 className="mt-4 font-semibold">
                Search
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Enter the name of a movie in the search bar.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 font-bold">
                2
              </div>

              <h3 className="mt-4 font-semibold">
                Explore
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Browse the results and move through different pages.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 font-bold">
                3
              </div>

              <h3 className="mt-4 font-semibold">
                Discover
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Open any movie to see its complete details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="text-3xl font-bold">
          Ready to explore?
        </h2>

        <p className="mt-4 text-slate-400">
          Start discovering movies now.
        </p>

        <Link
          href="/movies"
          className="mt-8 inline-flex rounded-lg bg-white px-7 py-3 font-semibold text-slate-950 transition hover:bg-slate-200 active:scale-95"
        >
          Browse Movies →
        </Link>
      </section>
    </main>
  );
}