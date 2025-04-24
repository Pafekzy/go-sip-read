
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpperLowerCaseGame } from "@/components/games/UpperLowerCaseGame";
import { useGames } from "@/contexts/GamesContext";

export default function PresentnessGame() {
  const [activeTab, setActiveTab] = useState('game1');
  const { games, canPlayGame } = useGames();
  
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-8 gosip-gradient-text">Focus Training Games</h1>
      
      <div className="max-w-4xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            {games.map((game) => (
              <TabsTrigger 
                key={game.id} 
                value={game.id}
                disabled={!canPlayGame(game.id)}
                className={!canPlayGame(game.id) ? 'opacity-50' : ''}
              >
                {game.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <Card>
            <CardHeader>
              <CardTitle>{games.find(g => g.id === activeTab)?.name || 'Game'}</CardTitle>
              <CardDescription>
                {games.find(g => g.id === activeTab)?.description || 'Train your focus with this game.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TabsContent value="game1">
                <UpperLowerCaseGame />
              </TabsContent>
              <TabsContent value="game2">
                <Card>
                  <CardHeader>
                    <CardTitle>Fruits Pattern Game</CardTitle>
                    <CardDescription>
                      Identify patterns in fruit sequences to improve pattern recognition.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8">Game under development</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="game3">
                <Card>
                  <CardHeader>
                    <CardTitle>Alphabet Guess Game</CardTitle>
                    <CardDescription>
                      Guess the next letter in alphabetical sequences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8">Game under development</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="game4">
                <Card>
                  <CardHeader>
                    <CardTitle>Memory Match Game</CardTitle>
                    <CardDescription>
                      Match pairs of hidden items to test your memory.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8">Game under development</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <h3 className="font-semibold mb-2">HELP</h3>
                <div className="bg-muted/50 p-4 rounded-md text-sm">
                  <h4 className="font-medium mb-1">What is this game?</h4>
                  <p className="mb-2">This focus training game helps improve your attention and cognitive processing speed.</p>
                  
                  <h4 className="font-medium mb-1">Why it's important</h4>
                  <p className="mb-2">Regular focus training enhances your ability to concentrate during learning sessions.</p>
                  
                  <h4 className="font-medium mb-1">How to play best</h4>
                  <p className="mb-2">Play in a quiet environment, maintain good posture, and take regular breaks.</p>
                  
                  <h4 className="font-medium mb-1">Tips</h4>
                  <p>Pay attention to patterns and try to beat your previous score each time.</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Tabs>
      </div>
    </div>
  );
}
