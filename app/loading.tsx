import HeroSkeleton from "../Components/skeletons/HeroSkeleton";
import MovieRowSkeleton from "../Components/skeletons/MovieRowSkeleton";

export default function Loading() {
  return (
    <main className="bg-ink">
      <HeroSkeleton />
      <div className="space-y-16 py-16 sm:space-y-20 sm:py-20">
        <MovieRowSkeleton />
        <MovieRowSkeleton />
        <MovieRowSkeleton />
      </div>
    </main>
  );
}
