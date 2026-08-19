
import Navbar from "../Components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
} ){
  return (
    <html>
      <body className="bg-gray-700">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
