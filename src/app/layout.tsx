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
    <html lang="en" className="dark" data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <MiniNavbar />
          {children}
      </body>
    </html>
  );
}
