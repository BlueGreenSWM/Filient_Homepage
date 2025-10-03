import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Filient - AI-Powered File Organization | Save 230 Hours a Year",
  description: "Stop wasting 230 hours a year searching for files. Filient uses AI to automatically organize your files - no complex rules needed. Better than Hazel.",
  keywords: "file organizer, Hazel alternative, AI file management, automatic file organization, file automation, macOS file organizer",
  authors: [{ name: "Filient Team" }],
  openGraph: {
    title: "Filient - AI-Powered File Organization",
    description: "Save 230 hours a year with AI-powered file organization. No complex rules needed.",
    url: "https://filient.app",
    siteName: "Filient",
    images: [
      {
        url: "https://filient.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filient - AI-Powered File Organization",
    description: "Save 230 hours a year with AI-powered file organization",
    images: ["https://filient.app/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <LanguageToggle />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
