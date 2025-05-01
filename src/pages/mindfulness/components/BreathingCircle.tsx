
import { useRef, useEffect } from "react";

interface BreathingCircleProps {
  isPlaying: boolean;
  breathPhase: string;
  inSync: boolean;
}

export const BreathingCircle = ({ isPlaying, breathPhase, inSync }: BreathingCircleProps) => {
  const circleRef = useRef<HTMLDivElement>(null);

  // Simulate breathing animation
  useEffect(() => {
    if (!circleRef.current || !isPlaying) return;
    
    const breathCycle = 8000; // 8 seconds per full breath cycle
    const inhaleTime = 4000; // 4 seconds to inhale
    const exhaleTime = 4000; // 4 seconds to exhale
    
    const animate = () => {
      if (!isPlaying) return;
      
      // Inhale phase
      circleRef.current.style.transform = "scale(1.5)";
      circleRef.current.style.transition = `transform ${inhaleTime}ms ease-in`;
      
      setTimeout(() => {
        if (!isPlaying || !circleRef.current) return;
        
        // Exhale phase
        circleRef.current.style.transform = "scale(1)";
        circleRef.current.style.transition = `transform ${exhaleTime}ms ease-out`;
        
        setTimeout(() => {
          if (isPlaying && circleRef.current) animate();
        }, exhaleTime);
      }, inhaleTime);
    };
    
    animate();
  }, [isPlaying]);

  return (
    <div className="flex justify-center items-center h-64">
      <div 
        ref={circleRef}
        className={`w-32 h-32 rounded-full transition-transform ${
          inSync 
            ? "bg-gosip-soft-green border-4 border-green-500" 
            : "bg-gosip-soft-blue"
        }`}
      />
    </div>
  );
};
