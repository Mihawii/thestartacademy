'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Preloader } from './preloader';

export const InitialLoader = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('loaded')) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('loaded', 'true');
    }, 3000); // Duration of the creative animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div key="preloader" exit={{ opacity: 0 }}>
          <Preloader />
        </motion.div>
      ) : (
        children
      )}
    </AnimatePresence>
  );
};
