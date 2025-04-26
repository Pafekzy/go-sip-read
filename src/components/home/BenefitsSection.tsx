
import { Target, Star, Rocket } from "lucide-react";

const benefitCards = [
  {
    icon: Target,
    title: "Automated Tracking",
    description: "Zero manual logging needed - we automatically track your reading, watching, and listening progress."
  },
  {
    icon: Star,
    title: "AI-Powered Mentor",
    description: "Get personalized recommendations and gentle nudges from your AI mentor persona."
  },
  {
    icon: Rocket,
    title: "Gamified Learning",
    description: "Join Book Wars, earn badges, and compete in monthly challenges with fellow learners."
  }
];

export function BenefitsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose GoSipRead?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefitCards.map((benefit, index) => (
            <div key={index} className="gosip-card hover:scale-105 transition-transform">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-gosip-soft-purple mb-4">
                  <benefit.icon className="h-6 w-6 text-gosip-purple-dark" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
