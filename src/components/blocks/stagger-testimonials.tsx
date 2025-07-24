"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  { id: 1, testimonial: "TSa showed me what's possible. My mentor was amazing.", by: "Lola I., School #64, Tashkent" },
  { id: 2, testimonial: "I always had ideas, but TSa gave me the courage to pursue them. The workshops on project management were gold.", by: "Daniyar K., Lyceum #134, Almaty" },
  { id: 3, testimonial: "It's more than a program; it's a community. I met so many inspiring people.", by: "Olena P., Gymnasium 'Obolon', Kyiv" },
  { id: 4, testimonial: "The guidance I received was practical and honest. It helped me build a real plan for my future.", by: "Aarav N., Kendriya Vidyalaya, Mumbai" },
  { id: 5, testimonial: "I finally understand what it means to build a network. Invaluable.", by: "Madina S., School #17, Samarkand" },
  { id: 6, testimonial: "From a vague dream to a concrete project. That's what TSa did for me.", by: "Alikhan B., School-Lyceum #54, Nur-Sultan" },
  { id: 7, testimonial: "The best part was the one-on-one mentorship. It made all the difference.", by: "Iryna V., Lviv Physics and Mathematics Lyceum, Lviv" },
  { id: 8, testimonial: "I learned so much from my peers. The collaborative spirit is fantastic.", by: "Priya M., Bhavan's Vidya Mandir, Kochi" },
  { id: 9, testimonial: "TSa connected me with people I'd never have met otherwise. It opened up my world.", by: "Bekzod A., Academic Lyceum, Bukhara" },
  { id: 10, testimonial: "It's intense, but so rewarding. You get out what you put in.", by: "Kateryna S., Richelieu Lyceum, Odesa" },
  { id: 11, testimonial: "My confidence grew so much. I feel ready to take on new challenges.", by: "Nikhil J., Bishop Cotton Boys' School, Bangalore" },
  { id: 12, testimonial: "This program helped me think bigger.", by: "Gaukhar E., Gymnasium #25, Shymkent" },
  { id: 13, testimonial: "The workshops are top-notch. I learned skills I'm already using.", by: "Sanjar T., Presidential School, Namangan" },
  { id: 14, testimonial: "A truly transformative experience.", by: "Aditi R., La Martiniere for Girls, Kolkata" },
  { id: 15, testimonial: "I wasn't sure what to expect, but it exceeded all my hopes. The support is incredible.", by: "Yaroslav H., Polytechnic Lyceum 'KPI', Kyiv" },
  { id: 16, testimonial: "My mentor pushed me to be better, and I'm so grateful for it.", by: "Aruzhan Z., Republican Physics and Mathematics School, Almaty" },
  { id: 17, testimonial: "Just do it. You won't regret it.", by: "Fatima Y., International School, Tashkent" },
  { id: 18, testimonial: "The focus on real-world skills is exactly what I needed.", by: "Ravi K., The Doon School, Dehradun" },
  { id: 19, testimonial: "It helped me find clarity in what I want to do after school.", by: "Anastasiia M., Natural Sciences Lyceum #145, Kyiv" },
  { id: 20, testimonial: "An amazing network of mentors and peers. So glad I joined.", by: "Sultan N., Lyceum 'Bilim-Innovation', Karaganda" }
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export const StaggerTestimonials: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const testimonialIndex = (page % testimonials.length + testimonials.length) % testimonials.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-[500px] overflow-hidden bg-muted/30 py-12">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-[90%] max-w-lg h-auto cursor-pointer rounded-xl border-2 p-6 flex flex-col justify-between bg-zinc-900/90 text-white shadow-2xl backdrop-blur-md"
        >
          <Quote className="h-8 w-8 shrink-0 text-primary-foreground/50" />
          <div className="flex-grow flex items-center my-6">
            <h3 className="text-lg font-medium text-center leading-relaxed text-primary-foreground">
              &ldquo;{testimonials[testimonialIndex].testimonial}&rdquo;
            </h3>
          </div>
          <p className="mt-4 text-sm italic text-center text-primary-foreground/80">
            - {testimonials[testimonialIndex].by}
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-4">
        <button
          onClick={() => paginate(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full text-2xl transition-transform transition-colors duration-200 hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-primary/60",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => paginate(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full text-2xl transition-transform transition-colors duration-200 hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-primary/60",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
