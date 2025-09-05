import React from "react";
import { HandWrittenTitle } from "@/components/ui/hand-written-title";
import { cn } from "@/lib/utils";

interface Milestone {
  label: string;
  date: string;
}

const milestones: Milestone[] = [
  { label: "Applications Open", date: "Sep 18" },
  { label: "Application Deadline", date: "Oct 5" },
  { label: "Cohort Kick-off", date: "Oct 15" },
  { label: "Demo Day", date: "Dec 10" },
];

interface ImportantDatesSectionProps {
  className?: string;
}

export const ImportantDatesSection: React.FC<ImportantDatesSectionProps> = ({ className }) => (
  <section id="dates" className={cn("py-24 md:py-32 w-full bg-background text-foreground", className)}>
    <div className="container mx-auto flex flex-col gap-10 items-center text-center max-w-4xl px-4">
      <HandWrittenTitle title="Important Dates" />
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full">
        {milestones.map(({ label, date }) => (
          <li key={label} className="flex flex-col gap-2 items-center p-6 rounded-xl border border-neutral-800 bg-zinc-800/40 shadow-md">
            <span className="text-2xl font-bold text-primary">{date}</span>
            <span className="text-muted-foreground text-sm uppercase tracking-wide">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
