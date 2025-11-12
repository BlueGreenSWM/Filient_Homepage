import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { CookieConsent } from "@/components/CookieConsent";
import { UTMTracker } from "@/components/analytics/UTMTracker";

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
  verification: {
    other: {
      'naver-site-verification': '7e28ee577559d22250efcfcdb00cb0934cbc56e0',
    },
  },
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
      <head>
        {/* Google Analytics 4 */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              // Consent Mode v2 (GDPR compliance)
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied'
              });

              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <Suspense fallback={null}>
            <UTMTracker />
          </Suspense>
          <LanguageToggle />
          {children}
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
