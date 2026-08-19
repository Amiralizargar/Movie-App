import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Movie Explorer",
    template: "%s — Movie Explorer",
  },
  description:
    "A cinematic movie discovery platform. Search, explore, and track your favorite films, powered by TMDB.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-dvh flex-col bg-ink font-sans text-paper antialiased">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
