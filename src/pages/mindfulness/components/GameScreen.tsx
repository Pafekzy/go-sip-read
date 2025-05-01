
import { BreathingCircle } from "./BreathingCircle";
import { GameStats } from "./GameStats";
import { useEffect, useState } from "react";

interface GameScreenProps {
  score: number;
  timeElapsed: number;
  breathPhase: string;
  inSync: boolean;
  formatTime: (seconds: number) => string;
}

export const GameScreen = ({ 
  score, 
  timeElapsed, 
  breathPhase, 
  inSync,
  formatTime 
}: GameScreenProps) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [instruction, setInstruction] = useState("");

  useEffect(() => {
    setFadeIn(false);
    
    // Add a slight delay to make the transition smoother
    const timer = setTimeout(() => {
      setFadeIn(true);
      setInstruction(breathPhase === "inhale" 
        ? "Hold spacebar while inhaling..." 
        : "Release spacebar while exhaling...");
    }, 100);
    
    return () => clearTimeout(timer);
  }, [breathPhase]);

  return (
    <div className="text-center">
      <GameStats 
        score={score} 
        timeElapsed={timeElapsed} 
        breathPhase={breathPhase} 
        formatTime={formatTime}
      />
      
      <BreathingCircle 
        isPlaying={true} 
        breathPhase={breathPhase} 
        inSync={inSync} 
      />
      
      <p className={`mt-8 text-lg transition-all duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        {instruction}
      </p>
    </div>
  );
};
