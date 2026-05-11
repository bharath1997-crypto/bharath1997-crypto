import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bharath Nidumolu — Solutions Engineer & MS CS",
  description:
    "Portfolio of Bharath Nidumolu — Solutions Engineer, AI-Native Architect, and 72-credit MS Computer Science graduate based in Chicago, IL.",
  keywords: [
    "Bharath Nidumolu",
    "Solutions Engineer",
    "Computer Science",
    "DePaul University",
    "FastAPI",
    "Full Stack",
    "Chicago",
  ],
  authors: [{ name: "Bharath Nidumolu" }],
  openGraph: {
    title: "Bharath Nidumolu — Solutions Engineer & MS CS",
    description:
      "Portfolio of Bharath Nidumolu — Solutions Engineer, AI-Native Architect, and 72-credit MS Computer Science graduate.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-gray-900 scroll-smooth">
        {children}
      </body>
    </html>
  );
}
