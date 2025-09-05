'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { motion } from "framer-motion";
import { Mail, Instagram, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SiteLogo from "../ui/site-logo";
import { SubscriptionModal } from '@/components/ui/subscription-modal';

const heroContainerVariants = {
  hidden: { 
    opacity: 0
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    } 
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    } 
  },
};

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleNumber, setTitleNumber] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const titles = useMemo(
    () => ["innovative", "real", "impactful", "reliable"],
    []
  );

  useEffect(() => {
    setMounted(true);
    // Force re-animation on every mount
    setAnimationKey(Date.now());
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <motion.div
      className="w-full min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden"
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
      key={animationKey}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5"></div>
      <div className="container mx-auto px-4">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
            <SiteLogo size={48} className="mt-8 md:mt-0" />
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mt-2 z-10 relative">
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://www.instagram.com/thestartacademy?igsh=bWRlbTYxb25vMDdn" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors bg-gray-800 text-white hover:bg-gray-700 cursor-pointer select-none"
                style={{ pointerEvents: 'auto' }}
                onClick={(e) => {
                  console.log('Instagram clicked');
                  // Let the default link behavior handle the navigation
                }}
              >
                <Instagram className="w-4 h-4" />
                @thestartacademy
              </a>
              <a 
                href="mailto:olzhas@thestartacademy.com" 
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors bg-gray-800 text-white hover:bg-gray-700 cursor-pointer select-none"
                style={{ pointerEvents: 'auto' }}
                onClick={(e) => {
                  console.log('Email clicked');
                  // Let the default mailto behavior handle the email client
                }}
              >
                <Mail className="w-4 h-4" />
                olzhas@thestartacademy.com
              </a>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">The Start Academy is</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center h-12 md:h-20 md:pb-4 md:pt-1">
                {titles.map((title, index) => (
                    <motion.span
                      key={`${title}-${index}`}
                      className="absolute font-semibold"
                      initial={{ opacity: 0, y: -100 }}
                      transition={{ type: "spring", stiffness: 50, damping: 20 }}
                      animate={
                        titleNumber === index
                          ? { y: 0, opacity: 1 }
                          : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
              </span>
            </h1>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Our student is making <span className="gradient-text underline">millions</span>! (in KZT)
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto z-10 relative">
            <button
              type="button"
              onClick={() => {
                console.log('About us clicked');
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/about';
                }
              }}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 rounded-md whitespace-nowrap bg-transparent cursor-pointer select-none ${
                mounted && theme === 'dark' 
                  ? 'text-white border-2 border-white hover:bg-white hover:text-black' 
                  : 'text-black border-2 border-black hover:bg-black hover:text-white'
              }`}
              style={{ pointerEvents: 'auto' }}
            >
              About us <MoveRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                console.log('Sign up clicked');
                setIsModalOpen(true);
              }}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 rounded-md whitespace-nowrap bg-transparent cursor-pointer select-none ${
                mounted && theme === 'dark' 
                  ? 'text-white border-2 border-white hover:bg-white hover:text-black' 
                  : 'text-black border-2 border-black hover:bg-black hover:text-white'
              }`}
              style={{ pointerEvents: 'auto' }}
            >
              Sign up here <MoveRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
      {isModalOpen && (
        <SubscriptionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </motion.div>
  );
}
