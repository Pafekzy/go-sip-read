
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ResultsScreenProps {
  score: number;
  playAgain: () => void;
  hasUser: boolean;
}

export const ResultsScreen = ({ score, playAgain, hasUser }: ResultsScreenProps) => {
  const navigate = useNavigate();
  
  // Determine feedback based on score
  let feedback = "Nice effort!";
  if (score > 200) {
    feedback = "Amazing job! Your mind is razor-sharp!";
  } else if (score > 100) {
    feedback = "Great job! Your pattern recognition is excellent!";
  } else if (score > 50) {
    feedback = "Good job! You're getting better at spotting patterns!";
  }

  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold">Game Over!</h2>
      
      <div className="p-8 bg-gradient-to-br from-gosip-soft-purple to-gosip-soft-blue rounded-lg animate-scale-in">
        <p className="text-lg mb-2">Your score:</p>
        <p className="text-4xl font-bold mb-4">{score}</p>
        <p className="text-gosip-purple font-medium">{feedback}</p>
      </div>
      
      <div className="space-y-4">
        <Button 
          onClick={playAgain} 
          className="bg-gosip-purple hover:bg-gosip-purple-dark"
          size="lg"
        >
          Play Again
        </Button>
        
        {!hasUser && (
          <div className="pt-4">
            <p className="text-sm text-amber-600 mb-2">
              Sign up to save your scores and track your progress!
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate("/register")}
            >
              Create Account
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
