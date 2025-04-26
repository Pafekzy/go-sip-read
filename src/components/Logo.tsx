
import { cn } from "@/lib/utils";

type LogoVariant = "default" | "cover" | "profile";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
}

export function Logo({ variant = "default", className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {variant === "default" && (
        <>
          <img 
            src="/lovable-uploads/e1158504-470f-4afa-83c9-901eaefc77d7.png" 
            alt="GoSipRead Logo" 
            className="h-10"
          />
        </>
      )}
      
      {variant === "cover" && (
        <img 
          src="/lovable-uploads/405098cb-4a73-490f-b836-f34cb9a0bf42.png" 
          alt="GoSipRead Cover Logo" 
          className="h-20"
        />
      )}
      
      {variant === "profile" && (
        <img 
          src="/lovable-uploads/78000052-b371-45c1-99d6-f13eb232a514.png" 
          alt="GoSipRead Profile Logo" 
          className="h-12"
        />
      )}
    </div>
  );
}
