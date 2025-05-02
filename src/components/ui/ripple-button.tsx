
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RippleButtonProps extends ButtonProps {
  rippleColor?: string;
}

export const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ className, rippleColor = "rgba(255, 255, 255, 0.7)", children, ...props }, ref) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const nextId = useRef(0);

    const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = {
        x,
        y,
        id: nextId.current,
      };

      nextId.current += 1;
      setRipples([...ripples, ripple]);
    };

    // Clean up ripples after animation
    useEffect(() => {
      if (ripples.length > 0) {
        const timeoutId = setTimeout(() => {
          setRipples((prevRipples) => prevRipples.slice(1));
        }, 600);  // slightly longer than the animation duration

        return () => clearTimeout(timeoutId);
      }
    }, [ripples]);

    return (
      <Button
        ref={(node) => {
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          buttonRef.current = node;
        }}
        className={cn("relative overflow-hidden", className)}
        onMouseDown={addRipple}
        {...props}
      >
        {children}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full animate-ripple pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
              backgroundColor: rippleColor,
              width: "300%",
              paddingBottom: "300%",
            }}
          />
        ))}
      </Button>
    );
  }
);

RippleButton.displayName = "RippleButton";
