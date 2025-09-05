'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, BarChart3, Palette, Target, DollarSign, Laptop } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const services = [
    {
      icon: Rocket,
      title: 'Entrepreneurship Education',
      description: 'Comprehensive entrepreneurship training covering ideation, validation, business model development, and startup execution.',
      features: ['Business Model Canvas', 'Market Research', 'Customer Validation', 'Startup Fundamentals']
    },
    {
      icon: BarChart3,
      title: 'Project Management Education',
      description: 'Industry-standard project management methodologies and frameworks tailored for young entrepreneurs.',
      features: ['Agile & Scrum Frameworks', 'Team Leadership Skills', 'Resource Planning', 'Timeline Management']
    },
    {
      icon: Palette,
      title: 'Branding Education',
      description: 'Complete brand development and marketing strategies for building strong business identities.',
      features: ['Brand Strategy', 'Visual Identity Design', 'Brand Positioning', 'Marketing Communications']
    },
    {
      icon: Target,
      title: 'Business Strategy Education',
      description: 'Strategic thinking and business planning skills for long-term success and competitive advantage.',
      features: ['Strategic Planning', 'Competitive Analysis', 'Market Entry Strategies', 'Growth Planning']
    },
    {
      icon: DollarSign,
      title: 'VC Education',
      description: 'Understanding venture capital, funding strategies, and investor relations for scaling businesses.',
      features: ['Funding Landscape', 'Pitch Deck Creation', 'Investor Relations', 'Valuation Methods']
    },
    {
      icon: Laptop,
      title: 'Tech Startups Sessions',
      description: 'Specialized sessions focused on technology startups, digital innovation, and tech entrepreneurship.',
      features: ['Tech Trends Analysis', 'Digital Product Development', 'Tech Business Models', 'Innovation Frameworks']
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const section = sectionRef.current;
      
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollProgress = (scrollY - sectionTop + windowHeight / 2) / sectionHeight;
        
        if (scrollProgress > 0 && scrollProgress < 1) {
          const cardIndex = Math.floor(scrollProgress * services.length);
          const newActiveCard = Math.min(Math.max(cardIndex, 0), services.length - 1);
          
          if (newActiveCard !== activeCard) {
            setActiveCard(newActiveCard);
          }
        }
      }
    };

    const throttledHandleScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [activeCard, services.length]);

  return (
    <section ref={sectionRef} id="services-section" className="py-24 md:py-32 bg-muted/30 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            What We Provide
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of services designed to transform ambitious high schoolers into confident business leaders and entrepreneurs.
          </p>
        </div>

        <div className="sticky top-20">
          {services.map((service, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ease-in-out ${
                activeCard === index
                  ? 'opacity-100 translate-y-0 scale-100'
                  : activeCard > index
                  ? 'opacity-30 -translate-y-12 scale-95'
                  : 'opacity-30 translate-y-12 scale-95'
              }`}
            >
              <Card className={`transition-all duration-500 ease-out backdrop-blur-sm border-2 transform-gpu ${
                index === activeCard 
                  ? 'scale-100 opacity-100 shadow-2xl border-primary/50 bg-background/90' 
                  : 'scale-95 opacity-40 shadow-lg border-muted/30 bg-background/60'
              }`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      index === activeCard 
                        ? 'bg-gradient-to-br from-primary/20 to-primary/10 text-primary' 
                        : 'bg-muted/50 text-muted-foreground'
                    }`}>
                      <service.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-lg leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex}
                        className={`p-3 rounded-lg border transition-all duration-300 ${
                          index === activeCard 
                            ? 'bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20' 
                            : 'bg-muted/30 border-muted/20'
                        }`}
                      >
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        {/* Scroll indicator */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-1 z-20">
          {services.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-6 rounded-full transition-all duration-300 ${
                activeCard === index ? 'bg-primary' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
