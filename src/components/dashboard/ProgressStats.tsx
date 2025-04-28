
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useProgressData } from "@/hooks/useProgressData";
import { ProgressChart } from "./ProgressChart";
import { AddProgressButton } from "./AddProgressButton";
import { ProgressUpdateFunction } from "@/types/progress";

export function ProgressStats() {
  const { progressData, loading, user, setProgressData } = useProgressData();

  const handleProgressUpdate: ProgressUpdateFunction = (date, minutes) => {
    setProgressData(prev => 
      prev.map(item => 
        item.date === date 
          ? { ...item, minutes } 
          : item
      )
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Weekly Learning Progress</CardTitle>
          <CardDescription>Minutes spent learning per day</CardDescription>
        </div>
        {user && (
          <AddProgressButton 
            user={user} 
            onProgressUpdate={handleProgressUpdate}
          />
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
          <ProgressChart data={progressData} />
        )}
      </CardContent>
    </Card>
  );
}
