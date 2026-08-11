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
    "Computer Science student building reproducible computer-vision benchmarks, reliable ML systems, and backend services with verifiable evidence on GitHub.",
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
      "Reproducible computer vision, reliable ML systems, and production-minded software.",
    url: "./",
    siteName: "Minh Phan Portfolio",
    images: [
      {
        url: `${portfolioUrl}og-ml-systems.png`,
        width: 1734,
        height: 909,
        alt: "Minh Phan - ML Systems, Computer Vision, and Software Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minh Phan | ML Engineering & Systems",
    description:
      "Reproducible computer vision, reliable ML systems, and production-minded software.",
    images: [`${portfolioUrl}og-ml-systems.png`],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f8fa",
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
