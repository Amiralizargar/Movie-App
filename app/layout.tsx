import type { Metadata } from "next";
import Navbar from "../Components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Movie Explorer",
  description: "Discover and explore movies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-700">
        <Navbar />
        {children}
      </body>
    </html>
  );
}