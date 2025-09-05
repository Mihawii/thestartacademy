'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: "Aida Nazarbayeva",
    role: "TSA Alumni, Stanford University",
    content: "The Start Academy completely transformed my approach to business. The mentorship and real-world projects gave me the confidence to launch my own startup during high school.",
    avatar: "AN",
  },
  {
    id: 2,
    name: "Arman Kassymov",
    role: "TSA Alumni, MIT",
    content: "What sets TSA apart is the practical experience. I learned project management skills that helped me secure internships at top tech companies before even starting university.",
    avatar: "AK",
  },
  {
    id: 3,
    name: "Zhanel Omarova",
    role: "TSA Alumni, Harvard Business School",
    content: "The entrepreneurship program at TSA opened doors I never knew existed. The network and skills I gained are invaluable for my business career.",
    avatar: "ZO",
  },
  {
    id: 4,
    name: "Dias Mukanov",
    role: "TSA Alumni, Entrepreneur",
    content: "TSA taught me to think like a business leader from day one. The strategic thinking and leadership skills I developed are the foundation of my success today.",
    avatar: "DM",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            What Our Students Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from our alumni who have gone on to achieve remarkable success in business and entrepreneurship.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <Card className="border-none shadow-lg bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col items-center text-center">
                      <Quote className="w-12 h-12 text-primary mb-6 opacity-20" />
                      
                      <blockquote className="text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
                        "{testimonials[currentIndex].content}"
                      </blockquote>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                          {testimonials[currentIndex].avatar}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-lg">
                            {testimonials[currentIndex].name}
                          </div>
                          <div className="text-muted-foreground">
                            {testimonials[currentIndex].role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full hover:scale-110 transition-transform duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary scale-125'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full hover:scale-110 transition-transform duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Auto-play indicator */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isAutoPlaying ? 'Pause' : 'Resume'} auto-play
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
