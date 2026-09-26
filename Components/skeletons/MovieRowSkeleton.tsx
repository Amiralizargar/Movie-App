import MovieCardSkeleton from "./MovieCardSkeleton";

export default function MovieRowSkeleton() {
  return (
    <section>
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="h-3 w-24 animate-pulse rounded bg-ink-soft" />
        <div className="mt-3 h-8 w-56 animate-pulse rounded bg-ink-soft" />
      </div>

      <div className="no-scrollbar mt-6 flex gap-4 overflow-x-hidden px-4 pb-2 sm:px-6 lg:px-10 xl:px-14">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="w-[42vw] shrink-0 sm:w-[26vw] md:w-[20vw] lg:w-[15vw] xl:w-[180px]"
          >
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}
