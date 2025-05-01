
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Wind } from "lucide-react";
import { useBreathSync } from "./hooks/useBreathSync";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { GameScreen } from "./components/GameScreen";

export default function BreathSync() {
  const navigate = useNavigate();
  const { 
    user, 
    loading, 
    isPlaying, 
    score, 
    timeElapsed, 
    breathPhase, 
    inSync, 
    startGame, 
    endGame, 
    formatTime 
  } = useBreathSync();

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
                <div className="p-2 rounded-full bg-gosip-soft-blue mr-3">
                  <Wind className="h-5 w-5 text-gosip-purple-dark" />
                </div>
                <CardTitle>Breath Sync</CardTitle>
              </div>
              <Button variant="outline" onClick={() => navigate("/mindfulness")}>
                Back
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!isPlaying ? (
              <WelcomeScreen startGame={startGame} hasUser={!!user} />
            ) : (
              <GameScreen 
                score={score}
                timeElapsed={timeElapsed}
                breathPhase={breathPhase}
                inSync={inSync}
                formatTime={formatTime}
              />
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            {isPlaying && (
              <Button variant="destructive" onClick={endGame}>End Exercise</Button>
            )}
            {!isPlaying && !user && (
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
