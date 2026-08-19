import { getMovieDetails } from "../../../lib/api";

export async function POST(request: Request) {
  const { ids }: { ids: number[] } = await request.json();

  const movies = await Promise.all(
    ids.map((id) => getMovieDetails(id.toString()))
  );

  return Response.json(movies);
}

export async function GET() {
  return Response.json({
    message: "Favorites API is working!",
  });
}