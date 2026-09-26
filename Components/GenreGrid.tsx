import Link from "next/link";
import type { Genre } from "../types/movie";
import SectionHeader from "./SectionHeader";

export default function GenreGrid({ genres }: { genres: Genre[] }) {
  return (
    <section className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
      <SectionHeader
        eyebrow="Browse"
        title="Explore by Genre"
        description="Jump straight into the mood you're after."
      />

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/movies?genre=${genre.id}`}
            className="group flex items-center justify-between rounded-md border border-hairline bg-surface px-4 py-4 text-sm font-semibold text-paper transition hover:border-ember/50 hover:bg-surface-hover"
          >
            {genre.name}
            <span className="text-mist-dim transition group-hover:translate-x-0.5 group-hover:text-ember">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
