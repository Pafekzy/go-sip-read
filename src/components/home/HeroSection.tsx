
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Trigger animation on component mount
    setIsVisible(true);
  }, []);

  return (
    <section className="py-16 md:py-24 relative overflow-visible">
      {/* Updated gradient background with more solid purple effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gosip-purple/70 via-gosip-purple-dark/60 to-gosip-soft-purple/50 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gosip-soft-purple/30 -z-10" />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="heading-container py-2 overflow-visible">
            <h1 
              className={`text-4xl md:text-6xl font-bold mb-6 leading-relaxed gosip-gradient-text ${isVisible ? 'animate-pulse' : ''}`} 
              style={{ lineHeight: 1.4, overflow: 'visible' }}
            >
              Win ₦Cash Using Gamified Learning
            </h1>
          </div>
          <p 
            className={`text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            style={{ lineHeight: 1.6, overflow: 'visible' }}
          >
            Keep Sipping, Keep Getting Greater
            <span className="inline-block ml-1 transform transition-all duration-300 hover:scale-110 hover:brightness-125">💰!</span>
          </p>
          <Button 
            className={`bg-gosip-purple hover:bg-gosip-purple-dark text-lg px-8 py-6 h-auto ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            style={{ animationDelay: "0.2s" }}
            onClick={onGetStarted}
          >
            Start Your Growth Journey
          </Button>
        </div>
      </div>
    </section>
  );
}
