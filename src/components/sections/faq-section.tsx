"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FaqItem {
  q: string;
  a: React.ReactNode;
}

const faqData: FaqItem[] = [
  {
    q: "What makes Start Academy different from other student business programs?",
    a: (
      <p>
        It&apos;s 100% practical, hands-on, and built around real-world outcomes—not just
        lectures.
      </p>
    ),
  },
  {
    q: "Do I need any prior experience in business or entrepreneurship?",
    a: (
      <p>
        Nope. Just curiosity and motivation.
      </p>
    ),
  },
  {
    q: "How competitive is the application process?",
    a: (
      <p>
        Definitely selective, but not scary. We look for drive, not perfect resumes.
      </p>
    ),
  },
  {
    q: "Who are the people behind Start Academy?",
    a: (
      <p>
        A global team of student leaders, startup mentors, and education innovators.
      </p>
    ),
  },
  {
    q: "Will I actually build something real during the program?",
    a: (
      <p>
        Yes. You&apos;ll create and pitch your own project by the end.
      </p>
    ),
  },
  {
    q: "What happens if my capstone idea is really good?",
    a: (
      <p>
        We may help you take it further—with mentoring, funding, or visibility.
      </p>
    ),
  },
  {
    q: "Can this program help me get an internship or job later?",
    a: (
      <p>
        Definitely. Top students get access to real internship opportunities.
      </p>
    ),
  },
  {
    q: "Is this program more about theory or real-world practice?",
    a: (
      <p>
        Way more about practice. You&apos;ll learn by doing.
      </p>
    ),
  },
  {
    q: "Can international students join?",
    a: (
      <p>
        Yes, absolutely.
      </p>
    ),
  },
  {
    q: "Do I need to speak perfect English to participate?",
    a: (
      <p>
        No, just enough to understand and be understood. We support you along the
        way.
      </p>
    ),
  },
];

export const FaqSection: React.FC<{ className?: string }> = ({ className }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => setOpenIndex((v) => (v === idx ? null : idx));

  return (
    <section
      id="faq"
      className={cn(
        "py-24 md:py-32 w-full bg-background text-foreground",
        className,
      )}
    >
      <div className="container mx-auto max-w-3xl px-4 flex flex-col gap-8 items-center text-center">
        <h2 className="text-3xl md:text-5xl font-semibold">Frequently&nbsp;Asked&nbsp;Questions</h2>
        <ul className="w-full text-left divide-y divide-white/10 border border-white/10 rounded-xl overflow-hidden">
          {faqData.map(({ q, a }, idx) => (
            <li key={q}>
              <button
                className="w-full flex items-center justify-between py-5 px-6 text-lg font-medium hover:bg-white/5 transition-colors"
                onClick={() => toggle(idx)}
                aria-expanded={openIndex === idx}
              >
                <span>{q}</span>
                <span
                  className={cn(
                    "transform transition-transform duration-200",
                    openIndex === idx ? "rotate-45" : "rotate-0",
                  )}
                >
                  +
                </span>
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 px-6",
                  openIndex === idx ? "max-h-40 py-4" : "max-h-0 py-0",
                )}
              >
                <div className="text-muted-foreground text-base leading-relaxed">
                  {a}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
