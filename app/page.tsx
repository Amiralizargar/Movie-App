import HeroSection from "../Components/HeroSection";
import MovieRow from "../Components/MovieRow";
import GenreGrid from "../Components/GenreGrid";
import FavoritesRow from "../Components/FavoritesRow";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMovieGenres,
  getMovieDetails,
} from "../lib/api";

const HERO_MOVIE_COUNT = 5;

// Trending/popular/top-rated/upcoming lists shift daily on TMDB — revalidate
// the statically-generated homepage hourly instead of freezing it at build time.
export const revalidate = 3600;

export default async function Home() {
  const [trending, popular, topRated, upcoming, genreData] = await Promise.all([
    getTrendingMovies("day"),
    getPopularMovies(),
    getTopRatedMovies(),
    getUpcomingMovies(),
    getMovieGenres(),
  ]);

  const heroMovies = await Promise.all(
    trending.results
      .slice(0, HERO_MOVIE_COUNT)
      .map((movie) => getMovieDetails(String(movie.id))),
  );

  const genreMap = Object.fromEntries(
    genreData.genres.map((genre) => [genre.id, genre.name]),
  );

  return (
    <main className="bg-ink">
      <HeroSection movies={heroMovies} />

      <div className="space-y-16 py-16 sm:space-y-20 sm:py-20">
        <MovieRow
          eyebrow="Right Now"
          title="Trending Today"
          description="What everyone's watching across the world today."
          href="/movies"
          movies={trending.results}
          genreMap={genreMap}
          priority
        />

        <MovieRow
          eyebrow="Fan Favorites"
          title="Popular Movies"
          description="Crowd-pleasers with the biggest audiences."
          href="/movies"
          movies={popular.results}
          genreMap={genreMap}
        />

        <MovieRow
          eyebrow="Critically Acclaimed"
          title="Top Rated"
          description="The highest-rated films, according to TMDB."
          href="/movies?rating=8"
          movies={topRated.results}
          genreMap={genreMap}
        />

        <MovieRow
          eyebrow="Coming Soon"
          title="Upcoming Releases"
          description="Mark your calendar for what's next."
          movies={upcoming.results}
          genreMap={genreMap}
        />

        <GenreGrid genres={genreData.genres} />

        <FavoritesRow />
      </div>
    </main>
  );
}
