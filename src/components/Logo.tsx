
import { cn } from "@/lib/utils";

type LogoVariant = "default" | "cover" | "profile";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ 
  variant = "default", 
  className, 
  size = "md" 
}: LogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16",
    xl: "h-20"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {variant === "default" && (
        <div className="dark:bg-white/10 dark:backdrop-blur-sm dark:p-2 dark:rounded-lg">
          <img 
            src="/lovable-uploads/e1158504-470f-4afa-83c9-901eaefc77d7.png" 
            alt="GoSipRead Logo" 
            className={cn("object-contain", sizeClasses[size])}
          />
        </div>
      )}
      
      {variant === "cover" && (
        <div className="dark:bg-white/10 dark:backdrop-blur-sm dark:p-2 dark:rounded-lg">
          <img 
            src="/lovable-uploads/405098cb-4a73-490f-b836-f34cb9a0bf42.png" 
            alt="GoSipRead Cover Logo" 
            className={cn("object-contain", sizeClasses[size])}
          />
        </div>
      )}
      
      {variant === "profile" && (
        <div className="dark:bg-white/10 dark:backdrop-blur-sm dark:p-2 dark:rounded-lg">
          <img 
            src="/lovable-uploads/78000052-b371-45c1-99d6-f13eb232a514.png" 
            alt="GoSipRead Profile Logo" 
            className={cn("object-contain", sizeClasses[size])}
          />
        </div>
      )}
    </div>
  );
}
