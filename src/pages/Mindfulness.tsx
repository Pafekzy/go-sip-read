
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Brain, Wind, Trees, Circle, Music, Zap } from "lucide-react";

export default function Mindfulness() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const games = [
    {
      id: "mindnumber",
      name: "Mind Number",
      description: "Test your pattern recognition skills by predicting the next number in sequences.",
      icon: Brain,
      color: "bg-gosip-soft-purple",
      comingSoon: false,
    },
    {
      id: "breathsync",
      name: "Breath Sync",
      description: "Follow the rhythm to synchronize your breathing for improved focus and relaxation.",
      icon: Wind,
      color: "bg-gosip-soft-blue",
      comingSoon: false,
    },
    {
      id: "mindreflex",
      name: "Mind Reflex",
      description: "Test your reaction time and focus by finding target characters before time runs out.",
      icon: Zap,
      color: "bg-gosip-soft-orange",
      comingSoon: false,
    },
    {
      id: "forest_focus",
      name: "Forest Focus",
      description: "Immerse yourself in a virtual forest to enhance your concentration and awareness.",
      icon: Trees,
      color: "bg-gosip-soft-green",
      comingSoon: true,
    },
    {
      id: "echo_tap",
      name: "Echo Tap",
      description: "React to audio cues to improve your present-moment awareness and response time.",
      icon: Music,
      color: "bg-gosip-soft-pink",
      comingSoon: true,
    },
  ];

  const handleGameSelect = (gameId) => {
    if (gameId === "breathsync" || gameId === "mindnumber" || gameId === "mindreflex") {
      navigate(`/mindfulness/${gameId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gosip-purple"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gosip-soft-purple/30">
              <Brain className="h-8 w-8 text-gosip-purple" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Practice Present Mindedness</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enhance your focus, reduce stress, and improve mental clarity through these mindfulness games and exercises.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {games.map((game) => (
            <Card key={game.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${game.color} mr-3`}>
                    <game.icon className="h-5 w-5 text-gosip-purple-dark" />
                  </div>
                  <CardTitle>{game.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{game.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${game.comingSoon ? 'bg-muted text-muted-foreground' : 'bg-gosip-purple hover:bg-gosip-purple-dark'}`}
                  disabled={game.comingSoon} 
                  onClick={() => handleGameSelect(game.id)}
                >
                  {game.comingSoon ? "Coming Soon" : "Start Exercise"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          {user ? (
            <div>
              <Button 
                variant="outline" 
                onClick={() => navigate("/mindfulness/scores")}
                className="mr-4"
              >
                View Past Scores
              </Button>
              <Button 
                variant="outline" 
                onClick={() => supabase.auth.signOut()}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => navigate("/register")}
            >
              Register to save progress
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
