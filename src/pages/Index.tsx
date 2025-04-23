import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { BookOpen, Headphones, Film, MessageCircle, Award, Users, Target, Rocket, Star, MousePointer, MessageSquare, BadgeIndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

const features = [{
  title: "Early And Continuous Self-Learning",
  description: "Start your journey of continuous learning with our curated resources.",
  icon: BookOpen,
  color: "bg-gosip-soft-blue",
  path: "/early-learning"
}, {
  title: "Podcasts",
  description: "Listen to educational podcasts from thought leaders in various fields.",
  icon: Headphones,
  color: "bg-gosip-soft-pink",
  path: "/podcasts"
}, {
  title: "Videos",
  description: "Watch curated videos that help you learn new concepts efficiently.",
  icon: Film,
  color: "bg-gosip-soft-orange",
  path: "/videos"
}, {
  title: "AI Learning Assistant",
  description: "Get personalized learning recommendations and answers to your questions.",
  icon: MessageCircle,
  color: "bg-gosip-soft-green",
  path: "/ai-assistant"
}, {
  title: "Achievements & Badges",
  description: "Earn badges and track achievements as you progress in your learning journey.",
  icon: Award,
  color: "bg-gosip-soft-purple",
  path: "/achievements"
}, {
  title: "AI Mentor Discussion",
  description: "Engage in personalized discussions with an AI mentor to guide your learning path.",
  icon: MessageSquare,
  color: "bg-gosip-soft-yellow",
  path: "/ai-mentor-discussion"
}, {
  title: "Practice Presentness Game",
  description: "Train your focus and mindfulness with an engaging number-matching game.",
  icon: MousePointer,
  color: "bg-gosip-soft-green",
  path: "/presentness-game"
}, {
  title: "Learning Groups",
  description: "Join or create learning groups to study together and motivate each other.",
  icon: Users,
  color: "bg-gosip-soft-yellow",
  path: "/groups"
}];

const benefitCards = [{
  icon: Target,
  title: "Automated Tracking",
  description: "Zero manual logging needed - we automatically track your reading, watching, and listening progress."
}, {
  icon: Star,
  title: "AI-Powered Mentor",
  description: "Get personalized recommendations and gentle nudges from your AI mentor persona."
}, {
  icon: Rocket,
  title: "Gamified Learning",
  description: "Join Book Wars, earn badges, and compete in monthly challenges with fellow learners."
}, {
  icon: BadgeIndianRupee,
  title: "Win Real Cash",
  description: "Earn real money (₦) rewards for your learning achievements and consistency.",
  className: "animate-bounce hover:animate-none", // Add bounce animation on hover
  amountClass: "inline-block animate-pulse text-gosip-purple font-bold",
  amount: "₦5,000"
}];

export default function Index() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header section */}
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Logo />
        <div className="space-x-2">
          <Button variant="ghost" onClick={() => setShowLogin(true)}>
            Login
          </Button>
          <Button className="bg-gosip-purple hover:bg-gosip-purple-dark" onClick={() => setShowLogin(true)}>
            Get Started
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {showLogin ? (
          <div className="container mx-auto px-4 py-10">
            <LoginForm />
            <div className="text-center mt-6">
              <Button variant="link" onClick={() => setShowLogin(false)}>
                Back to Home
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Hero Section with improved padding and responsiveness */}
            <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gosip-soft-purple/30 to-gosip-soft-blue/30 -z-10" />
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight tracking-tight gosip-gradient-text md:text-4xl">
                    Your AI-Powered Self-Development Companion
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-normal py-0 px-[16px]">
                    Stay consistent with personal growth despite your busy schedule through automation, 
                    AI-driven recommendations, and gamified learning experiences.
                  </p>
                  <Button className="bg-gosip-purple hover:bg-gosip-purple-dark text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto mt-8" onClick={() => setShowLogin(true)}>
                    Start Your Growth Journey
                  </Button>
                </div>
              </div>
            </section>

            {/* Vision Section with improved responsiveness */}
            <section className="py-12 sm:py-16 bg-card">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 gosip-gradient-text">Our Vision</h2>
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    "To make personal and professional development effortless, enjoyable, and embedded 
                    into the daily lives of techpreneurs."
                  </p>
                </div>
              </div>
            </section>

            {/* Benefits Section with improved responsiveness */}
            <section className="py-12 sm:py-16">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Why Choose GoSipRead?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  {benefitCards.map((benefit, index) => (
                    <div 
                      key={index} 
                      className={`gosip-card hover:scale-105 transition-transform ${benefit.className || ''}`}
                    >
                      <div className="flex flex-col items-center text-center p-6">
                        <div className="p-4 rounded-full bg-gosip-soft-purple mb-4">
                          <benefit.icon className="h-6 w-6 text-gosip-purple-dark" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-3">{benefit.title}</h3>
                        <p className="text-muted-foreground">
                          {benefit.description}
                          {benefit.amount && (
                            <span className={benefit.amountClass}> {benefit.amount}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Features Section with improved responsiveness */}
            <section className="py-12 sm:py-16 bg-gradient-to-b from-background to-gosip-soft-purple/30">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Everything You Need to Learn Better</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {features.map((feature, index) => (
                    <Link to={feature.path} key={index} className="block hover:scale-105 transition-transform">
                      <div className="gosip-card flex flex-col items-center text-center p-6">
                        <div className={`p-4 rounded-full ${feature.color} mb-4`}>
                          <feature.icon className="h-6 w-6 text-gosip-purple-dark" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer with improved responsiveness */}
      <footer className="bg-card py-6 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <Logo />
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} GoSipRead. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
