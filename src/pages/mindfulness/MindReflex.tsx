
import { useState, useEffect, useReducer, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Award, Brain, ArrowLeft, RotateCcw, Home } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

type GameState = {
  status: "welcome" | "playing" | "levelup" | "gameover" | "win";
  targetChar: string;
  gridChars: string[];
  score: number;
  level: number;
  timeRemaining: number;
  reshuffleInterval: number;
  reshuffleCountdown: number;
  gameStartTime: number | null;
};

type GameAction =
  | { type: "START_GAME" }
  | { type: "CORRECT_GUESS" }
  | { type: "WRONG_GUESS" }
  | { type: "RESHUFFLE_GRID" }
  | { type: "TICK" }
  | { type: "LEVEL_UP" }
  | { type: "GAME_OVER" }
  | { type: "RESTART" }
  | { type: "WIN" };

const LEVELS = {
  1: { reshuffleInterval: 5000, gridSize: 9, pointsPerCorrect: 10, pointsPerWrong: -5, pointsPerShuffle: -2 },
  2: { reshuffleInterval: 4000, gridSize: 16, pointsPerCorrect: 15, pointsPerWrong: -8, pointsPerShuffle: -3 },
  3: { reshuffleInterval: 3000, gridSize: 16, pointsPerCorrect: 20, pointsPerWrong: -10, pointsPerShuffle: -5 },
  4: { reshuffleInterval: 2000, gridSize: 25, pointsPerCorrect: 25, pointsPerWrong: -15, pointsPerShuffle: -8 },
};

const GAME_DURATION = 120; // 2 minutes in seconds
const MAX_LEVEL = 4;
const INITIAL_SCORE = 50;

const generateRandomChar = () => {
  const charTypes = [
    // Letters
    () => String.fromCharCode(65 + Math.floor(Math.random() * 26)),
    // Numbers
    () => String(Math.floor(Math.random() * 10)),
    // Symbols
    () => "!@#$%^&*+-=?".charAt(Math.floor(Math.random() * 13)),
  ];
  
  // For harder levels, include more symbols
  const randomType = Math.floor(Math.random() * charTypes.length);
  return charTypes[randomType]();
};

const generateGrid = (size: number, targetChar: string) => {
  const grid = Array(size - 1).fill(null).map(() => generateRandomChar());
  
  // Add the target character at a random position
  const insertPosition = Math.floor(Math.random() * grid.length);
  grid.splice(insertPosition, 0, targetChar);
  
  return grid;
};

