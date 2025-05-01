
import { Separator } from "@/components/ui/separator";

interface GameStatsProps {
  score: number;
  timeElapsed: number;
  breathPhase: string;
  formatTime: (seconds: number) => string;
}

export const GameStats = ({ score, timeElapsed, breathPhase, formatTime }: GameStatsProps) => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="transition-all duration-300 hover:scale-105">
          <p className="text-sm text-muted-foreground">Score</p>
          <p className="text-2xl font-bold">{score}</p>
        </div>
        <div className="transition-all duration-300 hover:scale-105">
          <p className="text-sm text-muted-foreground">Time</p>
          <p className="text-2xl font-bold">{formatTime(timeElapsed)}</p>
        </div>
        <div className={`transition-all duration-500 ${breathPhase === "inhale" ? "text-blue-600" : "text-green-600"}`}>
          <p className="text-sm text-muted-foreground">Phase</p>
          <p className="text-2xl font-bold capitalize">{breathPhase}</p>
        </div>
      </div>
      
      <Separator className="my-4" />
    </>
  );
};
