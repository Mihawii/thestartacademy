"use client";

import React, { useState, useEffect, useRef } from "react";
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
    <Image src="/logo/logo.png" alt="Logo" width={32} height={32} className="rounded-full" />
  );

  const navLinks = [
    { label: "About us", href: "#about" },
    { label: "Overview", href: "#program" },
    { label: "Dates", href: "#dates" },
  ];

  const loginBtn = (
    <button className="px-4 py-2 text-xs border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300 rounded-full hover:border-white/50 hover:text-white transition-colors duration-200 transform hover:scale-105 active:scale-95 w-full sm:w-auto">
      Log In
    </button>
  );

  const signupBtn = (
    <div className="relative group w-full sm:w-auto">
      <div className="absolute inset-0 -m-2 rounded-full hidden sm:block bg-gray-100 opacity-40 blur-lg pointer-events-none transition-all duration-300 group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3" />
      <button className="relative z-10 px-4 py-2 text-xs font-semibold text-black bg-gradient-to-br from-gray-100 to-gray-300 rounded-full hover:from-gray-200 hover:to-gray-400 transition-all duration-200 transform hover:scale-105 active:scale-95 w-full sm:w-auto">
        Signup
      </button>
    </div>
  );

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
        <div className="hidden sm:flex items-center gap-3">
          {loginBtn}
          {signupBtn}
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
          "sm:hidden flex flex-col items-center w-full transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-[1000px] opacity-100 pt-4" : "max-h-0 opacity-0 pt-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center space-y-4 w-full">
          {navLinks.map((lnk) => (
            <a key={lnk.href} href={lnk.href} className="text-gray-300 hover:text-white transition-colors w-full text-center">
              {lnk.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col items-center space-y-4 mt-4 w-full">
          {loginBtn}
          {signupBtn}
        </div>
      </div>
    </header>
  );
}
