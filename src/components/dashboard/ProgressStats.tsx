
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", minutes: 45 },
  { name: "Tue", minutes: 60 },
  { name: "Wed", minutes: 30 },
  { name: "Thu", minutes: 90 },
  { name: "Fri", minutes: 55 },
  { name: "Sat", minutes: 75 },
  { name: "Sun", minutes: 40 },
];

export function ProgressStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Learning Progress</CardTitle>
        <CardDescription>Minutes spent learning per day</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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
      </CardContent>
    </Card>
  );
}
