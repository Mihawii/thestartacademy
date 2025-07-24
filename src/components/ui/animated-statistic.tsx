'use client';

import { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

interface AnimatedStatisticProps {
  value: number;
  label: string;
  plus?: boolean;
}

export const AnimatedStatistic = ({ value, label, plus = false }: AnimatedStatisticProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      animate(0, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = latest.toFixed(0);
          }
        },
      });
    }
  }, [isInView, value]);

  return (
    <div className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-white">
        <span ref={ref}>0</span>
        {plus && '+'}
      </p>
      <p className="text-sm md:text-base text-gray-400 mt-2 max-w-xs mx-auto">{label}</p>
    </div>
  );
};
