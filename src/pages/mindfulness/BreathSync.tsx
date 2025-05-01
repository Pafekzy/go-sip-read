
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Wind } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function BreathSync() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [breathPhase, setBreathPhase] = useState("inhale");
  const [inSync, setInSync] = useState(false);
  
  const circleRef = useRef(null);
  const timerRef = useRef(null);
  const gameTimerRef = useRef(null);

  // Check authentication but don't require it
  useEffect(() => {
    const checkAuth = async () => {
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
      if (timerRef.current) clearInterval(timerRef.current);
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, [navigate]);

  // Start game
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeElapsed(0);
    setBreathPhase("inhale");

    // Start breathing animation
    animateBreathing();
    
    // Start score timer
    timerRef.current = setInterval(() => {
      if (inSync) {
        setScore(prevScore => prevScore + 1);
      }
    }, 1000);
    
    // Start game timer
    gameTimerRef.current = setInterval(() => {
      setTimeElapsed(prev => {
        const newTime = prev + 1;
        // End game after 3 minutes
        if (newTime >= 180) {
          endGame();
        }
        return newTime;
      });
    }, 1000);
  };

  // End game
  const endGame = async () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);

    // Save score to database only if user is logged in
    if (user) {
      try {
        const { error } = await supabase
          .from('breathsync_scores')
          .insert({
            user_id: user.id,
            score: score,
            duration_seconds: timeElapsed,
            level: 1
          });

        if (error) throw error;
        
        toast({
          title: "Score saved!",
          description: `You scored ${score} points in ${timeElapsed} seconds.`,
        });
      } catch (error) {
        console.error("Error saving score:", error);
        toast({
          title: "Error saving score",
          description: "There was a problem saving your score.",
          variant: "destructive",
        });
      }
    } else {
      // Show message to non-authenticated users
      toast({
        title: "Score not saved",
        description: "Create an account to save your scores and track your progress.",
      });
    }
  };

  // Simulate breathing animation
  const animateBreathing = () => {
    if (!circleRef.current) return;
    
    const breathCycle = 8000; // 8 seconds per full breath cycle
    const inhaleTime = 4000; // 4 seconds to inhale
    const exhaleTime = 4000; // 4 seconds to exhale
    
    const animate = () => {
      if (!isPlaying) return;
      
      // Inhale phase
      setBreathPhase("inhale");
      circleRef.current.style.transform = "scale(1.5)";
      circleRef.current.style.transition = `transform ${inhaleTime}ms ease-in`;
      
      setTimeout(() => {
        if (!isPlaying) return;
        
        // Exhale phase
        setBreathPhase("exhale");
        circleRef.current.style.transform = "scale(1)";
        circleRef.current.style.transition = `transform ${exhaleTime}ms ease-out`;
        
        setTimeout(() => {
          if (isPlaying) animate();
        }, exhaleTime);
      }, inhaleTime);
    };
    
    animate();
  };
  
  // Sync breath with spacebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying || e.key !== " ") return;
      
      // Spacebar pressed - check if in sync with breath phase
      const isInSync = 
        (e.type === "keydown" && breathPhase === "inhale") || 
        (e.type === "keyup" && breathPhase === "exhale");
      
      setInSync(isInSync);
      
      if (isInSync) {
        toast({
          title: "In sync!",
          description: "Keep breathing with the rhythm.",
        });
      }
    };
    
    const handleKeyUp = (e) => {
      if (!isPlaying || e.key !== " ") return;
      
      const isInSync = (breathPhase === "exhale");
      setInSync(isInSync);
    };
    
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPlaying, breathPhase]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-gosip-soft-blue mr-3">
                  <Wind className="h-5 w-5 text-gosip-purple-dark" />
                </div>
                <CardTitle>Breath Sync</CardTitle>
              </div>
              <Button variant="outline" onClick={() => navigate("/mindfulness")}>
                Back
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!isPlaying ? (
              <div className="text-center space-y-4">
                <h2 className="text-xl font-medium">Synchronize Your Breathing</h2>
                <p className="text-muted-foreground">
                  Follow the expanding and contracting circle. Hold spacebar when inhaling and release when exhaling.
                  Stay in sync with the rhythm to earn points.
                </p>
                {!user && (
                  <p className="text-sm text-amber-600">
                    Note: Sign in to save your scores and track progress over time.
                  </p>
                )}
                <div className="flex justify-center">
                  <Button 
                    className="bg-gosip-purple hover:bg-gosip-purple-dark"
                    onClick={startGame}
                  >
                    Start Exercise
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Score</p>
                      <p className="text-2xl font-bold">{score}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="text-2xl font-bold">{formatTime(timeElapsed)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phase</p>
                      <p className="text-2xl font-bold capitalize">{breathPhase}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-center items-center h-64">
                    <div 
                      ref={circleRef}
                      className={`w-32 h-32 rounded-full transition-transform ${
                        inSync 
                          ? "bg-gosip-soft-green border-4 border-green-500" 
                          : "bg-gosip-soft-blue"
                      }`}
                    />
                  </div>
                  
                  <p className="mt-8 text-lg">
                    {breathPhase === "inhale" 
                      ? "Hold spacebar while inhaling..." 
                      : "Release spacebar while exhaling..."}
                  </p>
                </div>
              </>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            {isPlaying && (
              <Button variant="destructive" onClick={endGame}>End Exercise</Button>
            )}
            {!isPlaying && !user && (
              <Button 
                variant="outline" 
                className="ml-auto"
                onClick={() => navigate("/register")}
              >
                Register to Save Scores
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
