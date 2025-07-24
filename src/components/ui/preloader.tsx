'use client';

import { motion, Variants } from 'framer-motion';

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'loop',
      delay: 2.5, // Delay after typewriter effect
    },
  },
};

const text = "The Start Academy";

export const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black pointer-events-none">
      <motion.h1
        className="text-white text-3xl md:text-4xl font-semibold tracking-wider"
        variants={sentence}
        initial="hidden"
        animate="visible"
      >
        {text.split("").map((char, index) => (
          <motion.span key={char + "-" + index} variants={letter}>
            {char}
          </motion.span>
        ))}
        <motion.div variants={pulse} animate="animate" className="inline-block" />
      </motion.h1>
    </div>
  );
};
