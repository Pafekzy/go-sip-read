
import React, { useRef, useState, useEffect } from "react";

interface Circle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
}

const FloatingCircles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const colors = ["#9b87f5", "#D6BCFA", "#F2FCE2", "#FEF7CD", "#FEC6A1", "#E5DEFF", "#FFDEE2", "#D3E4FD"];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Create initial circles
    const initialCircles: Circle[] = Array.from({ length: 20 }, () => ({
      x: Math.random() * container.offsetWidth,
      y: Math.random() * container.offsetHeight,
      size: Math.random() * 40 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5
    }));
    
    setCircles(initialCircles);
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      setCircles(prevCircles => prevCircles.map(circle => {
        // Basic movement
        let newX = circle.x + circle.speedX;
        let newY = circle.y + circle.speedY;
        
        // Bounce off walls
        if (newX < 0 || newX > container.offsetWidth) {
          circle.speedX *= -1;
          newX = circle.x + circle.speedX;
        }
        
        if (newY < 0 || newY > container.offsetHeight) {
          circle.speedY *= -1;
          newY = circle.y + circle.speedY;
        }
        
        // Respond to cursor with subtle attraction/repulsion
        const dx = mousePosition.x - newX;
        const dy = mousePosition.y - newY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          // Create repulsion effect
          const angle = Math.atan2(dy, dx);
          const repulsionForce = 0.05;
          newX -= Math.cos(angle) * repulsionForce * (150 - distance) / 150;
          newY -= Math.sin(angle) * repulsionForce * (150 - distance) / 150;
        }
        
        return {
          ...circle,
          x: newX,
          y: newY
        };
      }));
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animationFrameId.current = requestAnimationFrame(animate);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      {circles.map((circle, index) => (
        <div
          key={index}
          className="absolute rounded-full opacity-20 transition-transform"
          style={{
            left: `${circle.x}px`,
            top: `${circle.y}px`,
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            backgroundColor: circle.color,
            transform: `scale(${mousePosition.x ? 1 + (1 / (Math.hypot(mousePosition.x - circle.x, mousePosition.y - circle.y) + 1)) * 0.3 : 1})`
          }}
        />
      ))}
    </div>
  );
};

export default FloatingCircles;
