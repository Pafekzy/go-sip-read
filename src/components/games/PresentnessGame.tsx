import React, { useState, useEffect } from 'react';
import { MousePointer, Timer, Star, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';

const PresentnessGame = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [targetNumber, setTargetNumber] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [lastActionTime, setLastActionTime] = useState(Date.now());
  const [gameHistory, setGameHistory] = useState<{ date: string; score: number }[]>([]);

  const generateNumbers = () => {
    const newNumbers = Array.from({ length: 9 }, () => Math.floor(Math.random() * 100));
    const target = newNumbers[Math.floor(Math.random() * newNumbers.length)];
    setNumbers(newNumbers);
    setTargetNumber(target);
  };

  const handleNumberClick = (num: number) => {
    if (num === targetNumber) {
      setScore(prev => prev + 1);
      generateNumbers();
      setLastActionTime(Date.now());
      toast.success("Correct!", {
        duration: 1000,
      });
    } else {
      setScore(prev => Math.max(0, prev - 1));
      setLastActionTime(Date.now());
      toast.error("Try again!", {
        duration: 1000,
      });
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(120);
    setLastActionTime(Date.now());
    generateNumbers();
  };

  const endGame = () => {
    setIsPlaying(false);
    const newHistory = [...gameHistory, { date: new Date().toLocaleDateString(), score }];
    setGameHistory(newHistory);
    
    if (score < 50) {
      toast.error(
        <div className="flex flex-col items-center gap-2">
          <AlertTriangle className="h-8 w-8 text-red-400" />
          <span className="text-lg font-bold">Room for Improvement!</span>
          <span>Try to focus more next time. Your score: {score}</span>
        </div>,
        {
          duration: 5000,
        }
      );
    } else {
      toast.success(
        <div className="flex flex-col items-center gap-2">
          <Star className="h-8 w-8 text-yellow-400 animate-bounce" />
          <span className="text-lg font-bold">Game Over!</span>
          <span>Great job! Final Score: {score}</span>
        </div>,
        {
          duration: 5000,
          className: "bg-gosip-soft-purple",
        }
      );
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let inactivityTimer: NodeJS.Timeout;

    if (isPlaying && timeLeft > 0) {
      // Game timer
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            endGame();
          }
          return prev - 1;
        });
      }, 1000);

      // Inactivity check
      inactivityTimer = setInterval(() => {
        const timeSinceLastAction = Date.now() - lastActionTime;
        if (timeSinceLastAction >= 5000) {
          toast(
            <div className="flex items-center gap-2 animate-bounce">
              <Timer className="h-5 w-5 text-yellow-400" />
              <span>Hurry up! Time is ticking!</span>
            </div>,
            {
              duration: 2000,
            }
          );
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
      clearInterval(inactivityTimer);
    };
  }, [isPlaying, timeLeft, lastActionTime]);

  return (
    <div className="p-6 rounded-xl bg-card">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Focus Training Game</h3>
        <div className="flex justify-center items-center gap-4 mb-4">
          <p className="text-muted-foreground">Score: {score}</p>
          {isPlaying && (
            <p className="flex items-center gap-1 text-muted-foreground">
              <Timer className="h-4 w-4" />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </p>
          )}
        </div>
      </div>
      
      {!isPlaying ? (
        <div className="space-y-4">
          <Button 
            onClick={startGame}
            className="w-full bg-gosip-purple hover:bg-gosip-purple-dark"
          >
            Start Game
          </Button>
          {gameHistory.length > 0 && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">History</h4>
              <div className="space-y-2">
                {gameHistory.map((game, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gosip-soft-purple rounded">
                    <span>{game.date}</span>
                    <span className="font-medium">Score: {game.score}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <p className="text-center mb-4">Find the number: {targetNumber}</p>
          <div className="grid grid-cols-3 gap-3">
            {numbers.map((num, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-16 text-lg hover:bg-gosip-soft-purple transition-colors"
                onClick={() => handleNumberClick(num)}
              >
                {num}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PresentnessGame;
