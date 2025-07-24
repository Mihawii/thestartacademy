'use client';

import { motion, Variants } from 'framer-motion';
import { Rocket, Star, Lightbulb, GraduationCap } from 'lucide-react';

const containerVariants: Variants = {
  start: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const iconVariants: Variants = {
  start: { y: 20, opacity: 0, scale: 0.8 },
  end: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { 
      type: 'spring', 
      stiffness: 100,
      damping: 10,
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const textVariants: Variants = {
    initial: { opacity: 0, y: 15 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.8, // Delay after icons are mostly visible
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const icons = [
  { icon: Rocket, className: 'text-white' },
  { icon: Star, className: 'text-white' },
  { icon: Lightbulb, className: 'text-white' },
  { icon: GraduationCap, className: 'text-white' },
];

export const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black pointer-events-none">
      <motion.div
        variants={containerVariants}
        initial="start"
        animate="end"
        className="flex items-center space-x-6 mb-6"
      >
        {icons.map((item, i) => (
          <motion.div key={i} variants={iconVariants}>
            <item.icon className={`w-10 h-10 ${item.className}`} />
          </motion.div>
        ))}
      </motion.div>
      <motion.h1
        variants={textVariants}
        initial="initial"
        animate="animate"
        className="text-white text-3xl md:text-4xl font-semibold tracking-wider"
      >
        The Start Academy
      </motion.h1>
    </div>
  );
};
