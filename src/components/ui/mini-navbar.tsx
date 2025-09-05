"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import SiteLogo from "./site-logo";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center text-sm text-gray-300 hover:text-white transition-colors duration-200"
    >
      <span className="relative overflow-hidden">
        <span className="block transition-transform duration-300 group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute inset-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white">
          {children}
        </span>
      </span>
    </a>
  );
};

export function MiniNavbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logo = (
    <Link href="/" aria-label="Home" className="shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
      <SiteLogo size={40} className="hover:scale-105 transition-transform duration-200" />
    </Link>
  );

  const navLinks = [
    { label: "About us", href: "#about" },
    { label: "Overview", href: "#program" },
    { label: "Dates", href: "#dates" },
  ];


  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-black/30 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-lg">
      <div className="flex items-center gap-6">
        <Link href="/" className="shrink-0">
          <SiteLogo size={36} />
        </Link>
        
        <nav className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {mounted && theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <Link
            href="/auth"
            className="px-3 py-1.5 text-sm text-gray-300 hover:text-white transition-colors"
          >
            Log In
          </Link>
          
          <Link
            href="/apply"
            className="px-4 py-1.5 text-sm bg-white text-black rounded-md hover:bg-gray-100 transition-colors"
          >
            Apply
          </Link>

          <button
            className="sm:hidden w-8 h-8 flex items-center justify-center text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden mt-4 pt-4 border-t border-white/10">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
            <Link href="/auth" className="text-sm text-gray-300 hover:text-white transition-colors">
              Log In
            </Link>
            <Link href="/apply" className="text-sm bg-white text-black px-4 py-2 rounded-full hover:bg-gray-100 transition-colors text-center">
              Apply
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
