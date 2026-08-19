import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight transition hover:text-slate-300"
        >
          🎬 Movie Explorer
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">


          <Link
            href="/movies"
            className="text-sm font-medium text-slate-300 transition hover:text-white"
          >
            Movies
          </Link>
          <Link
            href="/favorites"
            className="text-sm font-medium text-slate-300 transition hover:text-white"
          >
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}
