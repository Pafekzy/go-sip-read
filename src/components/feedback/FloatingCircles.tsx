
import React, { useRef, useState, useEffect } from "react";
import { Gift } from "lucide-react";

interface GiftBox {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

const FloatingGiftBoxes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [giftBoxes, setGiftBoxes] = useState<GiftBox[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const purpleShades = ["#9b87f5", "#7E69AB", "#6E59A5", "#E5DEFF", "#D6BCFA"];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Create initial gift boxes
    const initialGiftBoxes: GiftBox[] = Array.from({ length: 12 }, () => ({
      x: Math.random() * container.offsetWidth,
      y: Math.random() * container.offsetHeight,
      size: Math.random() * 30 + 20,
      color: purpleShades[Math.floor(Math.random() * purpleShades.length)],
      speedX: (Math.random() * 0.3) + 0.1, // Always move right, with varying speeds
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5,
      opacity: (Math.random() * 0.3) + 0.1 // Low opacity between 0.1 and 0.4
    }));
    
    setGiftBoxes(initialGiftBoxes);
    
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
      setGiftBoxes(prevGiftBoxes => prevGiftBoxes.map(giftBox => {
        // Basic movement (left to right)
        let newX = giftBox.x + giftBox.speedX;
        let newY = giftBox.y;
        let newRotation = giftBox.rotation + giftBox.rotationSpeed;
        
        // Loop back when reaching the right edge
        if (newX > container.offsetWidth + 50) {
          newX = -50; // Start from left side again
          newY = Math.random() * container.offsetHeight; // Random height
        }
        
        // Magnetic effect - subtle follow when cursor is nearby
        const dx = mousePosition.x - newX;
        const dy = mousePosition.y - newY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          // Create slight attraction effect
          const attraction = 0.03;
          newX += dx * attraction * (1 / (distance + 1)) * 5;
          newY += dy * attraction * (1 / (distance + 1)) * 5;
        }
        
        return {
          ...giftBox,
          x: newX,
          y: newY,
          rotation: newRotation
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
      {giftBoxes.map((giftBox, index) => (
        <div
          key={index}
          className="absolute transition-transform duration-300"
          style={{
            left: `${giftBox.x}px`,
            top: `${giftBox.y}px`,
            transform: `rotate(${giftBox.rotation}deg) scale(${mousePosition.x ? 1 + (1 / (Math.hypot(mousePosition.x - giftBox.x, mousePosition.y - giftBox.y) + 1)) * 0.2 : 1})`,
            opacity: giftBox.opacity
          }}
        >
          <Gift 
            size={giftBox.size} 
            color={giftBox.color} 
            strokeWidth={1.5}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingGiftBoxes;
