
import React, { useState, useEffect } from 'react';
import { CursorPointer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const PresentnessGame = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [targetNumber, setTargetNumber] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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
    } else {
      setScore(prev => Math.max(0, prev - 1));
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    generateNumbers();
  };

  return (
    <div className="p-6 rounded-xl bg-card">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Focus Training Game</h3>
        <p className="text-muted-foreground">Score: {score}</p>
      </div>
      
      {!isPlaying ? (
        <Button 
          onClick={startGame}
          className="w-full bg-gosip-purple hover:bg-gosip-purple-dark"
        >
          Start Game
        </Button>
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
