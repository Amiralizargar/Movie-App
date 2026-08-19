"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[500px] max-w-7xl items-center justify-center">
        <div className="text-center">
          <div className="text-5xl">🎬</div>

          <h1 className="mt-5 text-3xl font-bold">
            Something went wrong
          </h1>

          <p className="mt-3 text-slate-400">
            We couldn't load the movies.
          </p>

          <button
            onClick={() => reset()}
            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}