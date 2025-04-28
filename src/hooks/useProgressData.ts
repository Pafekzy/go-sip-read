
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export function useProgressData() {
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
        const today = new Date();
        const dates = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() - (6 - i));
          return date;
        });

        const formattedDates = dates.map(date => ({
          fullDate: date,
          name: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
          formatted: date.toISOString().split('T')[0],
        }));

        const { data } = await supabase
          .from('learning_progress')
          .select('*')
          .eq('user_id', user.id)
          .gte('date', formattedDates[0].formatted)
          .lte('date', formattedDates[6].formatted);

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

  return { progressData, loading, user, setProgressData };
}
