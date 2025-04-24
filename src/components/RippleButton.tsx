
import { useState, useRef, useEffect, ReactNode } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';

interface RippleButtonProps extends ButtonProps {
  children: ReactNode;
}

export function RippleButton({ children, className, ...props }: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number, y: number, size: number, id: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const nextRippleId = useRef(0);

  const addRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    // Get position relative to button
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Calculate size based on button dimensions
    const size = Math.max(button.clientWidth, button.clientHeight) * 2;
    
    // Add new ripple
    const id = nextRippleId.current;
    nextRippleId.current += 1;
    
    setRipples([...ripples, { x, y, size, id }]);
    
    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(ripples => ripples.filter(ripple => ripple.id !== id));
    }, 1000); // Match with CSS animation duration
  };

  // Clean up any remaining ripples on unmount
  useEffect(() => {
    return () => {
      setRipples([]);
    };
  }, []);

  return (
    <Button 
      ref={buttonRef}
      className={`relative overflow-hidden ${className || ''}`} 
      onMouseDown={addRipple}
      {...props}
    >
      {ripples.map(({ x, y, size, id }) => (
        <span 
          key={id}
          style={{ 
            position: 'absolute',
            left: x - size / 2, 
            top: y - size / 2,
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
            opacity: 0.3,
            transform: 'scale(0)',
            animation: 'ripple 1s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </Button>
  );
}
