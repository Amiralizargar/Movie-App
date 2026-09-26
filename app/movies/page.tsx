import { SearchX } from "lucide-react";
import MovieFilters from "../../Components/MovieFilters";
import MovieCard from "../../Components/MovieCard";
import Pagination from "../../Components/Pagination";
import SearchBar from "../../Components/SearchBar";
import EmptyState from "../../Components/EmptyState";

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

export default async function Movies({ searchParams }: MoviesPageProps) {
  const params = await searchParams;

  // URL parameters
  const query = params.query ?? "";

  const page = Number(params.page ?? "1");

  const rating = params.rating ? Number(params.rating) : undefined;

  const year = params.year ? Number(params.year) : undefined;

  const genre = params.genre ? Number(params.genre) : undefined;

  // Get genres for the filter UI
  const genreData = await getMovieGenres();

  // Decide which API request to make
  const data =
    rating !== undefined || year !== undefined || genre !== undefined
      ? await discoverMovies({ page, rating, year, genre })
      : query
        ? await searchMovies(query, page)
        : await getPopularMovies(page);

  const genreMap = Object.fromEntries(
    genreData.genres.map((g) => [g.id, g.name]),
  );

  return (
    <main className="min-h-screen bg-ink px-4 pb-10 pt-24 text-paper sm:px-6 lg:px-10 xl:px-14">
      <div className="mx-auto max-w-[1600px]">
        {/* Search + Filters toolbar */}
        <div className="sticky top-16 z-30 mb-8 -mx-4 bg-ink/70 px-4 py-4 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:px-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <SearchBar className="lg:max-w-sm" />
            <MovieFilters genres={genreData.genres} />
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {query ? `Results for "${query}"` : "Popular Movies"}
            </h1>
            <p className="mt-1.5 font-mono text-xs text-mist">
              {data.total_results.toLocaleString()} movies found
            </p>
          </div>
        </div>

        {/* Empty State */}
        {data.results.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No movies found"
            description="Try a different search term or adjust your filters to see more results."
            actionHref="/movies"
            actionLabel="Reset search"
          />
        ) : (
          <>
            {/* Movie Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
              {data.results.map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  genreMap={genreMap}
                  priority={index < 5}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={data.page}
              totalPages={Math.min(data.total_pages, 500)}
              query={query}
              rating={params.rating}
              year={params.year}
              genre={params.genre}
            />
          </>
        )}
      </div>
    </main>
  );
}
