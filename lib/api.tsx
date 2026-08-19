import type { MovieResponse, Movie, GenreResponse } from "../types/movie";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
  accept: "application/json",
};

export async function getPopularMovies(page = 1): Promise<MovieResponse> {
  const response = await fetch(`${TMDB_BASE_URL}/movie/popular?page=${page}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  return response.json();
}

export async function searchMovies(
  query: string,
  page = 1,
  rating?: number,
): Promise<MovieResponse> {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}&vote_average.gte=${rating}`,
    {
      headers,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  return response.json();
}

export async function getMovieDetails(id: string): Promise<Movie> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${id}?append_to_response=videos`,
    {
      headers,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  const movie = await response.json();

  return movie;
}

export async function discoverMovies({
  page = 1,
  rating,
  year,
  genre,
}: {
  page?: number;
  rating?: number;
  year?: number;
  genre?: number;
}): Promise<MovieResponse> {
  const params = new URLSearchParams();

  params.set("page", page.toString());

  if (rating !== undefined) {
    params.set("vote_average.gte", rating.toString());
  }

  if (year !== undefined) {
    params.set("primary_release_year", year.toString());
  }

  if (genre !== undefined) {
    params.set("with_genres", genre.toString());
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/discover/movie?${params.toString()}`,
    {
      headers,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to discover movies");
  }

  return response.json();
}
export async function getMovieGenres(): Promise<GenreResponse> {
  const response = await fetch(`${TMDB_BASE_URL}/genre/movie/list`, {
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movie genres");
  }

  return response.json();
}
