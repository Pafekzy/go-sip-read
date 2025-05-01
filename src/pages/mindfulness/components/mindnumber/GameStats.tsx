
import { Separator } from "@/components/ui/separator";

interface GameStatsProps {
  score: number;
  timeRemaining: number;
  streak: number;
  difficulty: number;
  formatTime: (seconds: number) => string;
}

export const GameStats = ({ score, timeRemaining, streak, difficulty, formatTime }: GameStatsProps) => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="transition-all duration-300 hover:scale-105">
          <p className="text-sm text-muted-foreground">Score</p>
          <p className="text-2xl font-bold">{score}</p>
        </div>
        <div className="transition-all duration-300 hover:scale-105">
          <p className="text-sm text-muted-foreground">Time</p>
          <p className={`text-2xl font-bold ${timeRemaining <= 10 ? 'text-red-500 animate-pulse' : ''}`}>
            {formatTime(timeRemaining)}
          </p>
        </div>
        <div className="transition-all duration-300 hover:scale-105">
          <p className="text-sm text-muted-foreground">Level</p>
          <p className="text-2xl font-bold">{difficulty}</p>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-gosip-purple h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${(timeRemaining/60) * 100}%` }}
        ></div>
      </div>
    </>
  );
};