const initialState: GameState = {
  status: "welcome",
  targetChar: "",
  gridChars: [],
  score: INITIAL_SCORE,
  level: 1,
  timeRemaining: GAME_DURATION,
  reshuffleInterval: LEVELS[1].reshuffleInterval,
  reshuffleCountdown: LEVELS[1].reshuffleInterval / 1000,
  gameStartTime: null,
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  const currentLevelSettings = LEVELS[state.level as keyof typeof LEVELS];
  
  switch (action.type) {
    case "START_GAME":
      const targetChar = generateRandomChar();
      return {
        ...state,
        status: "playing",
        targetChar,
        gridChars: generateGrid(currentLevelSettings.gridSize, targetChar),
        score: INITIAL_SCORE,
        timeRemaining: GAME_DURATION,
        reshuffleCountdown: currentLevelSettings.reshuffleInterval / 1000,
        gameStartTime: Date.now(),
      };
      
    case "CORRECT_GUESS":
      const newScore = state.score + currentLevelSettings.pointsPerCorrect;
      const newTargetChar = generateRandomChar();
      
      // Level up if score threshold is reached
      if (state.level < MAX_LEVEL && newScore >= (state.level * 100)) {
        return {
          ...state,
          status: "levelup",
          score: newScore,
        };
      }
      
      // Win if at max level and reached win score
      if (state.level === MAX_LEVEL && newScore >= 400) {
        return {
          ...state,
          status: "win",
          score: newScore,
        };
      }
      
      return {
        ...state,
        targetChar: newTargetChar,
        gridChars: generateGrid(currentLevelSettings.gridSize, newTargetChar),
        score: newScore,
        reshuffleCountdown: currentLevelSettings.reshuffleInterval / 1000,
      };
      
    case "WRONG_GUESS":
      const scoreAfterWrong = state.score + currentLevelSettings.pointsPerWrong;
      if (scoreAfterWrong <= 0) {
        return {
          ...state,
          score: 0,
          status: "gameover",
        };
      }
      return {
        ...state,
        score: scoreAfterWrong,
      };
      
    case "RESHUFFLE_GRID":
      const scoreAfterShuffle = state.score + currentLevelSettings.pointsPerShuffle;
      if (scoreAfterShuffle <= 0) {
        return {
          ...state,
          score: 0,
          status: "gameover",
        };
      }
      return {
        ...state,
        gridChars: generateGrid(currentLevelSettings.gridSize, state.targetChar),
        score: scoreAfterShuffle,
        reshuffleCountdown: currentLevelSettings.reshuffleInterval / 1000,
      };
      
    case "TICK":
      // Handle timer countdown
      if (state.status !== "playing") return state;
      
      const newTimeRemaining = state.timeRemaining - 1;
      const newReshuffleCountdown = state.reshuffleCountdown - 1;
      
      // Game over if time runs out
      if (newTimeRemaining <= 0) {
        return {
          ...state,
          timeRemaining: 0,
          status: "win", // If time runs out and you still have points, you survive (win)
        };
      }
      
      // Reshuffle grid if countdown reaches zero
      if (newReshuffleCountdown <= 0) {
        return gameReducer({
          ...state,
          timeRemaining: newTimeRemaining,
        }, { type: "RESHUFFLE_GRID" });
      }
      
      return {
        ...state,
        timeRemaining: newTimeRemaining,
        reshuffleCountdown: newReshuffleCountdown,
      };
      
    case "LEVEL_UP":
      const nextLevel = state.level + 1;
      const nextLevelSettings = LEVELS[nextLevel as keyof typeof LEVELS];
      const newTargetAfterLevel = generateRandomChar();
      
      return {
        ...state,
        status: "playing",
        level: nextLevel,
        targetChar: newTargetAfterLevel,
        gridChars: generateGrid(nextLevelSettings.gridSize, newTargetAfterLevel),
        reshuffleInterval: nextLevelSettings.reshuffleInterval,
        reshuffleCountdown: nextLevelSettings.reshuffleInterval / 1000,
      };
      
    case "GAME_OVER":
      return {
        ...state,
        status: "gameover",
      };
      
    case "RESTART":
      return initialState;
      
    case "WIN":
      return {
        ...state,
        status: "win",
      };
      
    default:
      return state;
  }
};

