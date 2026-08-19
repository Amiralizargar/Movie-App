export default function DetailsSkeleton() {
  return (
    <div className="relative h-dvh animate-pulse overflow-hidden bg-ink-soft">
      <div className="mx-auto flex h-full max-w-[1600px] flex-col items-center justify-center gap-5 px-4 py-4 sm:px-6 md:flex-row md:gap-10 lg:px-14">
        <div className="w-full max-w-2xl space-y-4 md:order-1">
          <div className="h-3 w-24 rounded bg-surface" />
          <div className="h-10 w-full rounded bg-surface" />
          <div className="h-10 w-2/3 rounded bg-surface" />
          <div className="flex gap-3 pt-1">
            <div className="h-6 w-14 rounded-full bg-surface" />
            <div className="h-6 w-20 rounded-full bg-surface" />
            <div className="h-6 w-16 rounded-full bg-surface" />
          </div>
          <div className="space-y-2 pt-3">
            <div className="h-3 w-full rounded bg-surface" />
            <div className="h-3 w-2/3 rounded bg-surface" />
          </div>
          <div className="flex gap-3 pt-3">
            <div className="h-11 w-36 rounded-full bg-surface" />
          </div>
        </div>

        <div className="h-40 w-24 shrink-0 rounded-lg bg-surface sm:h-56 sm:w-36 md:order-2 md:h-72 md:w-48" />
      </div>
    </div>
  );
}
