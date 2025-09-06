import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { AnimatedStatistic } from "../ui/animated-statistic";
import SiteLogo from "../ui/site-logo";

interface AboutSectionProps {
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ className }) => (
  <section id="about" className={cn("py-24 md:py-32 w-full bg-background text-foreground", className)}>
    <div className="container mx-auto flex flex-col gap-6 items-center text-center max-w-3xl px-4">
      <h2 className="text-3xl md:text-5xl font-semibold">About&nbsp;Us</h2>
      <p className="text-lg md:text-xl text-muted-foreground">
        The Start Academy (TSa.) is a student-driven career accelerator dedicated to
        empowering ambitious minds across Central Asia and beyond. We connect
        students and early-career professionals with industry mentors,
        entrepreneurial resources, and immersive learning experiences that
        translate curiosity into real-world impact.
      </p>
      
      <div className="mt-8">
        <Link href="/about">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 rounded-md whitespace-nowrap bg-transparent cursor-pointer select-none text-foreground border-2 border-foreground hover:bg-foreground hover:text-background hover:scale-105 active:scale-95"
          >
            Learn More About Our Academy
          </button>
        </Link>
      </div>

      <div className="mt-16 w-full flex flex-col gap-12">
        {/* Quantitative Stats */}
        <div className="grid grid-cols-2 gap-8">
          <AnimatedStatistic value={300} label="students educated" plus />
          <AnimatedStatistic value={6} label="countries represented" />
        </div>

        {/* Qualitative Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-x-8 items-start">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 flex items-center justify-center mb-4">
              <Image src="/logo/stanford.svg" alt="Stanford logo" width={128} height={128} className="" />
            </div>
            <p className="text-lg font-medium text-white">Top-Tier Mentorship</p>
            <p className="text-base text-gray-400 mt-1 max-w-xs mx-auto">Guidance from experts and alumni from Stanford Pre-Collegiate</p>
          </div>
          <div className="flex flex-col items-center text-center">
             <div className="w-32 h-32 flex items-center justify-center mb-4">
                <span className="text-6xl">🇺🇿</span>
              </div>
            <p className="text-lg font-medium text-white">Official Partnership</p>
            <p className="text-base text-gray-400 mt-1 max-w-xs mx-auto">Strategic collaboration with the Youth Affair Agency in Uzbekistan</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
