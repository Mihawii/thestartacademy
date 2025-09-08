import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

import type { Metadata, Viewport } from "next";
import { MiniNavbar } from "../components/ui/mini-navbar";
import { Providers } from "./providers";
import { ThemedClickSpark } from '@/components/ui/themed-click-spark';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "The Start Academy",
  description: "The Start Academy - #1 International Business Accelerator for US High School Students. Elite entrepreneurship program with Stanford & Harvard mentors. Alternative to expensive US summer programs. Real startup experience, project management training, and global network. Transform your business ideas into reality with our exclusive program for ambitious American students seeking international opportunities.",
  keywords: [
    "the start academy",
    "start academy",
    "business accelerator for high school students",
    "high school entrepreneurship program",
    "teen business accelerator USA",
    "summer business program for high schoolers",
    "high school startup incubator",
    "entrepreneurship program for teenagers",
    "business training for high school students",
    "teen entrepreneur program",
    "high school business education",
    "startup accelerator for youth",
    "business mentorship for teenagers",
    "entrepreneurship education for high schoolers",
    "teen startup program",
    "high school business camp",
    "youth entrepreneurship training",
    "business accelerator program for teens",
    "high school innovation program",
    "teen business development program",
    "entrepreneurship summer program",
    "business leadership for high schoolers",
    "startup education for teenagers",
    "high school venture capital program",
    "teen business competition",
    "entrepreneurship bootcamp for high schoolers",
    "business accelerator alternative",
    "international business program for US students",
    "global entrepreneurship program",
    "overseas business education",
    "international startup experience",
    "study abroad business program",
    "global business accelerator",
    "international teen entrepreneur program",
    "overseas startup incubator",
    "global business mentorship",
    "international entrepreneurship training",
    "business program abroad for high schoolers",
    "global startup accelerator for teens",
    "international business education for teenagers",
    "alternative to expensive US summer programs",
    "affordable international business program",
    "stanford mentor program",
    "harvard business program for high schoolers",
    "ivy league mentor program",
    "elite business accelerator",
    "prestigious entrepreneurship program",
    "top tier business education",
    "exclusive startup program",
    "selective business accelerator"
  ],
  authors: [{ name: "The Start Academy" }],
  creator: "The Start Academy",
  publisher: "The Start Academy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thestartacademy.com',
    siteName: 'The Start Academy',
    title: 'The Start Academy',
    description: '#1 International Business Accelerator for US High School Students. Elite entrepreneurship program with Stanford & Harvard mentors. Alternative to expensive US summer programs with global perspective and real startup experience.',
    images: [
      {
        url: '/logo/logo.svg',
        width: 1200,
        height: 630,
        alt: 'The Start Academy - Business Education for High School Students',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Start Academy | #1 International Business Accelerator for US High Schoolers',
    description: 'Elite international business accelerator for American high school students. Stanford & Harvard mentors. Alternative to expensive US summer programs. Real startup experience abroad.',
    images: ['/logo/logo.svg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'education',
  other: {
    'application-name': 'The Start Academy',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
  },
  alternates: {
    canonical: 'https://thestartacademy.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://thestartacademy.com" />
        <link rel="preload" href="/logo/logo.svg" as="image" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico?v=3" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico?v=3" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="alternate" hrefLang="en-US" href="https://thestartacademy.com" />
        <link rel="alternate" hrefLang="en" href="https://thestartacademy.com" />
        <link rel="alternate" hrefLang="ru" href="https://thestartacademy.com/ru" />
        <link rel="alternate" hrefLang="x-default" href="https://thestartacademy.com" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="geo.position" content="39.8283;-98.5795" />
        <meta name="ICBM" content="39.8283, -98.5795" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "The Start Academy",
              "alternateName": ["Start Academy", "Старт Академия"],
              "description": "#1 International Business Accelerator for US High School Students. Elite entrepreneurship program with Stanford & Harvard mentors. Alternative to expensive US summer programs with global perspective.",
              "url": "https://thestartacademy.com",
              "logo": "https://thestartacademy.com/logo/logo.svg",
              "image": "https://thestartacademy.com/logo/logo.svg",
              "address": [
                {
                  "@type": "PostalAddress",
                  "addressCountry": "KZ",
                  "addressLocality": "Astana",
                  "addressRegion": "Akmola Region"
                },
                {
                  "@type": "PostalAddress",
                  "addressCountry": "US",
                  "addressLocality": "New York",
                  "addressRegion": "NY"
                }
              ],
              "areaServed": [
                {
                  "@type": "Country",
                  "name": "United States"
                },
                {
                  "@type": "Country",
                  "name": "Canada"
                },
                {
                  "@type": "Country",
                  "name": "Kazakhstan"
                }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+77051028049",
                "email": "olzhas@thestartacademy.com",
                "contactType": "Admissions"
              },
              "hasOfferingCatalog": {
                "@type": "OfferingCatalog",
                "name": "Business Accelerator Programs",
                "itemListElement": [{
                  "@type": "Course",
                  "name": "High School Business Accelerator Program",
                  "description": "Elite international business accelerator program for US high school students seeking global entrepreneurship experience with Stanford & Harvard mentors",
                  "provider": {
                    "@type": "EducationalOrganization",
                    "name": "The Start Academy"
                  },
                  "courseMode": "blended",
                  "educationalLevel": "High School",
                  "teaches": ["Entrepreneurship", "Project Management", "Business Development", "Leadership"],
                  "audience": {
                    "@type": "EducationalAudience",
                    "educationalRole": "student",
                    "audienceType": "High School Students"
                  }
                }]
              },
              "keywords": "business accelerator for high school students, teen entrepreneurship program USA, summer business program alternative, international startup experience, Stanford Harvard mentors, elite business education, high school innovation program"
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}>
        <Providers>
          <ThemedClickSpark>
            <MiniNavbar />
            <main className="pt-20">
              {children}
            </main>
          </ThemedClickSpark>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
