
import React, { useEffect, useState } from "react";
import { Award, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  // Rotate through groups every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * GROUPS.length);
      setCurrentGroup(GROUPS[randomIndex]);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-gosip-purple/10 to-gosip-purple-dark/10 border-b border-gosip-purple/20 py-2 px-4">
      {isMobile ? (
        // Mobile layout - vertical stack
        <div className="container mx-auto flex flex-col space-y-2">
          <div className="flex justify-center items-center text-gosip-purple-dark text-center">
            <Calendar className="h-5 w-5 mr-2 flex-shrink-0 font-bold" strokeWidth={2.5} />
            <span className="font-semibold text-sm">Get ready to win ₦300,000 or MORE!</span>
          </div>
          
          <div className="flex justify-center items-center text-center">
            <span className="text-sm">Featuring: </span>
            <span className="font-medium text-gosip-purple text-sm ml-1">{currentGroup}</span>
          </div>
          
          <div className="flex justify-center items-center text-gosip-purple-dark text-center">
            <Award className="h-5 w-5 mr-2 flex-shrink-0 font-bold" strokeWidth={2.5} />
            <span className="italic text-xs">
              Earn free certificates from Alison, Coursera, Semicolon
            </span>
          </div>
        </div>
      ) : (
        // Desktop layout - horizontal with improved responsiveness
        <div className="container mx-auto flex flex-wrap lg:flex-nowrap justify-between items-center gap-4">
          <div className="flex items-center text-gosip-purple-dark whitespace-nowrap">
            <Calendar className="h-6 w-6 mr-2 flex-shrink-0" strokeWidth={2.5} />
            <span className="font-semibold">Get ready to win ₦300,000 or MORE!</span>
          </div>
          
          <div className="flex items-center whitespace-nowrap mx-4">
            <span className="mr-2">Featuring:</span>
            <span className="font-medium text-gosip-purple">{currentGroup}</span>
          </div>
          
          <div className="flex items-center text-gosip-purple-dark whitespace-nowrap">
            <Award className="h-6 w-6 mr-2 flex-shrink-0" strokeWidth={2.5} />
            <span className="italic">
              Earn free certificates from Alison, Coursera, Semicolon
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
