
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function ProgressStats() {
  const [progressData, setProgressData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Check for authenticated user
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fetch user progress data
  useEffect(() => {
    async function fetchProgressData() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Get last 7 days
        const today = new Date();
        const dates = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() - (6 - i)); // Starting 6 days ago
          return date;
        });

        const formattedDates = dates.map(date => ({
          fullDate: date,
          name: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
          formatted: date.toISOString().split('T')[0],
        }));

        // Get user progress from database
        const { data, error } = await supabase
          .from('learning_progress')
          .select('*')
          .eq('user_id', user.id)
          .gte('date', formattedDates[0].formatted)
          .lte('date', formattedDates[6].formatted);

        if (error) {
          console.error("Error fetching progress:", error);
          throw error;
        }

        // Map dates to progress data
        const progressByDate = formattedDates.map(dateObj => {
          const matchingProgress = data?.find(item => 
            new Date(item.date).toISOString().split('T')[0] === dateObj.formatted
          );
          
          return {
            name: dateObj.name,
            date: dateObj.formatted,
            minutes: matchingProgress ? matchingProgress.minutes_spent : 0
          };
        });

        setProgressData(progressByDate);
      } catch (error) {
        console.error("Error in fetching progress data:", error);
        toast({
          title: "Error",
          description: "Failed to load learning progress data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProgressData();
  }, [user]);

  // Add sample progress for demonstration purposes
  const addSampleProgress = async () => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please log in to track your progress",
        variant: "destructive",
      });
      return;
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Check if today's progress already exists
      const { data: existingData } = await supabase
        .from('learning_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();
      
      if (existingData) {
        // Update existing progress
        const newMinutes = existingData.minutes_spent + 15;
        const { error: updateError } = await supabase
          .from('learning_progress')
          .update({ minutes_spent: newMinutes })
          .eq('id', existingData.id);
          
        if (updateError) throw updateError;
        
        // Update local state
        setProgressData(prev => 
          prev.map(item => 
            item.date === today 
              ? { ...item, minutes: newMinutes } 
              : item
          )
        );
      } else {
        // Insert new progress
        const { error: insertError } = await supabase
          .from('learning_progress')
          .insert([
            { user_id: user.id, minutes_spent: 15, date: today }
          ]);
          
        if (insertError) throw insertError;
        
        // Update local state
        setProgressData(prev => 
          prev.map(item => 
            item.date === today 
              ? { ...item, minutes: 15 } 
              : item
          )
        );
      }

      toast({
        title: "Progress Updated",
        description: "Added 15 minutes to today's progress",
      });
    } catch (error) {
      console.error("Error adding progress:", error);
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Weekly Learning Progress</CardTitle>
          <CardDescription>Minutes spent learning per day</CardDescription>
        </div>
        {user && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={addSampleProgress}
            className="ml-auto"
          >
            <PlusCircle className="mr-1 h-4 w-4" />
            Add Progress
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {!user ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">Sign in to track your learning progress</p>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-[200px]">
            <p className="text-muted-foreground">Loading progress data...</p>
          </div>
        ) : (
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="minutes"
                  stroke="#9b87f5"
                  strokeWidth={2}
                  dot={{ fill: "#9b87f5" }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
