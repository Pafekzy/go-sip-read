
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { useMindNumberGame } from "./hooks/useMindNumberGame";
import { WelcomeScreen } from "./components/mindnumber/WelcomeScreen";
import { GameScreen } from "./components/mindnumber/GameScreen";
import { ResultsScreen } from "./components/mindnumber/ResultsScreen";

export default function MindNumber() {
  const navigate = useNavigate();
  const { 
    user, 
    loading, 
    gameState, 
    score, 
    timeRemaining, 
    startGame, 
    endGame, 
    resetGame,
    formatTime
  } = useMindNumberGame();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gosip-purple"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-gosip-soft-purple mr-3">
                  <Brain className="h-5 w-5 text-gosip-purple-dark" />
                </div>
                <CardTitle>Mind Number</CardTitle>
              </div>
              <Button variant="outline" onClick={() => navigate("/mindfulness")}>
                Back
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {gameState === 'welcome' && (
              <WelcomeScreen 
                startGame={startGame} 
                hasUser={!!user} 
              />
            )}
            {gameState === 'playing' && (
              <GameScreen 
                score={score}
                timeRemaining={timeRemaining}
                formatTime={formatTime}
              />
            )}
            {gameState === 'results' && (
              <ResultsScreen 
                score={score} 
                playAgain={resetGame} 
                hasUser={!!user} 
              />
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            {gameState === 'playing' && (
              <Button variant="destructive" onClick={endGame}>End Game</Button>
            )}
            {gameState === 'welcome' && !user && (
              <Button 
                variant="outline" 
                className="ml-auto"
                onClick={() => navigate("/register")}
              >
                Register to Save Scores
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
