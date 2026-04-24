import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Driving Lesson Weather Planner",
  description: "Plan your driving lessons around the weather",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
