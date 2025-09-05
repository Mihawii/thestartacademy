'use client';
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProgramOverviewSectionProps {
  className?: string;
}

export const ProgramOverviewSection: React.FC<ProgramOverviewSectionProps> = ({ className }) => (
  <section id="program" className={cn("py-24 md:py-32 w-full bg-background text-foreground", className)}>
    <div className="container mx-auto flex flex-col gap-6 items-center text-center max-w-4xl px-4">
      <h2 className="text-3xl md:text-5xl font-semibold">Program&nbsp;Overview</h2>
      <p className="text-lg md:text-xl text-muted-foreground">
        Our four-week intensive syllabus is designed to build real entrepreneurial muscle:
      </p>
      <motion.div
        className="mt-10 grid gap-6 sm:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {[
          {
            week: 1,
            title: 'Foundations of Business & Entrepreneurship',
            desc: 'Market research, problem-solution fit, lean validation.',
            emoji: '💡',
          },
          {
            week: 2,
            title: 'Brand Management & CSR',
            desc: 'Positioning, pricing, storytelling, social impact.',
            emoji: '🎯',
          },
          {
            week: 3,
            title: 'Project Management',
            desc: 'Agile frameworks, roadmap planning, execution tracking.',
            emoji: '📈',
          },
          {
            week: 4,
            title: 'Pitch Prep',
            desc: 'Deck crafting, investor storytelling, demo-day rehearsal.',
            emoji: '🎤',
          },
        ].map(({ week, title, desc, emoji }) => (
          <motion.div
            key={week}
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="relative overflow-hidden border backdrop-blur-md hover:shadow-lg transition-shadow bg-white/5">
              <CardHeader className="items-center text-center gap-2">
                <CardTitle>Week {week}</CardTitle>
                <p className="text-base font-medium mt-1">{title}</p>
                <CardDescription>{desc}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <p className="mt-10 text-lg md:text-xl text-muted-foreground">
        After graduation, fellows unlock exclusive opportunities—internships at US-based startups, potential seed funding, professional interview preparation, and ongoing workshops with industry leaders.
      </p>
      <p className="text-lg md:text-xl text-muted-foreground">
        While the core accelerator spans just **4 intensive weeks**, our post-graduation support extends **12&nbsp;–&nbsp;36 months** and includes continued mentorship, workshops, and partnership opportunities to help teams refine their products and scale.
      </p>
    </div>
  </section>
);
