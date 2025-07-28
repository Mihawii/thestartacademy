import React from "react";
import dynamic from 'next/dynamic'
import { Hero } from "@/components/sections/hero-section";
import { StaggerTestimonials } from "@/components/blocks/stagger-testimonials";
import { MiniNavbar } from "@/components/ui/mini-navbar";
import ErrorBoundary from "@/components/ui/error-boundary";

const AboutSection = dynamic(() => import('@/components/sections/about-section').then(mod => mod.AboutSection));
const ProgramOverviewSection = dynamic(() => import('@/components/sections/program-overview-section').then(mod => mod.ProgramOverviewSection));
const ImportantDatesSection = dynamic(() => import('@/components/sections/important-dates-section').then(mod => mod.ImportantDatesSection));
const FaqSection = dynamic(() => import('@/components/sections/faq-section').then(mod => mod.FaqSection));

export default function Home() {
  return (
    <ErrorBoundary>
      <MiniNavbar />
      <Hero />
      <StaggerTestimonials />
      <AboutSection />
      <ProgramOverviewSection />
      <ImportantDatesSection />
      <FaqSection />
    </ErrorBoundary>
  );
}
