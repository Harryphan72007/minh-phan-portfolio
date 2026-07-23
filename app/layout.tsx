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
  title: "Minh Phan | Software Engineering & ML Systems",
  description:
    "Computer Science student building reliable software, ML systems, local AI applications, and computer vision experiments.",
  keywords: [
    "Minh Phan",
    "software engineering internship",
    "machine learning systems",
    "computer vision",
    "efficient AI",
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
    title: "Minh Phan | Software Engineering & ML Systems",
    description:
      "Computer Science student building reliable software, ML systems, local AI applications, and computer vision experiments.",
    url: "./",
    siteName: "Minh Phan Portfolio",
    images: [
      {
        url: `${portfolioUrl}og.png`,
        width: 1734,
        height: 909,
        alt: "Minh Phan - Software Engineering and ML Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minh Phan | Software Engineering & ML Systems",
    description:
      "Computer Science student building reliable software, ML systems, local AI applications, and computer vision experiments.",
    images: [`${portfolioUrl}og.png`],
  },
};

export const viewport: Viewport = {
  themeColor: "#080b10",
  colorScheme: "dark",
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
