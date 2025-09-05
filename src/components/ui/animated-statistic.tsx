"use client";

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, animate } from "framer-motion";

interface AnimatedStatisticProps {
  value: number;
  label: string;
  plus?: boolean;
}

export const AnimatedStatistic = ({ value, label, plus = false }: AnimatedStatisticProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Combine refs
  const setRefs = (node: HTMLSpanElement | null) => {
    ref.current = node;
    inViewRef(node);
  };

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, value]);

  return (
    <div className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-foreground">
        <span ref={setRefs}>0</span>
        {plus && '+'}
      </p>
      <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-xs mx-auto">{label}</p>
    </div>
  );
};
