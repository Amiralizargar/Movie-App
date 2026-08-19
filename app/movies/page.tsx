import MovieFilters from "@/Components/MovieFilters";
import MovieCard from "../../Components/MovieCard";
import Pagination from "../../Components/Pagination";
import SearchBar from "../../Components/SearchBar";

import {
  getPopularMovies,
  searchMovies,
  discoverMovies,
  getMovieGenres,
} from "../../lib/api";

type MoviesPageProps = {
  searchParams: Promise<{
    query?: string;
    page?: string;
    rating?: string;
    year?: string;
    genre?: string;
  }>;
};

export default async function Movies({
  searchParams,
}: MoviesPageProps) {
  const params = await searchParams;

  // URL parameters
  const query = params.query ?? "";

  const page = Number(params.page ?? "1");

  const rating = params.rating
    ? Number(params.rating)
    : undefined;

  const year = params.year
    ? Number(params.year)
    : undefined;

  const genre = params.genre
    ? Number(params.genre)
    : undefined;

  // Get genres for the filter UI
  const genreData = await getMovieGenres();

  // Decide which API request to make
  const data =
    rating !== undefined ||
    year !== undefined ||
    genre !== undefined
      ? await discoverMovies({
          page,
          rating,
          year,
          genre,
        })
      : query
        ? await searchMovies(query, page)
        : await getPopularMovies(page);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Search */}
        <div className="mb-10">
          <SearchBar />
        </div>

        {/* Filters */}
        <MovieFilters
          genres={genreData.genres}
        />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {query
              ? `Search results for "${query}"`
              : "Popular Movies"}
          </h1>

          {query && (
            <p className="mt-2 text-sm text-slate-400">
              Showing movies matching your search
            </p>
          )}
        </div>

        {/* Empty State */}
        {data.results.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-16 text-center">
            <div className="text-5xl">🎬</div>

            <h2 className="mt-5 text-2xl font-bold">
              No movies found
            </h2>

            <p className="mt-2 text-slate-400">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <>
            {/* Movie Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7 lg:grid-cols-4">
              {data.results.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12">
              <Pagination
                currentPage={data.page}
                totalPages={data.total_pages}
                query={query}
                rating={params.rating}
                year={params.year}
                genre={params.genre}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}