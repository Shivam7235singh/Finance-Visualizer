import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-full overflow-hidden relative bg-gradient-to-r from-purple-200 via-indigo-400 to-blue-400">
        <Navbar />
        <div className="h-[calc(100vh-64px)] overflow-y-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
