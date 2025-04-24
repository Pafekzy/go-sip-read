
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { BadgeDollarSign, BarChart, TrendingUp, AlertTriangle } from "lucide-react";

export default function Accountability() {
  const [stakingAmount, setStakingAmount] = useState(5000);
  const [goals, setGoals] = useState([
    { id: 1, text: "Read 20 pages daily", completed: false, progress: 25 },
    { id: 2, text: "Listen to 1 podcast per week", completed: false, progress: 80 },
    { id: 3, text: "Practice presentness game 15 minutes daily", completed: false, progress: 50 }
  ]);
  
  const totalProgress = goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length;
  
  const handleStaking = () => {
    toast({
      title: "Amount Staked",
      description: `₦${stakingAmount} has been staked for your accountability goals`,
    });
  };

  const markGoalCompleted = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: true, progress: 100 } : goal
    ));
    
    toast({
      title: "Goal Completed",
      description: "You've earned a bonus! Keep up the good work.",
      variant: "default"
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 gosip-gradient-text">Accountability Device</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BadgeDollarSign className="h-6 w-6 text-gosip-purple" />
              Stake Your Commitment
            </CardTitle>
            <CardDescription>
              Stack money as a commitment - meet your goals to earn bonuses, or face deductions for missed targets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Amount to Stake (₦)</label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider 
                    defaultValue={[5000]} 
                    max={20000} 
                    step={1000}
                    onValueChange={(value) => setStakingAmount(value[0])}
                    className="flex-1"
                  />
                  <div className="w-20">
                    <Input 
                      type="number" 
                      value={stakingAmount} 
                      onChange={(e) => setStakingAmount(Number(e.target.value))}
                      className="text-right"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gosip-soft-purple/20 p-4 rounded-md">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-gosip-purple" />
                  <div className="text-sm">
                    <p className="font-medium">How it works:</p>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      <li>Stake an amount to commit to your learning goals</li>
                      <li>Complete goals to earn back your stake plus bonuses</li>
                      <li>Miss your targets and lose a portion of your stake</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleStaking} 
              className="bg-gosip-purple hover:bg-gosip-purple-dark"
            >
              Stake ₦{stakingAmount}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-6 w-6 text-gosip-purple" />
              Your Progress
            </CardTitle>
            <CardDescription>
              Overall progress across all your goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-sm font-medium">{totalProgress}% Complete</div>
              <Progress value={totalProgress} className="h-2" />
            </div>
            
            <div className="mt-8 space-y-6">
              <h4 className="text-sm font-medium mb-2">Your Goals</h4>
              {goals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{goal.text}</span>
                    <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-1" />
                  <div className="flex justify-end mt-1">
                    {goal.completed ? (
                      <span className="text-xs text-green-500 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> Completed
                      </span>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs h-7" 
                        onClick={() => markGoalCompleted(goal.id)}
                      >
                        Mark as completed
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
