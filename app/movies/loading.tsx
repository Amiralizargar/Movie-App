import MoviesGridSkeleton from "../../Components/skeletons/MoviesGridSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-ink px-4 pb-10 pt-24 text-paper sm:px-6 lg:px-10 xl:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 h-14 animate-pulse rounded-full bg-surface" />
        <div className="mb-8 h-32 animate-pulse rounded-lg bg-surface" />
        <div className="mb-8 space-y-2">
          <div className="h-7 w-56 animate-pulse rounded bg-surface" />
          <div className="h-3 w-28 animate-pulse rounded bg-surface" />
        </div>
        <MoviesGridSkeleton />
      </div>
    </main>
  );
}
