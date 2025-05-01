
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { generateNumberSequence, checkAnswer } from "../../utils/numberPatterns";
import { GameStats } from "./GameStats";
import { NumberSequence } from "./NumberSequence";

interface GameScreenProps {
  score: number;
  timeRemaining: number;
  formatTime: (seconds: number) => string;
}

export const GameScreen = ({ score, timeRemaining, formatTime }: GameScreenProps) => {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [sequence, setSequence] = useState(generateNumberSequence(1));
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [streak, setStreak] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Calculate difficulty based on time remaining
  const difficulty = Math.min(4, Math.max(1, 4 - Math.floor(timeRemaining / 15)));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentAnswer.trim()) return;
    
    const userAnswer = parseInt(currentAnswer, 10);
    const isCorrect = checkAnswer(userAnswer, sequence.nextNumber);
    
    setResult(isCorrect ? "correct" : "incorrect");
    setTotalAnswered(prev => prev + 1);
    
    if (isCorrect) {
      // Award points based on streak and difficulty
      const points = Math.ceil(10 * difficulty * (1 + streak * 0.1));
      toast({
        title: `+${points} points!`,
        description: "Correct answer!",
      });
      setStreak(prev => prev + 1);
    } else {
      // Penalty for wrong answers
      const penalty = Math.ceil(5 * difficulty);
      toast({
        title: `-${penalty} points`,
        description: `The correct answer was ${sequence.nextNumber}`,
        variant: "destructive",
      });
      setStreak(0);
    }
    
    // Clear input and generate new sequence
    setCurrentAnswer("");
    setTimeout(() => {
      setSequence(generateNumberSequence(difficulty));
      setResult(null);
      if (inputRef.current) inputRef.current.focus();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <GameStats 
        score={score} 
        timeRemaining={timeRemaining}
        streak={streak}
        difficulty={difficulty}
        formatTime={formatTime} 
      />
      
      <Separator className="my-4" />
      
      <div className={`transition-all duration-300 ${result === "correct" ? "scale-105" : result === "incorrect" ? "scale-95" : ""}`}>
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground mb-2">What comes next in this sequence?</p>
          <NumberSequence 
            numbers={sequence.numbers} 
            type={sequence.type}
            result={result}
          />
          <p className="text-xs text-muted-foreground mt-4">
            Pattern: <span className="font-medium">{sequence.description}</span>
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex space-x-2 max-w-xs mx-auto">
          <Input
            ref={inputRef}
            type="number"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Enter your answer"
            className={`text-lg font-medium ${
              result === "correct" 
                ? "border-green-500 bg-green-50" 
                : result === "incorrect" 
                  ? "border-red-500 bg-red-50"
                  : ""
            }`}
            disabled={result !== null}
          />
          <Button 
            type="submit"
            disabled={!currentAnswer || result !== null}
          >
            Submit
          </Button>
        </form>
      </div>
      
      <div className="text-center text-sm text-muted-foreground mt-4">
        <p>Total attempted: {totalAnswered}</p>
        {streak > 2 && (
          <p className="text-gosip-purple font-medium animate-pulse">
            {streak} streak! Keep going!
          </p>
        )}
      </div>
    </div>
  );
};
