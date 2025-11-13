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
  title: "Filient - AI 파일 정리 앱 | AI-Powered File Organization",
  description: "연간 230시간 절약하는 AI 파일 정리 앱. Mac용 스마트 파일 관리 자동화. Stop wasting 230 hours a year searching for files. AI-powered file organization for macOS.",
  keywords: "파일 정리 앱, 맥 파일관리, 파일 자동화, AI 파일정리, 맥북 파일정리, 파일 자동 분류, 다운로드 폴더 정리, 파일 관리 프로그램, file organizer, mac file management, Hazel alternative, AI file organization, automatic file sorting, download folder organizer, macOS productivity",
  authors: [{ name: "Filient Team" }],
  verification: {
    other: {
      'naver-site-verification': '7e28ee577559d22250efcfcdb00cb0934cbc56e0',
    },
  },
  metadataBase: new URL('https://filient.ai'),
  openGraph: {
    title: "Filient - AI 파일 정리 앱 | AI File Organization",
    description: "연간 230시간 절약하는 Mac용 AI 파일 정리. Save 230 hours a year with AI-powered file organization.",
    url: "https://filient.ai",
    siteName: "Filient",
    images: [
      {
        url: "https://filient.ai/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filient - AI 파일 정리 앱 | AI File Organization",
    description: "연간 230시간 절약하는 Mac용 AI 파일 정리. Save 230 hours a year with AI-powered file organization.",
    images: ["https://filient.ai/twitter-image.png"],
  },
  alternates: {
    canonical: '/',
    languages: {
      'ko': '/?lang=ko',
      'en': '/?lang=en',
      'x-default': '/?lang=ko',
    },
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
    <html lang="ko" suppressHydrationWarning>
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const lang = localStorage.getItem('language') || 'ko';
                document.documentElement.lang = lang;
              })();
            `,
          }}
        />
        {/* Structured Data (Schema.org) for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Filient",
              "description": "연간 230시간 절약하는 AI 파일 정리 앱. Mac용 스마트 파일 관리 자동화.",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "macOS 13.0 or later",
              "softwareVersion": "1.2.3",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "downloadUrl": "https://filient.ai#download",
              "author": {
                "@type": "Organization",
                "name": "Filient Team"
              },
              "url": "https://filient.ai",
              "screenshot": "https://filient.ai/og-image.png"
            })
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
