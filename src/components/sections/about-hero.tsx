import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SiteLogo from '@/components/ui/site-logo';

export const AboutHero: React.FC = () => {
  return (
    <section className="relative py-32 md:py-40 bg-gradient-to-br from-background via-background to-muted/20">
      {/* Back to Home button - positioned at top left */}
      <div className="absolute top-8 left-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="px-4 py-2 transition-all duration-300 hover:scale-105 text-foreground hover:bg-accent">
            ← Back to Home
          </Button>
        </Link>
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="mb-8 flex justify-center">
          <SiteLogo 
            size={120}
            className="transition-transform duration-300 hover:scale-110"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
          About The Start Academy
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Central Asia's premier accelerator program empowering high schoolers with entrepreneurship and project management skills.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/apply">
            <Button size="lg" className="px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25">
              Join Our Program
            </Button>
          </Link>
          <Link href="#our-story">
            <Button variant="outline" size="lg" className="px-8 py-3 transition-all duration-300 hover:scale-105">
              Our Story
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
