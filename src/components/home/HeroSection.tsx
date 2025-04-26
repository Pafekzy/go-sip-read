
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="py-16 md:py-24 relative overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-br from-gosip-soft-purple/30 to-gosip-soft-blue/30 -z-10" />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="heading-container py-2">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight gosip-gradient-text">
              Your AI-Powered Self-Development Companion
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Stay consistent with personal growth despite your busy schedule through automation, 
            AI-driven recommendations, and gamified learning experiences.
          </p>
          <Button 
            className="bg-gosip-purple hover:bg-gosip-purple-dark text-lg px-8 py-6 h-auto"
            onClick={onGetStarted}
          >
            Start Your Growth Journey
          </Button>
        </div>
      </div>
    </section>
  );
}
