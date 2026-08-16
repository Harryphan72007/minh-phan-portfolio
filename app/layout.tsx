import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const portfolioUrl = "https://harryphan72007.github.io/minh-phan-portfolio/";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(portfolioUrl),
  title: "Minh Phan | ML Engineering & Systems",
  description:
    "Computer Science student building reproducible computer-vision benchmarks, reviewable AI systems, and production-minded software with transparent project status.",
  keywords: [
    "Minh Phan",
    "software engineering internship",
    "machine learning systems",
    "computer vision",
    "object detection benchmark",
    "reproducible research",
    "University of Minnesota",
  ],
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: `${portfolioUrl}favicon.svg`,
    shortcut: `${portfolioUrl}favicon.svg`,
  },
  openGraph: {
    type: "website",
    title: "Minh Phan | ML Engineering & Systems",
    description:
      "Reproducible experiments, reviewable AI, and transparent project status.",
    url: "./",
    siteName: "Minh Phan Portfolio",
    images: [
      {
        url: `${portfolioUrl}og-ml-systems.png`,
        width: 1734,
        height: 909,
        alt: "Minh Phan — ML Engineering and Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minh Phan | ML Engineering & Systems",
    description:
      "Reproducible experiments, reviewable AI, and transparent project status.",
    images: [`${portfolioUrl}og-ml-systems.png`],
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f7fc",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
