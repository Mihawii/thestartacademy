"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import SiteLogo from "./site-logo";
import Link from "next/link";
import { cn } from "@/lib/utils";



const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center text-sm transition-colors duration-200",
        "text-gray-300 hover:text-white", // Dark theme text
        "dark:text-gray-300 dark:hover:text-white", // Explicit dark theme
        "light:text-gray-300 light:hover:text-white" // Light theme text
      )}
    >
      <span className="relative overflow-hidden">
        <span className="block transition-transform duration-300 group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute inset-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white dark:text-white light:text-white">
          {children}
        </span>
      </span>
    </a>
  );
};

export function MiniNavbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full");
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => setIsOpen((v) => !v);

  useEffect(() => {
    if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    if (isOpen) {
      setHeaderShapeClass("rounded-xl");
    } else {
      shapeTimeoutRef.current = setTimeout(() => setHeaderShapeClass("rounded-full"), 300);
    }
    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

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

  const AuthLink = ({ label }: { label: string }) => (
    <a
      href="/auth"
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2",
        "dark:text-white/90 dark:border-white/30 dark:hover:border-white/60 dark:hover:bg-white/10 dark:focus-visible:ring-white/70", // Dark theme
        "light:text-white/90 light:border-white/50 light:hover:border-white/80 light:hover:bg-white/20 light:focus-visible:ring-white/70", // Light theme
        "bg-transparent backdrop-blur-sm"
      )}
    >
      Log in
    </a>
  );

  const signInBtn = (
    <Link href="/access-info" className="text-sm transition-colors duration-200 dark:text-gray-300 dark:hover:text-white light:text-gray-300 light:hover:text-white">
      Sign In
    </Link>
  );
  const registerBtn = <AuthLink label="Register" />;

  return (
    <header
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pl-6 pr-6 py-3 backdrop-blur-sm w-[calc(100%-2rem)] sm:w-auto transition-[border-radius] duration-300 ease-in-out",
        "dark:border-[#333] dark:bg-[#1f1f1f57]", // Dark theme styles
        "light:border-gray-300 light:bg-black", // Light theme styles
        headerShapeClass
      )}
    >
      {/* primary row */}
      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
        {logo}
        <nav className="hidden sm:flex items-center space-x-6">
          {navLinks.map((lnk) => (
            <AnimatedNavLink key={lnk.href} href={lnk.href}>
              {lnk.label}
            </AnimatedNavLink>
          ))}
        </nav>
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-colors focus:outline-none focus-visible:ring-2 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10 dark:focus-visible:ring-white/70 light:text-gray-300 light:hover:text-white light:hover:bg-white/20 light:focus-visible:ring-white/70"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          {signInBtn}
          {registerBtn}
        </div>
        <button
          className="sm:hidden flex items-center justify-center w-8 h-8 focus:outline-none dark:text-gray-300 light:text-gray-300"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* mobile menu */}
      <div
        className={cn(
          "sm:hidden flex flex-col items-center w-full transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-[1000px] opacity-100 pt-4" : "max-h-0 opacity-0 pt-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center space-y-4 w-full">
          {navLinks.map((lnk) => (
            <a key={lnk.href} href={lnk.href} className="transition-colors w-full text-center dark:text-gray-300 dark:hover:text-white light:text-gray-300 light:hover:text-white">
              {lnk.label}
            </a>
          ))}
        </nav>
        <div className="mt-6 flex flex-col items-center gap-y-4">
            {signInBtn}
            {registerBtn}
          </div>
      </div>
    </header>
  );
}
