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
  title: "The Start Academy | #1 High School Business Accelerator | Entrepreneurship Program",
  description: "The Start Academy is Central Asia's premier accelerator program for high schoolers interested in entrepreneurship and project management. We empower ambitious students with real-world business skills, startup experience, and mentorship from industry experts. Join our exclusive program today.",
  keywords: [
    "the start academy",
    "start academy",
    "the start",
    "start",
    "high school business accelerator",
    "entrepreneurship program for high schoolers",
    "project management for teenagers",
    "business training for high school students",
    "startup accelerator for youth",
    "teen entrepreneur program",
    "high school startup program",
    "business education for teenagers",
    "entrepreneurship training for students",
    "opportunities for international high schoolers",
    "business accelerator program",
    "startup mentorship for teens",
    "high school business education",
    "teen startup accelerator",
    "business skills for high schoolers",
    "entrepreneurship education program",
    "project management training",
    "business development for students",
    "startup education for teenagers",
    "youth business accelerator",
    "high school entrepreneur training",
    "business mentorship program",
    "startup incubator for teens",
    "entrepreneurial education",
    "business leadership for students",
    "innovation program for high schoolers",
    "startup bootcamp for teens",
    "business accelerator central asia",
    "entrepreneurship central asia",
    "high school business program",
    "teen business training",
    "startup program for students",
    "business education program",
    "entrepreneurship accelerator",
    "project management education",
    "business skills development"
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
    title: 'The Start Academy | #1 High School Business Accelerator Program',
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
