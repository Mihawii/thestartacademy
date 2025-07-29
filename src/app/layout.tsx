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


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "The Start Academy",
  description: "Student career accelerator for Central Asia"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <ThemedClickSpark>
            <MiniNavbar />
            {children}
          </ThemedClickSpark>
        </Providers>
      </body>
    </html>
  );
}
