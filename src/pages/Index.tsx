import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { BookOpen, Headphones, Film, MessageCircle, Award, Users } from "lucide-react";

const features = [
  {
    title: "Books & Articles",
    description: "Access a vast library of books and articles for continuous learning.",
    icon: BookOpen,
    color: "bg-gosip-soft-blue",
  },
  {
    title: "Podcasts",
    description: "Listen to educational podcasts from thought leaders in various fields.",
    icon: Headphones,
    color: "bg-gosip-soft-pink",
  },
  {
    title: "Videos",
    description: "Watch curated videos that help you learn new concepts efficiently.",
    icon: Film,
    color: "bg-gosip-soft-orange",
  },
  {
    title: "AI Learning Assistant",
    description: "Get personalized learning recommendations and answers to your questions.",
    icon: MessageCircle,
    color: "bg-gosip-soft-green",
  },
  {
    title: "Achievements & Badges",
    description: "Earn badges and track achievements as you progress in your learning journey.",
    icon: Award,
    color: "bg-gosip-soft-purple",
  },
  {
    title: "Learning Groups",
    description: "Join or create learning groups to study together and motivate each other.",
    icon: Users,
    color: "bg-gosip-soft-yellow",
  },
];

export default function Index() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Logo />
        <div className="space-x-2">
          <Button 
            variant="ghost" 
            onClick={() => setShowLogin(true)}
          >
            Login
          </Button>
          <Button 
            className="bg-gosip-purple hover:bg-gosip-purple-dark"
            onClick={() => setShowLogin(true)}
          >
            Get Started
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {showLogin ? (
          <div className="container mx-auto px-4 py-10">
            <LoginForm />
            <div className="text-center mt-6">
              <Button
                variant="link"
                onClick={() => setShowLogin(false)}
              >
                Back to Home
              </Button>
            </div>
          </div>
        ) : (
          <>
            <section className="py-16 md:py-24">
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-6 gosip-gradient-text">
                  Early And Continuous Self-Learning
                </h1>
                <p className="text-xl max-w-3xl mx-auto mb-10 text-muted-foreground">
                  Your all-in-one platform for books, podcasts, and videos. Learn at your own pace, 
                  track your progress, and connect with fellow learners.
                </p>
                <Button 
                  className="bg-gosip-purple hover:bg-gosip-purple-dark text-lg px-6 py-6 h-auto"
                  onClick={() => setShowLogin(true)}
                >
                  Start Your Learning Journey
                </Button>
              </div>
            </section>

            <section className="py-16 bg-gradient-to-b from-background to-gosip-soft-purple/30">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-16">Everything You Need to Learn Better</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <div key={index} className="gosip-card flex flex-col items-center text-center">
                      <div className={`p-4 rounded-full ${feature.color} mb-4`}>
                        <feature.icon className="h-6 w-6 text-gosip-purple-dark" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="bg-card py-6 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
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
