
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";

interface AnalyticsPanelProps {
  adminType: string;
}

export function AnalyticsPanel({ adminType }: AnalyticsPanelProps) {
  // Only high-level admins have access to analytics
  const hasAnalyticsAccess = ["gosipstaff", "productivityguru"].includes(adminType);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-gosip-purple" />
          Analytics & Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasAnalyticsAccess ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Platform Overview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {["Active Users", "Total Groups", "Book Reads", "Premium Users"].map((metric) => (
                  <Card key={metric}>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">{metric}</p>
                      <p className="text-2xl font-bold">0</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">User Growth</h3>
              <div className="h-64 border rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-10 w-10 text-muted-foreground/50" />
                  <p className="mt-2 text-muted-foreground">No data available yet</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <BarChart3 className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">
              Analytics are only available to GoSipStaff and Productivity Guru admins.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
