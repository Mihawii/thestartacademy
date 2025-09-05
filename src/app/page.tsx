"use client";

import React from "react";
import dynamic from 'next/dynamic'
import Head from 'next/head'
import HeroSection from "@/components/sections/hero-section";
import { StaggerTestimonials } from "@/components/blocks/stagger-testimonials";
import { MiniNavbar } from "@/components/ui/mini-navbar";
import { Footer } from "@/components/ui/footer";
import ErrorBoundary from "@/components/ui/error-boundary";

const AboutSection = dynamic(() => import('@/components/sections/about-section').then(mod => ({ default: mod.AboutSection })), { ssr: false });
const ProgramOverviewSection = dynamic(() => import('@/components/sections/program-overview-section').then(mod => mod.ProgramOverviewSection));
const PluraAISection = dynamic(() => import('@/components/sections/plura-ai-section').then(mod => mod.PluraAISection));
const ImportantDatesSection = dynamic(() => import('@/components/sections/important-dates-section').then(mod => ({ default: mod.ImportantDatesSection })), { ssr: false });
const TestimonialsSection = dynamic(() => import('@/components/sections/testimonials-section').then(mod => ({ default: mod.TestimonialsSection })), { ssr: false });
const FaqSection = dynamic(() => import('@/components/sections/faq-section').then(mod => mod.FaqSection));

export default function Home() {
  return (
    <ErrorBoundary>
      <Head>
        <title>The Start Academy | #1 High School Business Accelerator | Entrepreneurship Program</title>
        <meta name="description" content="Central Asia's premier accelerator program for high schoolers interested in entrepreneurship and project management. Real-world business skills, startup experience, and expert mentorship. Transform your ideas into reality." />
        <meta name="keywords" content="the start academy, start academy, the start, start, high school business accelerator, entrepreneurship program for high schoolers, project management for teenagers, business training for high school students, startup accelerator for youth, teen entrepreneur program, opportunities for international high schoolers, full ride summer program alternative, business accelerator program, startup mentorship for teens" />
        <meta property="og:title" content="The Start Academy | #1 High School Business Accelerator Program" />
        <meta property="og:description" content="Central Asia's premier accelerator program for high schoolers interested in entrepreneurship and project management. Real-world business skills and startup experience." />
        <meta name="twitter:title" content="The Start Academy | High School Business Accelerator Program" />
        <meta name="twitter:description" content="Premier accelerator program for high schoolers interested in entrepreneurship and project management. Transform your business ideas into reality." />
        <link rel="canonical" href="https://thestartacademy.com" />
      </Head>
      <MiniNavbar />
      <main>
        <HeroSection />
        <StaggerTestimonials />
        <AboutSection />
        <ProgramOverviewSection />
        <ImportantDatesSection />
        <PluraAISection />
        <FaqSection />
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
