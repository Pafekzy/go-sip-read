
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { generateNumberSequence, checkAnswer, SequenceType } from "../utils/numberPatterns";

export type GameState = 'welcome' | 'playing' | 'results';

export function useMindNumberGame() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds game
  const [difficulty, setDifficulty] = useState(1);
  
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
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, [navigate]);

  // Start game
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeRemaining(60);
    setDifficulty(1);
    
    // Start game timer
    gameTimerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        // End game after time is up
        if (newTime <= 0) {
          endGame();
          return 0;
        }
        
        // Increase difficulty every 15 seconds
        if (newTime % 15 === 0 && newTime > 0) {
          setDifficulty(d => Math.min(d + 1, 4));
          toast({
            title: "Difficulty increased!",
            description: "The patterns will get more complex now.",
          });
        }
        
        return newTime;
      });
    }, 1000);
  };

  // End game
  const endGame = async () => {
    setGameState('results');
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);

    // Save score to database only if user is logged in
    if (user) {
      try {
        const { error } = await supabase
          .from('mindnumber_scores')
          .insert({
            user_id: user.id,
            score: score,
            max_difficulty: difficulty
          });

        if (error) throw error;
        
        toast({
          title: "Score saved!",
          description: `You scored ${score} points. Well done!`,
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

  // Reset game
  const resetGame = () => {
    setGameState('welcome');
    setScore(0);
    setTimeRemaining(60);
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    user,
    loading,
    gameState,
    score,
    timeRemaining,
    difficulty,
    startGame,
    endGame,
    resetGame,
    formatTime
  };
}
