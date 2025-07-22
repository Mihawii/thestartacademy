'use client';
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { motion, easeOut } from "framer-motion";
import { MoveRight, Sticker } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { StaggerTestimonials } from "@/components/blocks/stagger-testimonials";
import { AboutSection } from "@/components/sections/about-section";
import { ProgramOverviewSection } from "@/components/sections/program-overview-section";
import { ImportantDatesSection } from "@/components/sections/important-dates-section";
import { MiniNavbar } from "@/components/ui/mini-navbar";

const testimonials = [
  {
    author: {
      name: "Emma Thompson",
      handle: "@emmaai",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "Using this AI platform has transformed how we handle data analysis. The speed and accuracy are unprecedented.",
    href: "https://twitter.com/emmaai"
  },
  {
    author: {
      name: "David Park",
      handle: "@davidtech",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "The API integration is flawless. We've reduced our development time by 60% since implementing this solution.",
    href: "https://twitter.com/davidtech"
  },
  {
    author: {
      name: "Sofia Rodriguez",
      handle: "@sofiaml",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "Finally, an AI tool that actually understands context! The accuracy in natural language processing is impressive."
  }
];

const heroContainerVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(16px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: easeOut,
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(16px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: easeOut } },
};

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["innovative", "real", "impactful", "reliable"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <motion.div
      className="w-full min-h-[60vh] flex flex-col items-center justify-center"
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
      style={{ willChange: "opacity, transform, filter" }}
    >
      <div className="container mx-auto md:container md:mx-auto lg:container lg:mx-auto xl:container xl:mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <motion.div className="flex flex-col items-center gap-2" variants={heroItemVariants} style={{ willChange: "opacity, transform, filter" }}>
            <Image src="/logo/logo.png" alt="The Start Academy Logo" width={48} height={48} />
          </motion.div>
          <motion.div className="flex flex-col items-center gap-2" variants={heroItemVariants} style={{ willChange: "opacity, transform, filter" }}>
            <Button variant="secondary" size="sm" className="gap-4 mt-2">
              Read our launch article <MoveRight className="w-4 h-4" />
            </Button>
          </motion.div>
          <motion.div className="flex gap-4 flex-col" variants={heroItemVariants} style={{ willChange: "opacity, transform, filter" }}>
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">The Start Academy is</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>
          </motion.div>
          <motion.div className="flex flex-col items-center" variants={heroItemVariants} style={{ willChange: "opacity, transform, filter" }}>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Best student career accelerator program in Central Asia.
            </p>
          </motion.div>
          <motion.div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto" variants={heroItemVariants} style={{ willChange: "opacity, transform, filter" }}>
            <Button size="lg" className="gap-4 w-full sm:w-auto" variant="outline">
              About us <MoveRight className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-4 w-full sm:w-auto">
              Sign up here <MoveRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      <MiniNavbar />
      <Hero />
      <StaggerTestimonials />
      <AboutSection />
      <ProgramOverviewSection />
      <ImportantDatesSection />
    </>
  );
}
