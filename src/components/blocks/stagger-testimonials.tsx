"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

// Testimonials array provided by user
const testimonials = [
  { tempId: 1, testimonial: "TSa showed me what's possible. My mentor was amazing.", by: "Lola I., School #64, Tashkent" },
  { tempId: 2, testimonial: "I always had ideas, but TSa gave me the courage to pursue them. The workshops on project management were gold.", by: "Daniyar K., Lyceum #134, Almaty" },
  { tempId: 3, testimonial: "It's more than a program; it's a community. I met so many inspiring people.", by: "Olena P., Gymnasium 'Obolon', Kyiv" },
  { tempId: 4, testimonial: "The guidance I received was practical and honest. It helped me build a real plan for my future.", by: "Aarav N., Kendriya Vidyalaya, Mumbai" },
  { tempId: 5, testimonial: "I finally understand what it means to build a network. Invaluable.", by: "Madina S., School #17, Samarkand" },
  { tempId: 6, testimonial: "From a vague dream to a concrete project. That's what TSa did for me.", by: "Alikhan B., School-Lyceum #54, Nur-Sultan" },
  { tempId: 7, testimonial: "The best part was the one-on-one mentorship. It made all the difference.", by: "Iryna V., Lviv Physics and Mathematics Lyceum, Lviv" },
  { tempId: 8, testimonial: "I learned so much from my peers. The collaborative spirit is fantastic.", by: "Priya M., Bhavan's Vidya Mandir, Kochi" },
  { tempId: 9, testimonial: "TSa connected me with people I'd never have met otherwise. It opened up my world.", by: "Bekzod A., Academic Lyceum, Bukhara" },
  { tempId: 10, testimonial: "It's intense, but so rewarding. You get out what you put in.", by: "Kateryna S., Richelieu Lyceum, Odesa" },
  { tempId: 11, testimonial: "My confidence grew so much. I feel ready to take on new challenges.", by: "Nikhil J., Bishop Cotton Boys' School, Bangalore" },
  { tempId: 12, testimonial: "This program helped me think bigger.", by: "Gaukhar E., Gymnasium #25, Shymkent" },
  { tempId: 13, testimonial: "The workshops are top-notch. I learned skills I'm already using.", by: "Sanjar T., Presidential School, Namangan" },
  { tempId: 14, testimonial: "A truly transformative experience.", by: "Aditi R., La Martiniere for Girls, Kolkata" },
  { tempId: 15, testimonial: "I wasn't sure what to expect, but it exceeded all my hopes. The support is incredible.", by: "Yaroslav H., Polytechnic Lyceum 'KPI', Kyiv" },
  { tempId: 16, testimonial: "My mentor pushed me to be better, and I'm so grateful for it.", by: "Aruzhan Z., Republican Physics and Mathematics School, Almaty" },
  { tempId: 17, testimonial: "Just do it. You won't regret it.", by: "Fatima Y., International School, Tashkent" },
  { tempId: 18, testimonial: "The focus on real-world skills is exactly what I needed.", by: "Ravi K., The Doon School, Dehradun" },
  { tempId: 19, testimonial: "It helped me find clarity in what I want to do after school.", by: "Anastasiia M., Natural Sciences Lyceum #145, Kyiv" },
  { tempId: 20, testimonial: "An amazing network of mentors and peers. So glad I joined.", by: "Sultan N., Lyceum 'Bilim-Innovation', Karaganda" }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0;
  const scale = 1 - Math.abs(position) * 0.15;
  const opacity = 1 - Math.abs(position) * 0.3;
  const x = (cardSize / 1.5) * position;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer rounded-xl border-2 p-6 transition-all duration-300 ease-in-out",
        isCenter
          ? "z-10 border-primary bg-zinc-900/90 text-white shadow-2xl backdrop-blur-md"
          : "z-0 border-white/20 bg-white/5 text-card-foreground shadow-md backdrop-blur-sm hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        transform: `translate(-50%, -50%) translateX(${x}px) scale(${scale})`,
        opacity: opacity,
      }}
    >
      <div className="flex h-full flex-col justify-between">
        <Quote className={cn("h-8 w-8 shrink-0", isCenter ? "text-primary-foreground/50" : "text-muted-foreground/50")} />
        <div className="flex-grow flex items-center">
          <h3 className={cn("text-base font-medium text-center leading-relaxed", isCenter ? "text-primary-foreground" : "text-foreground")}>
            &ldquo;{testimonial.testimonial}&rdquo;
          </h3>
        </div>
        <p className={cn("mt-4 text-sm italic text-center", isCenter ? "text-primary-foreground/80" : "text-muted-foreground")}>
          - {testimonial.by}
        </p>
      </div>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-muted/30" style={{ height: 600 }}>
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2 ? index - (testimonialsList.length + 1) / 2 : index - testimonialsList.length / 2;
        return (
          <TestimonialCard key={testimonial.tempId} testimonial={testimonial} handleMove={handleMove} position={position} cardSize={cardSize} />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-transform transition-colors duration-200 hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-primary/60",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-transform transition-colors duration-200 hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-primary/60",
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
