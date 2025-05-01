
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function useBreathSync() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [breathPhase, setBreathPhase] = useState("inhale");
  const [inSync, setInSync] = useState(false);
  
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
    setBreathPhase("inhale");
    setTimeout(() => {
      if (!isPlaying) return;
      setBreathPhase("exhale");
      setTimeout(() => {
        if (isPlaying) animateBreathing();
      }, 4000); // 4 seconds to exhale
    }, 4000); // 4 seconds to inhale
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

  return {
    user,
    loading,
    isPlaying,
    score,
    timeElapsed,
    breathPhase,
    inSync,
    startGame,
    endGame,
    formatTime
  };
}
