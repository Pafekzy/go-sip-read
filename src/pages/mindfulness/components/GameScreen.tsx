
import { BreathingCircle } from "./BreathingCircle";
import { GameStats } from "./GameStats";

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
      
      <p className="mt-8 text-lg">
        {breathPhase === "inhale" 
          ? "Hold spacebar while inhaling..." 
          : "Release spacebar while exhaling..."}
      </p>
    </div>
  );
};
