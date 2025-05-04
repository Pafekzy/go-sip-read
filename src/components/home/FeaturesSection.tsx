
import { BookOpen, Headphones, Film, MessageCircle, Award, Users, Brain, HeartHandshake, ClipboardCheck, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

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
  {
    title: "Practice Present Mindedness",
    description: "Improve focus and mental clarity through mindfulness games and exercises.",
    icon: Brain,
    color: "bg-gosip-soft-blue",
    path: "/mindfulness",
  },
  {
    title: "Accountability Device",
    description: "Stake money on your goals with AI or human accountability partners to ensure you follow through.",
    icon: ClipboardCheck,
    color: "bg-gosip-soft-green",
    path: "/accountability",
  },
  {
    title: "Join To Improve This Version🫂",
    description: "Help us make GoSipRead better by providing feedback and suggestions.",
    icon: HeartHandshake,
    color: "bg-gosip-soft-pink",
    path: "/feedback",
  },
];

export function FeaturesSection() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleFeatureClick = (path, needsAuth) => (e) => {
    if (needsAuth && !user) {
      e.preventDefault();
      toast({
        title: "Authentication Required",
        description: "Please register or sign in to access this feature.",
        variant: "destructive",
      });
      navigate("/register");
      return false;
    }
  };
  
  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-gosip-soft-purple/30">
      <div className="container mx-auto px-4">
        <div className="heading-container py-2">
          <h2 className="text-3xl font-bold text-center mb-16">Everything You Need to Learn Better</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link 
              to={feature.path} 
              key={index} 
              className="block hover:scale-105 transition-transform"
              onClick={handleFeatureClick(feature.path, false)}
            >
              <div className="gosip-card flex flex-col items-center text-center relative">
                {feature.title === "Accountability Device" && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 rounded-full bg-background/80 shadow-sm hover:bg-background"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleReturnHome();
                    }}
                  >
                    <Home className="h-4 w-4" />
                  </Button>
                )}
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
