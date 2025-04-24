import { createContext, useContext, useState, useEffect } from 'react';

export type GameType = 
  | 'upperLowerCase'
  | 'fruitsPattern'
  | 'alphabetGuess'
  | 'customGame';

interface Game {
  id: string;
  type: GameType;
  name: string;
  description: string;
  lastPlayed: Date | null;
  highScore: number;
}

interface GameSession {
  gameId: string;
  startTime: Date;
  score: number;
  completed: boolean;
}

interface GamesContextType {
  games: Game[];
  currentSession: GameSession | null;
  playedGames: Set<string>;
  startGame: (gameId: string) => void;
  endGame: (score: number) => void;
  canPlayGame: (gameId: string) => boolean;
  resetPlayedGames: () => void;
  getGameById: (gameId: string) => Game | undefined;
  updateHighScore: (gameId: string, score: number) => void;
}

const GamesContext = createContext<GamesContextType | undefined>(undefined);

// Initial games based on README requirements
const initialGames: Game[] = [
  {
    id: 'game1',
    type: 'upperLowerCase',
    name: 'Upper/Lower Case Pick',
    description: 'Quickly identify and select upper or lower case letters as they appear.',
    lastPlayed: null,
    highScore: 0
  },
  {
    id: 'game2',
    type: 'fruitsPattern',
    name: 'Fruits Pattern',
    description: 'Identify patterns in sequences of fruit images to improve pattern recognition.',
    lastPlayed: null,
    highScore: 0
  },
  {
    id: 'game3',
    type: 'alphabetGuess',
    name: 'Alphabet Guess',
    description: 'Quickly guess the next letter in alphabetical sequences.',
    lastPlayed: null,
    highScore: 0
  },
  {
    id: 'game4',
    type: 'customGame',
    name: 'Memory Match',
    description: 'Test your memory by matching pairs of hidden items.',
    lastPlayed: null,
    highScore: 0
  }
];

export function GamesProvider({ children }: { children: React.ReactNode }) {
  const [games, setGames] = useState<Game[]>(() => {
    const savedGames = localStorage.getItem('gosip-games');
    return savedGames ? JSON.parse(savedGames) : initialGames;
  });
  
  const [currentSession, setCurrentSession] = useState<GameSession | null>(null);
  const [playedGames, setPlayedGames] = useState<Set<string>>(new Set());

  // Save games state to localStorage
  useEffect(() => {
    localStorage.setItem('gosip-games', JSON.stringify(games));
  }, [games]);

  // Function to get a game by ID
  const getGameById = (gameId: string) => {
    return games.find(game => game.id === gameId);
  };

  // Function to check if a game can be played
  const canPlayGame = (gameId: string): boolean => {
    // If all games have been played except this one, allow it
    if (playedGames.size === games.length - 1 && !playedGames.has(gameId)) {
      return true;
    }

    // If this game hasn't been played yet, allow it
    if (!playedGames.has(gameId)) {
      return true;
    }

    // Otherwise, check if all other games have been played
    return playedGames.size >= games.length - 1;
  };

  // Start a new game session
  const startGame = (gameId: string) => {
    if (!canPlayGame(gameId)) {
      throw new Error('You must play other games first');
    }

    setCurrentSession({
      gameId,
      startTime: new Date(),
      score: 0,
      completed: false
    });

    // Update the game's last played time
    setGames(games.map(game => 
      game.id === gameId ? { ...game, lastPlayed: new Date() } : game
    ));

    // Add to played games
    setPlayedGames(prev => new Set([...prev, gameId]));
  };

  // End a game session
  const endGame = (score: number) => {
    if (currentSession) {
      setCurrentSession({
        ...currentSession,
        score,
        completed: true
      });

      // Update high score if needed
      updateHighScore(currentSession.gameId, score);
    }
  };

  // Update high score for a game
  const updateHighScore = (gameId: string, score: number) => {
    setGames(games.map(game => {
      if (game.id === gameId && score > game.highScore) {
        return { ...game, highScore: score };
      }
      return game;
    }));
  };

  // Reset played games when all have been played
  const resetPlayedGames = () => {
    setPlayedGames(new Set());
  };

  return (
    <GamesContext.Provider value={{
      games,
      currentSession,
      playedGames,
      startGame,
      endGame,
      canPlayGame,
      resetPlayedGames,
      getGameById,
      updateHighScore
    }}>
      {children}
    </GamesContext.Provider>
  );
}

export function useGames() {
  const context = useContext(GamesContext);
  if (context === undefined) {
    throw new Error('useGames must be used within a GamesProvider');
  }
  return context;
}
