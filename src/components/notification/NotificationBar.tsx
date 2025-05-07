
import React, { useEffect, useState } from "react";
import { Award, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

// List of groups to display randomly
const GROUPS = [
  "Path Finders Group",
  "Tech Blazers",
  "Front Enders Group", 
  "AI Lovers Group",
  "Data Scientist Group",
  "Gen AI Group",
  "Sambiza Group",
  "Ethical Code Group",
  "Will Power Group"
];

export function NotificationBar() {
  const [currentGroup, setCurrentGroup] = useState(GROUPS[0]);
  
  // Rotate through groups every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * GROUPS.length);
      setCurrentGroup(GROUPS[randomIndex]);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-gosip-purple/10 to-gosip-purple-dark/10 border-b border-gosip-purple/20 py-2 px-4 text-center text-sm">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center text-gosip-purple-dark">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="font-semibold">Get ready to win ₦300,000 or MORE! Code War on January 27th</span>
        </div>
        
        <div className="flex items-center">
          <span className="mr-2">Featuring:</span>
          <span className="font-medium text-gosip-purple">{currentGroup}</span>
        </div>
        
        <div className="flex items-center text-gosip-purple-dark">
          <Award className="h-4 w-4 mr-1" />
          <span className="italic">
            Earn free certificates within the next 3 months from platforms like Alison, Coursera, Semicolon, and X
          </span>
        </div>
      </div>
    </div>
  );
}
