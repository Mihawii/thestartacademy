'use client';
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { motion, easeOut } from "@/components/ui/framer";
import { Mail, Instagram, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SubscriptionModal } from '@/components/ui/subscription-modal';

const heroContainerVariants = {
  hidden: { opacity: 0, y: 16, filter: "none" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "none",
    transition: {
      duration: 0.7,
      ease: easeOut,
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 16, filter: "none" },
  visible: { opacity: 1, y: 0, filter: "none", transition: { duration: 0.7, ease: easeOut } },
};

export function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["innovative", "real", "impactful", "reliable"],
    []
  );

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateDesktopStatus = () => setIsDesktop(mediaQuery.matches);
    updateDesktopStatus();
    mediaQuery.addEventListener("change", updateDesktopStatus);
    return () => mediaQuery.removeEventListener("change", updateDesktopStatus);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles, isDesktop]);

  const MotionWrapper = isDesktop ? motion.div : 'div';

  return (
    <MotionWrapper
      className="w-full min-h-[60vh] flex flex-col items-center justify-center"
      variants={isDesktop ? heroContainerVariants : {}}
      initial={isDesktop ? "hidden" : "visible"}
      animate={isDesktop ? "visible" : "visible"}
    >
      <div className="container mx-auto md:container md:mx-auto lg:container lg:mx-auto xl:container xl:mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <MotionWrapper variants={isDesktop ? heroItemVariants : {}} className="flex flex-col items-center gap-2">
            <Image src="/logo/logo.svg" alt="The Start Academy Logo" width={48} height={48} priority />
          </MotionWrapper>
          <MotionWrapper variants={isDesktop ? heroItemVariants : {}} className="flex flex-col items-center gap-4 mt-2">
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://www.instagram.com/thestartacademy?igsh=bWRlbTYxb25vMDdn" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                <Instagram className="w-4 h-4" />
                @thestartacademy
              </a>
              <a 
                href="mailto:contact@thestartacademy.com" 
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                <Mail className="w-4 h-4" />
                contact@thestartacademy.com
              </a>
            </div>
          </MotionWrapper>
          <MotionWrapper variants={isDesktop ? heroItemVariants : {}} className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">The Start Academy is</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center h-12 md:h-20 md:pb-4 md:pt-1">
                {isDesktop ? (
                  isMounted && titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-semibold"
                      initial={{ opacity: 0, y: -100 }}
                      transition={{ type: "spring", stiffness: 50 }}
                      animate={
                        titleNumber === index
                          ? { y: 0, opacity: 1 }
                          : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                      }
                    >
                      {title}
                    </motion.span>
                  ))
                ) : (
                  <span className="absolute font-semibold w-full text-center">{titles[0]}</span>
                )}
              </span>
            </h1>
          </MotionWrapper>
          <MotionWrapper variants={isDesktop ? heroItemVariants : {}} className="flex flex-col items-center">
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Our student is making <span className="silver-gradient-text">millions</span>! (in KZT)
            </p>
          </MotionWrapper>
          <MotionWrapper variants={isDesktop ? heroItemVariants : {}} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors rounded-md whitespace-nowrap bg-background hover:bg-accent hover:text-accent-foreground h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input"
            >
              About us <MoveRight className="w-4 h-4" />
            </a>
            <Button
              size="lg"
              className="gap-4 w-full sm:w-auto transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-white/70"
              onClick={() => setIsModalOpen(true)}
            >
              Sign up here <MoveRight className="w-4 h-4" />
            </Button>
          </MotionWrapper>
        </div>
      </div>
      <SubscriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </MotionWrapper>
  );
}
