
import { useEffect, useRef, useState } from "react";

interface EmojiProps {
  initialX: number; 
  initialY: number;
  speed: number;
  size: number;
}

const FloatingElement = ({ initialX, initialY, speed, size }: EmojiProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [velocity, setVelocity] = useState({
    // Make the movement more diagonal by ensuring both x and y have significant values
    x: (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.3),
    y: (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.3),
  });

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Update position based on velocity
      setPosition((prev) => ({
        x: prev.x + velocity.x * speed * deltaTime * 20,
        y: prev.y + velocity.y * speed * deltaTime * 20,
      }));

      // Handle boundary collisions
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (rect.right >= viewportWidth || rect.left <= 0) {
          setVelocity((prev) => ({ ...prev, x: -prev.x }));
        }

        if (rect.bottom >= viewportHeight || rect.top <= 0) {
          setVelocity((prev) => ({ ...prev, y: -prev.y }));
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [velocity, speed]);

  return (
    <div
      ref={elementRef}
      className="absolute pointer-events-none select-none rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        willChange: "transform",
        transition: "transform 0.2s ease-out",
        opacity: 0.05, // Changed opacity from 0.35 to 0.05 (5%)
        filter: "drop-shadow(0 0 8px rgba(155, 135, 245, 0.8))",
        backgroundColor: "#9b87f5", 
      }}
    />
  );
};

export const FloatingEmojis = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-5 pointer-events-none">
      {[...Array(4)].map((_, index) => (
        <FloatingElement
          key={index}
          initialX={Math.random() * window.innerWidth * 0.8}
          initialY={Math.random() * window.innerHeight * 0.8}
          speed={0.5 + Math.random() * 0.5}
          size={48 + Math.random() * 24}
        />
      ))}
    </div>
  );
};
