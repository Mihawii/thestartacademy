import React from "react";
import { cn } from "@/lib/utils";

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
    </div>
  </section>
);
