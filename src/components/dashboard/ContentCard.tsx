
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Headphones, Video } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContentCardProps {
  id: number;
  title: string;
  author: string;
  type: "book" | "podcast" | "video";
  progress: number;
  image: string;
}

export function ContentCard({ id, title, author, type, progress, image }: ContentCardProps) {
  const getIcon = () => {
    switch (type) {
      case "book":
        return <BookOpen className="h-4 w-4" />;
      case "podcast":
        return <Headphones className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
    }
  };

  const handleContinue = async () => {
    try {
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast({
          title: "Not logged in",
          description: "Please log in to track your progress",
          variant: "destructive",
        });
        return;
      }

      // Record progress
      const today = new Date().toISOString().split('T')[0];
      const { data: existingProgress } = await supabase
        .from('learning_progress')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('date', today)
        .single();

      if (existingProgress) {
        // Add some minutes to existing progress
        await supabase
          .from('learning_progress')
          .update({ minutes_spent: existingProgress.minutes_spent + 10 })
          .eq('id', existingProgress.id);
      } else {
        // Create new progress entry
        await supabase
          .from('learning_progress')
          .insert([
            { user_id: session.user.id, minutes_spent: 10, date: today }
          ]);
      }

      toast({
        title: "Progress tracked",
        description: "10 minutes added to your daily progress",
      });
    } catch (error) {
      console.error("Error tracking progress:", error);
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div
        className="h-36 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <CardContent className="p-4 flex-1">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-medium uppercase text-muted-foreground bg-secondary px-2 py-0.5 rounded flex items-center gap-1">
            {getIcon()}
            {type}
          </span>
        </div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{author}</p>
      </CardContent>
      <CardFooter className="block p-4 pt-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium">Progress</span>
          <span className="text-xs text-muted-foreground">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <button 
          className="w-full mt-4 text-center text-sm gosip-gradient-bg text-white rounded-md py-1.5 hover:opacity-90 transition-opacity"
          onClick={handleContinue}
        >
          Continue
        </button>
      </CardFooter>
    </Card>
  );
}
