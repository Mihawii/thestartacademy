import { Metadata } from 'next';
import { AboutHero } from '@/components/sections/about-hero';
import { OurStorySection } from '@/components/sections/our-story';
import { ServicesSection } from '@/components/sections/services-section';
import { TeamSection } from '@/components/sections/team-section';
import { MissionVision } from '@/components/sections/mission-vision';
import { Footer } from '@/components/ui/footer';

export const metadata: Metadata = {
  title: 'About The Start Academy | Premier High School Business Accelerator Program',
  description: 'Discover how The Start Academy became Central Asia\'s leading accelerator program for high schoolers. Learn about our entrepreneurship training, project management education, and how we empower the next generation of business leaders.',
  keywords: [
    'about the start academy',
    'high school business accelerator',
    'entrepreneurship program for teenagers',
    'project management education',
    'business training for high schoolers',
    'startup accelerator program',
    'youth entrepreneurship central asia',
    'business education for students',
    'the start academy story',
    'high school startup program',
    'teen entrepreneur training',
    'business skills development',
    'startup mentorship program',
    'entrepreneurial education',
    'business accelerator for youth'
  ],
  openGraph: {
    title: 'About The Start Academy | Premier High School Business Accelerator',
    description: 'Learn how The Start Academy became Central Asia\'s leading accelerator program for high schoolers interested in entrepreneurship and project management.',
    url: 'https://thestartacademy.com/about',
    siteName: 'The Start Academy',
    images: [
      {
        url: '/logo/logo.svg',
        width: 1200,
        height: 630,
        alt: 'About The Start Academy - High School Business Accelerator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About The Start Academy | High School Business Accelerator',
    description: 'Discover Central Asia\'s premier accelerator program for high schoolers interested in entrepreneurship and project management.',
    images: ['/logo/logo.svg'],
  },
  alternates: {
    canonical: 'https://thestartacademy.com/about',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <AboutHero />
      <OurStorySection />
      <MissionVision />
      <ServicesSection />
      <TeamSection />
      <Footer />
    </main>
  );
}
