export default function MovieCardSkeleton() {
  return (
    <div className="w-full animate-pulse overflow-hidden rounded-md border border-hairline bg-surface">
      <div className="aspect-2/3 bg-ink-soft" />
      <div className="space-y-2 p-3">
        <div className="h-3.5 w-3/4 rounded bg-ink-soft" />
        <div className="h-3 w-1/3 rounded bg-ink-soft" />
      </div>
    </div>
  );
}
