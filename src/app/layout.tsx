import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  description: "The Start Academy - opportunities for international high schoolers in Central Asia's premier business accelerator program. Entrepreneurship training, project management, startup experience, and mentorship from industry experts. Transform your business ideas into reality with our exclusive program for ambitious students worldwide.",
  keywords: [
    "the start academy",
    "start academy",
    "старт академия",
    "стартакадемия",
    "opportunities for international high schoolers",
    "возможности для международных школьников",
    "high school business accelerator",
    "бизнес акселератор для школьников",
    "entrepreneurship program for high schoolers",
    "программа предпринимательства для школьников",
    "project management for teenagers",
    "проектный менеджмент для подростков",
    "business training for high school students",
    "бизнес обучение для школьников",
    "startup accelerator for youth",
    "стартап акселератор для молодежи",
    "teen entrepreneur program",
    "программа для юных предпринимателей",
    "business education for teenagers",
    "бизнес образование для подростков",
    "entrepreneurship training for students",
    "обучение предпринимательству для студентов",
    "business accelerator program",
    "программа бизнес акселератора",
    "startup mentorship for teens",
    "менторство стартапов для подростков",
    "business skills for high schoolers",
    "бизнес навыки для школьников",
    "entrepreneurship education program",
    "программа предпринимательского образования",
    "business accelerator central asia",
    "бизнес акселератор центральная азия",
    "entrepreneurship central asia",
    "предпринимательство центральная азия",
    "kazakhstan business program",
    "бизнес программа казахстан",
    "astana startup program",
    "стартап программа астана",
    "international student opportunities",
    "возможности для международных студентов",
    "summer business program",
    "летняя бизнес программа",
    "youth leadership development",
    "развитие лидерства молодежи",
    "teen startup incubator",
    "инкубатор стартапов для подростков"
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
    description: 'Central Asia\'s premier accelerator program for high schoolers interested in entrepreneurship and project management. Real-world business skills, startup experience, and expert mentorship.',
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
    title: 'The Start Academy | High School Business Accelerator Program',
    description: 'Premier accelerator program for high schoolers interested in entrepreneurship and project management. Transform your business ideas into reality.',
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
        <link rel="icon" href="/favicon.ico?v=3" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico?v=3" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="alternate" hrefLang="en" href="https://thestartacademy.com" />
        <link rel="alternate" hrefLang="ru" href="https://thestartacademy.com/ru" />
        <link rel="alternate" hrefLang="x-default" href="https://thestartacademy.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "The Start Academy",
              "alternateName": ["Start Academy", "Старт Академия"],
              "description": "Central Asia's premier business accelerator program for high school students interested in entrepreneurship and project management",
              "url": "https://thestartacademy.com",
              "logo": "https://thestartacademy.com/logo/logo.svg",
              "image": "https://thestartacademy.com/logo/logo.svg",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "KZ",
                "addressLocality": "Astana",
                "addressRegion": "Akmola Region"
              },
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
                  "description": "Comprehensive entrepreneurship and project management training for international high school students",
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
              "keywords": "opportunities for international high schoolers, start academy, business accelerator, entrepreneurship program, high school students, Central Asia, Kazakhstan, Astana"
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
