import type { Metadata } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gilelias.me"),
  title: {
    default: "Jesús Gilberto Elías Ogaz | Chief Economic Strategist",
    template: "%s | Jesús Gilberto Elías Ogaz",
  },
  description:
    "International advisor on economic development, industrial policy, regional competitiveness, investment attraction, and AI for governments.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://gilelias.me",
    siteName: "Jesús Gilberto Elías Ogaz",
    title: "Jesús Gilberto Elías Ogaz | Chief Economic Strategist",
    description:
      "International advisor on economic development, industrial policy, regional competitiveness, investment attraction, and AI for governments.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jesús Gilberto Elías Ogaz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesús Gilberto Elías Ogaz | Chief Economic Strategist",
    description:
      "International advisor on economic development, industrial policy, regional competitiveness, investment attraction, and AI for governments.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${newsreader.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
