"use client";

import React, { useState, useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import Image from "next/image";


const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center text-sm text-gray-300 transition-colors duration-200 hover:text-white"
      )}
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
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  );
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full");
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => setIsOpen((v) => !v);
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

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

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const logo = (
    <Link href="/" aria-label="Home" className="shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
      <Image src="/logo/logo.svg" alt="Logo" width={40} height={40} priority placeholder="empty" className="rounded-full hover:scale-105 transition-transform duration-200" />
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
        "relative inline-flex items-center justify-center overflow-hidden rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
        "bg-transparent text-white/90 border border-white/30 hover:border-white/60 hover:bg-white/10 backdrop-blur-sm"
      )}
    >
      Log in
    </a>
  );

  const signInBtn = (
    <Link href="/access-info" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
      Sign In
    </Link>
  );
  const registerBtn = <AuthLink label="Register" />;

  return (
    <header
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pl-6 pr-6 py-3 backdrop-blur-sm border border-[#333] bg-[#1f1f1f57] w-[calc(100%-2rem)] sm:w-auto transition-[border-radius] duration-300 ease-in-out",
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
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm5.657 3.343a1 1 0 010 1.414l-1.414 1.414a1 1 0 11-1.414-1.414l1.414-1.414a1 1 0 011.414 0zM21 11h-2a1 1 0 110-2h2a1 1 0 110 2zm-3.343 7.657a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 111.414-1.414l1.414 1.414a1 1 0 010 1.414zM13 19v2a1 1 0 11-2 0v-2a1 1 0 112 0zm-7.657-1.343a1 1 0 010-1.414l1.414-1.414a1 1 0 111.414 1.414L6.757 17.657a1 1 0 01-1.414 0zM5 11H3a1 1 0 110-2h2a1 1 0 110 2zm3.343-7.657a1 1 0 011.414 0l1.414 1.414A1 1 0 018.757 6.171L7.343 4.757a1 1 0 010-1.414z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12 2a9.953 9.953 0 00-7.071 2.929A10 10 0 1012 2zm0 18a8 8 0 110-16 8 8 0 010 16z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          {signInBtn}
          {registerBtn}
        </div>
        <button
          className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none"
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
          "sm:hidden flex flex-col items-center w-full overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
          isOpen ? "max-h-60 opacity-100 pt-4" : "max-h-0 opacity-0 pt-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center space-y-4 w-full">
          {navLinks.map((lnk) => (
            <a key={lnk.href} href={lnk.href} className="text-gray-300 hover:text-white transition-colors w-full text-center">
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
