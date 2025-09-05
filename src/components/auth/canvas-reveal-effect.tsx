"use client";

/*
  Lightweight placeholder for the advanced CanvasRevealEffect.
  It draws fading dots with requestAnimationFrame. Replace with
  full GLSL shader version later if desired.
*/

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CanvasRevealEffectProps {
  colors?: [number, number, number][]; // RGB triplets
  dotSize?: number;
  animationSpeed?: number; // multiplier
  reverse?: boolean;
  className?: string;
  containerClassName?: string;
}

export const CanvasRevealEffect: React.FC<CanvasRevealEffectProps> = ({
  colors = [[255, 255, 255]],
  dotSize = 4,
  animationSpeed = 2,
  reverse = false,
  className,
  containerClassName,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;

    let t = 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const MAX_DURATION = 6000; // ms
    const startTime = performance.now();
    const FPS = 30;
    // fade container in and out
    if (containerRef.current) {
      containerRef.current.style.opacity = "0";
      requestAnimationFrame(() => {
        if (containerRef.current) containerRef.current.style.opacity = "1";
      });
      setTimeout(() => {
        if (containerRef.current) containerRef.current.style.opacity = "0";
      }, MAX_DURATION);
    }
    let lastFrame = 0;
    

    const draw = (now: number) => {
      if (prefersReduced) return;
      if (now - startTime > MAX_DURATION) {
        canvas.style.opacity = "0";
        return;
      }
      if (now - lastFrame < 1000 / FPS) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrame = now;

      t += 0.02 * animationSpeed * (reverse ? -1 : 1);
      ctx.clearRect(0, 0, width, height);
      const cols = Math.floor(width / (dotSize * 2));
      const rows = Math.floor(height / (dotSize * 2));
      const offsetX = ((Math.sin(t) + 1) / 2) * dotSize * 2;
      const offsetY = ((Math.cos(t) + 1) / 2) * dotSize * 2;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const [r, g, b] = colors[(x + y) % colors.length];
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.6)`;
          ctx.beginPath();
          ctx.arc(
            x * dotSize * 2 + offsetX,
            y * dotSize * 2 + offsetY,
            dotSize,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    const handleResize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [animationSpeed, colors, dotSize, reverse]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden pointer-events-none opacity-0 transition-opacity duration-700", containerClassName)}>
      <canvas ref={canvasRef} className={cn("w-full h-full", className)} />
    </div>
  );
};