export default function MindReflex() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [showResults, setShowResults] = useState(false);
  const [saveScore, setSaveScore] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    
    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  // Game timer
  useEffect(() => {
    if (state.status !== "playing") return;
    
    const timer = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [state.status]);
  
  // Handle game end conditions
  useEffect(() => {
    if (state.status === "gameover" || state.status === "win") {
      setShowResults(true);
      
      // Save score if user is logged in
      if (user && state.gameStartTime) {
        setSaveScore(true);
        
        // Calculate statistics
        const gameTime = Math.min(GAME_DURATION, Math.round((Date.now() - state.gameStartTime) / 1000));
        
        // This would be where we save to Supabase if needed
        console.log("Game results:", {
          score: state.score,
          level: state.level,
          gameTime,
          result: state.status,
        });
      }
    }
  }, [state.status, user, state.gameStartTime, state.score, state.level]);
  
  const handleCharacterClick = useCallback((char: string) => {
    if (state.status !== "playing") return;
    
    if (char === state.targetChar) {
      dispatch({ type: "CORRECT_GUESS" });
      // Play success sound here if added
      toast({
        title: "Correct!",
        description: `+${LEVELS[state.level as keyof typeof LEVELS].pointsPerCorrect} points`,
      });
    } else {
      dispatch({ type: "WRONG_GUESS" });
      // Play error sound here if added
      toast({
        title: "Wrong!",
        description: `${LEVELS[state.level as keyof typeof LEVELS].pointsPerWrong} points`,
        variant: "destructive",
      });
    }
  }, [state.status, state.targetChar, state.level]);
  
  const handleStartGame = () => {
    dispatch({ type: "START_GAME" });
  };
  
  const handleRestartGame = () => {
    setShowResults(false);
    setSaveScore(false);
    dispatch({ type: "RESTART" });
  };
  
  const handleContinueAfterLevelUp = () => {
    dispatch({ type: "LEVEL_UP" });
  };
  
  const handleNavigateHome = () => {
    navigate("/");
  };
  
  const handleNavigateBack = () => {
    navigate("/mindfulness");
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Render different game screens based on status
  const renderGameContent = () => {
    switch (state.status) {
      case "welcome":
        return (
          <div className="flex flex-col items-center justify-center text-center p-6 max-w-xl mx-auto">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-6">Mind Reflex: Decode & Survive</h1>
              
              <div className="mb-8 bg-gosip-soft-blue/30 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">How to Play:</h2>
                <ul className="text-left space-y-2">
                  <li>• Find the target character in the grid before time runs out</li>
                  <li>• Correct clicks add points, wrong clicks lose points</li>
                  <li>• The grid reshuffles every few seconds (losing you points)</li>
                  <li>• Survive 2 minutes or reach level 4 to win!</li>
                </ul>
              </div>
              
              <Button 
                onClick={handleStartGame} 
                className="w-full bg-gosip-purple hover:bg-gosip-purple-dark mb-4"
              >
                Start Game
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleNavigateBack} 
                className="w-full"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Mindfulness
              </Button>
            </motion.div>
          </div>
        );
        
      case "playing":
        return (
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleNavigateBack} 
                  className="mr-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleNavigateHome}
                >
                  <Home className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">Time: {formatTime(state.timeRemaining)}</p>
                <p className="text-sm text-muted-foreground">Shuffle in: {state.reshuffleCountdown}s</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium">Score: {state.score}</p>
                <p className="text-sm text-muted-foreground">Level: {state.level}</p>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h2 className="text-xl mb-2">Find this character:</h2>
              <div className="inline-block p-6 bg-gosip-purple/20 rounded-lg">
                <span className="text-4xl font-bold">{state.targetChar}</span>
              </div>
            </div>
            
            <div className={`grid grid-cols-${Math.sqrt(state.gridChars.length)} gap-2 mb-8`}>
              {state.gridChars.map((char, index) => (
                <motion.button
                  key={`${char}-${index}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gosip-soft-blue p-4 rounded-lg text-2xl font-semibold hover:bg-gosip-soft-purple transition-colors"
                  onClick={() => handleCharacterClick(char)}
                >
                  {char}
                </motion.button>
              ))}
            </div>
          </div>
        );
        
      case "levelup":
        return (
          <motion.div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="bg-card p-8 rounded-lg max-w-md mx-auto text-center"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 12 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mx-auto mb-6 p-4 rounded-full bg-gosip-soft-yellow inline-block"
              >
                <Award className="h-12 w-12 text-gosip-purple" />
              </motion.div>
              
              <h2 className="text-3xl font-bold mb-4">Level Up!</h2>
              <p className="text-xl mb-6">You've reached Level {state.level + 1}!</p>
              <p className="mb-6">Things will get tougher now:</p>
              <ul className="mb-8 text-left">
                <li>• Grid reshuffles faster</li>
                <li>• More characters to choose from</li>
                <li>• Higher stakes for right and wrong answers</li>
              </ul>
              
              <Button onClick={handleContinueAfterLevelUp} className="w-full bg-gosip-purple hover:bg-gosip-purple-dark">
                Continue to Level {state.level + 1}
              </Button>
            </motion.div>
          </motion.div>
        );
        
      case "gameover":
      case "win":
        return null; // Handled by the results dialog
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      {renderGameContent()}
      
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              {state.status === "win" ? "Victory!" : "Game Over"}
            </DialogTitle>
            <DialogDescription className="text-center">
              {state.status === "win" 
                ? "You survived the time challenge!"
                : "Your score dropped to zero. Better luck next time!"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            <div className="grid grid-cols-2 gap-4 text-center mb-6">
              <div className="p-4 bg-gosip-soft-blue/30 rounded-lg">
                <p className="text-muted-foreground text-sm">Final Score</p>
                <p className="text-2xl font-bold">{state.score}</p>
              </div>
              <div className="p-4 bg-gosip-soft-green/30 rounded-lg">
                <p className="text-muted-foreground text-sm">Level Reached</p>
                <p className="text-2xl font-bold">{state.level}</p>
              </div>
            </div>
            
            {saveScore && (
              <p className="text-center text-sm text-muted-foreground mb-4">
                Your score has been saved!
              </p>
            )}
          </div>
          
          <DialogFooter className="flex flex-col gap-2 sm:flex-row">
            <Button 
              variant="outline" 
              onClick={handleNavigateBack}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Mindfulness
            </Button>
            
            <Button 
              onClick={handleRestartGame}
              className="w-full sm:w-auto bg-gosip-purple hover:bg-gosip-purple-dark"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Play Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
