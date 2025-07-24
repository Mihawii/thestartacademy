'use client';
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { StaggerTestimonials } from "@/components/blocks/stagger-testimonials";
import { AboutSection } from "@/components/sections/about-section";
import { ProgramOverviewSection } from "@/components/sections/program-overview-section";
import { ImportantDatesSection } from "@/components/sections/important-dates-section";
import { FaqSection } from "@/components/sections/faq-section";
import { MiniNavbar } from "@/components/ui/mini-navbar";
import { SubscriptionModal } from '@/components/ui/subscription-modal';

function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      
      
      style={{ willChange: "opacity, transform, filter" }}
    >
      <div className="container mx-auto md:container md:mx-auto lg:container lg:mx-auto xl:container xl:mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <motion.div className="flex flex-col items-center gap-2" style={{ willChange: "opacity, transform, filter" }}>
            <Image src="/logo/logo.png" alt="The Start Academy Logo" width={48} height={48} />
          </motion.div>
          <motion.div className="flex flex-col items-center gap-4 mt-2" style={{ willChange: "opacity, transform, filter" }}>
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
          </motion.div>
          <motion.div
            className="flex gap-4 flex-col"
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
           style={{ willChange: "opacity, transform, filter" }}>
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
          <motion.div className="flex flex-col items-center" style={{ willChange: "opacity, transform, filter" }}>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Best student career accelerator program in Central Asia.
            </p>
          </motion.div>
          <motion.div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto" style={{ willChange: "opacity, transform, filter" }}>
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
          </motion.div>
        </div>
      </div>
      <SubscriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
      <FaqSection />
    </>
  );
}
