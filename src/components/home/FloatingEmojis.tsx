
import { useEffect, useRef, useState } from "react";

interface EmojiProps {
  emoji: string;
  initialX: number; 
  initialY: number;
  speed: number;
  size: number;
}

const Emoji = ({ emoji, initialX, initialY, speed, size }: EmojiProps) => {
  const emojiRef = useRef<HTMLDivElement>(null);
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
      if (emojiRef.current) {
        const rect = emojiRef.current.getBoundingClientRect();
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
      ref={emojiRef}
      className="absolute pointer-events-none select-none"
      style={{
        fontSize: `${size}px`,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        willChange: "transform",
        transition: "transform 0.2s ease-out",
        opacity: 0.35, // Reduced opacity to 35%
        filter: "drop-shadow(0 0 8px rgba(155, 135, 245, 0.8))", // Purple glow effect
        color: "#9b87f5", // Purple tint to the emojis
      }}
    >
      {emoji}
    </div>
  );
};

export const FloatingEmojis = () => {
  const emojis = ["🎁", "💰", "🎉", "🏆"];
  
  return (
    <div className="fixed inset-0 overflow-hidden -z-5 pointer-events-none">
      {emojis.map((emoji, index) => (
        <Emoji
          key={index}
          emoji={emoji}
          initialX={Math.random() * window.innerWidth * 0.8}
          initialY={Math.random() * window.innerHeight * 0.8}
          speed={0.5 + Math.random() * 0.5}
          size={48 + Math.random() * 24}
        />
      ))}
    </div>
  );
};
