export default function HeroSkeleton() {
  return (
    <div className="relative h-[92vh] min-h-[560px] w-full animate-pulse overflow-hidden bg-ink-soft">
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink to-transparent" />
      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] items-end px-4 pb-20 sm:px-6 lg:px-10 xl:px-14">
        <div className="w-full max-w-xl space-y-4">
          <div className="h-4 w-28 rounded bg-surface" />
          <div className="h-12 w-4/5 rounded bg-surface" />
          <div className="h-4 w-full rounded bg-surface" />
          <div className="h-4 w-2/3 rounded bg-surface" />
          <div className="flex gap-3 pt-2">
            <div className="h-11 w-36 rounded-full bg-surface" />
            <div className="h-11 w-36 rounded-full bg-surface" />
          </div>
        </div>
      </div>
    </div>
  );
}
