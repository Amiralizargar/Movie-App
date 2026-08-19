export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex min-h-[520px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-white" />

            <p className="mt-4 text-slate-400">
              Loading movie...
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}