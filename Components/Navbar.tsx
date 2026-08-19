"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Clapperboard, Heart, Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";
import { useFavorites } from "../hooks/useFavorites";
import { cn } from "../lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/favorites", label: "Favorites" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { ids, hydrated } = useFavorites();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const favoritesCount = hydrated ? ids.length : 0;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || mobileOpen
          ? "border-b border-hairline bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-14">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-bold tracking-tight text-paper transition hover:text-ember-bright"
        >
          <Clapperboard className="h-5 w-5 text-ember" strokeWidth={1.75} />
          Movie Explorer
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium transition",
                  active ? "text-paper" : "text-mist hover:text-paper",
                )}
              >
                {link.label}
                {link.href === "/favorites" && favoritesCount > 0 && (
                  <span className="ml-1.5 rounded-full bg-ember-dim px-1.5 py-0.5 font-mono text-[10px] text-ember-bright">
                    {favoritesCount}
                  </span>
                )}
                {active && (
                  <span className="absolute inset-x-3.5 -bottom-px h-px bg-ember" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden sm:block">
            <Suspense fallback={<div className="h-9 w-9" />}>
              <SearchBar variant="compact" />
            </Suspense>
          </div>

          <Link
            href="/favorites"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-paper transition hover:text-ember-bright sm:hidden"
            aria-label="Favorites"
          >
            <Heart className="h-4.5 w-4.5" strokeWidth={1.75} />
            {favoritesCount > 0 && (
              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-ember" />
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full text-paper transition hover:text-ember-bright md:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-hairline bg-ink/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              <div className="mb-2 sm:hidden">
                <Suspense fallback={<div className="h-52px" />}>
                  <SearchBar variant="full" onNavigate={() => setMobileOpen(false)} />
                </Suspense>
              </div>

              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-3 text-sm font-medium transition",
                      active
                        ? "bg-surface text-paper"
                        : "text-mist hover:bg-surface hover:text-paper",
                    )}
                  >
                    {link.label}
                    {link.href === "/favorites" && favoritesCount > 0 && (
                      <span className="rounded-full bg-ember-dim px-2 py-0.5 font-mono text-[11px] text-ember-bright">
                        {favoritesCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
