export type Genre = {
  id: number;
  name: string;
};

export type MovieVideo = {
  key: string;
  name: string;
  site: string;
  type: string;
};

export type Movie = {
  id: number;
  title: string;

  overview: string;

  poster_path: string | null;
  backdrop_path?: string | null;

  release_date: string;

  vote_average: number;

  // These fields are mainly available
  // when requesting movie details
  runtime?: number | null;
  genres?: Genre[];

  videos?: {
  results: MovieVideo[];
};
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type GenreResponse = {
  genres: Genre[];
};

