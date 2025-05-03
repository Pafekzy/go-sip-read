
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
        <div className="gosip-gradient-section">
          <h2 className="text-3xl font-bold bright-text mb-8">Why Choose GoSipRead?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefitCards.map((benefit, index) => (
              <div key={index} className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:scale-105 transition-transform">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-full bg-white/20 mb-4">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 bright-text">{benefit.title}</h3>
                  <p className="text-white/80 dark:text-purple-200">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
