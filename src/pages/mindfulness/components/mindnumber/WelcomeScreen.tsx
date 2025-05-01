
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  startGame: () => void;
  hasUser: boolean;
}

export const WelcomeScreen = ({ startGame, hasUser }: WelcomeScreenProps) => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-medium">Challenge Your Mental Math</h2>
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Test your pattern recognition skills with Mind Number. You'll be shown a sequence of numbers and need to guess what comes next based on the pattern.
        </p>
        
        <div className="bg-gosip-soft-blue p-4 rounded-md">
          <h3 className="font-medium mb-2">How to Play:</h3>
          <ul className="text-sm text-left space-y-2">
            <li>• You have <strong>60 seconds</strong> to score as many points as possible</li>
            <li>• Identify the pattern in the sequence (addition, subtraction, etc)</li>
            <li>• Enter the next number in the sequence</li>
            <li>• Correct answers earn points, incorrect answers lose points</li>
            <li>• Difficulty increases every 15 seconds!</li>
          </ul>
        </div>
        
        {!hasUser && (
          <p className="text-sm text-amber-600">
            Note: Sign in to save your scores and track progress over time.
          </p>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <Button 
          className="bg-gosip-purple hover:bg-gosip-purple-dark animate-pulse"
          onClick={startGame}
          size="lg"
        >
          Start Game
        </Button>
      </div>
    </div>
  );
};
