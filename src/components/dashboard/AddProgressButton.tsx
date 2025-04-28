
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AddProgressButtonProps {
  user: any;
  onProgressUpdate: (date: string, minutes: number) => void;
}

export function AddProgressButton({ user, onProgressUpdate }: AddProgressButtonProps) {
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
      
      const { data: existingData } = await supabase
        .from('learning_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();
      
      if (existingData) {
        const newMinutes = existingData.minutes_spent + 15;
        const { error: updateError } = await supabase
          .from('learning_progress')
          .update({ minutes_spent: newMinutes })
          .eq('id', existingData.id);
          
        if (updateError) throw updateError;
        onProgressUpdate(today, newMinutes);
      } else {
        const { error: insertError } = await supabase
          .from('learning_progress')
          .insert([
            { user_id: user.id, minutes_spent: 15, date: today }
          ]);
          
        if (insertError) throw insertError;
        onProgressUpdate(today, 15);
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
    <Button 
      variant="outline" 
      size="sm" 
      onClick={addSampleProgress}
      className="ml-auto"
    >
      <PlusCircle className="mr-1 h-4 w-4" />
      Add Progress
    </Button>
  );
}
