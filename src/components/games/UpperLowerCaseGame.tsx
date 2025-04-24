
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from '@/hooks/use-toast';
import { useGames } from '@/contexts/GamesContext';

export function UpperLowerCaseGame() {
  const [currentLetter, setCurrentLetter] = useState('');
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60); // 60 second game
  const [gameActive, setGameActive] = useState(false);
  const { endGame } = useGames();
  
  // Generate a random letter
  const generateLetter = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const makeUpperCase = Math.random() > 0.5;
    
    setCurrentLetter(makeUpperCase ? randomLetter.toUpperCase() : randomLetter);
    setIsUpperCase(makeUpperCase);
  };
  
  // Start the game
  const startGame = () => {
    setScore(0);
    setTimer(60);
    setGameActive(true);
    generateLetter();
  };
  
  // Handle user choice
  const handleChoice = (selectedIsUpper: boolean) => {
    if (selectedIsUpper === isUpperCase) {
      // Correct
      setScore(prev => prev + 10);
      toast({ title: "Correct!", variant: "default" });
    } else {
      // Incorrect
      setScore(prev => Math.max(0, prev - 5));
      toast({ title: "Wrong!", variant: "destructive" });
    }
    generateLetter();
  };
  
  // Timer effect
  useEffect(() => {
    let interval: number | undefined;
    
    if (gameActive && timer > 0) {
      interval = window.setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setGameActive(false);
      endGame(score);
      toast({ 
        title: "Game Over!", 
        description: `Your final score is ${score}`,
        variant: "default" 
      });
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameActive, timer, score, endGame]);
  
  // The game has a 2 minute continuous play limit
  useEffect(() => {
    const redirectTimeout = 120000; // 2 minutes in ms
    let timeout: number | undefined;
    
    if (gameActive) {
      timeout = window.setTimeout(() => {
        setGameActive(false);
        endGame(score);
        toast({ 
          title: "Time for a break!", 
          description: "You've been playing for 2 minutes. Time to study!",
          variant: "default" 
        });
        // Here you would redirect to study materials
      }, redirectTimeout);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [gameActive, score, endGame]);
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Upper/Lower Case Game</CardTitle>
        <CardDescription>
          Quickly identify if a letter is uppercase or lowercase.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!gameActive ? (
          <Button 
            onClick={startGame} 
            className="w-full bg-gosip-purple hover:bg-gosip-purple-dark"
          >
            Start Game
          </Button>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg">Score: {score}</div>
              <div className="text-lg">Time: {timer}s</div>
            </div>
            
            <div className="text-center py-10">
              <span className="text-7xl font-bold">{currentLetter}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={() => handleChoice(true)}
                className="bg-gosip-purple hover:bg-gosip-purple-dark"
              >
                UPPERCASE
              </Button>
              <Button 
                onClick={() => handleChoice(false)}
                variant="outline"
              >
                lowercase
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
