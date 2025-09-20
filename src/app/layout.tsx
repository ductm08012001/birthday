import type { Metadata } from "next";
import { Geist, Geist_Mono, Carattere } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const geistCarattere = Carattere({
  variable: "--font-carattere",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Sinh nhật bé Vy",
  description: "Chúc mừng sinh nhật Vy ",
  icons: {
    icon: "/favicon.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  themeColor: "#FFFFFF",
  openGraph: {
    title: "Sinh nhật bé Vy",
    description: "Chúc mừng sinh nhật Vy",
    url: "https://birthday-nine-pi.vercel.app/",
    siteName: "Sinh nhật bé Vy",
    images: [
      {
        url: "https://birthday-nine-pi.vercel.app/meta.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sinh nhật bé Vy",
    description: "Chúc mừng sinh nhật Vy",
    images: [
      {
        url: "https://birthday-nine-pi.vercel.app/meta.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geistCarattere.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
