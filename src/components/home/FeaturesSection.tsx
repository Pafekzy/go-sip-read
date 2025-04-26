
import { BookOpen, Headphones, Film, MessageCircle, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Early And Continuous Self-Learning",
    description: "Start your journey of continuous learning with our curated resources.",
    icon: BookOpen,
    color: "bg-gosip-soft-blue",
    path: "/early-learning",
  },
  {
    title: "Podcasts",
    description: "Listen to educational podcasts from thought leaders in various fields.",
    icon: Headphones,
    color: "bg-gosip-soft-pink",
    path: "/podcasts",
  },
  {
    title: "Videos",
    description: "Watch curated videos that help you learn new concepts efficiently.",
    icon: Film,
    color: "bg-gosip-soft-orange",
    path: "/videos",
  },
  {
    title: "AI Learning Assistant",
    description: "Get personalized learning recommendations and answers to your questions.",
    icon: MessageCircle,
    color: "bg-gosip-soft-green",
    path: "/ai-assistant",
  },
  {
    title: "Achievements & Badges",
    description: "Earn badges and track achievements as you progress in your learning journey.",
    icon: Award,
    color: "bg-gosip-soft-purple",
    path: "/achievements",
  },
  {
    title: "Learning Groups",
    description: "Join or create learning groups to study together and motivate each other.",
    icon: Users,
    color: "bg-gosip-soft-yellow",
    path: "/groups",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-gosip-soft-purple/30">
      <div className="container mx-auto px-4">
        <div className="heading-container py-2">
          <h2 className="text-3xl font-bold text-center mb-16">Everything You Need to Learn Better</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link to={feature.path} key={index} className="block hover:scale-105 transition-transform">
              <div className="gosip-card flex flex-col items-center text-center">
                <div className={`p-4 rounded-full ${feature.color} mb-4`}>
                  <feature.icon className="h-6 w-6 text-gosip-purple-dark" />
                </div>
                <div className="heading-container py-1">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
