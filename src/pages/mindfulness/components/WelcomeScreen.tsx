
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  startGame: () => void;
  hasUser: boolean;
}

export const WelcomeScreen = ({ startGame, hasUser }: WelcomeScreenProps) => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-medium">Synchronize Your Breathing</h2>
      <p className="text-muted-foreground">
        Follow the expanding and contracting circle. Hold spacebar when inhaling and release when exhaling.
        Stay in sync with the rhythm to earn points.
      </p>
      {!hasUser && (
        <p className="text-sm text-amber-600">
          Note: Sign in to save your scores and track progress over time.
        </p>
      )}
      <div className="flex justify-center">
        <Button 
          className="bg-gosip-purple hover:bg-gosip-purple-dark"
          onClick={startGame}
        >
          Start Exercise
        </Button>
      </div>
    </div>
  );
};
