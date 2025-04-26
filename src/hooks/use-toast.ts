
import { type ToastProps as ShadcnToastProps } from "@/components/ui/toast";
import { toast as sonnerToast, ToastT } from "sonner";

// Define a custom ToastProps type that is compatible with both shadcn and sonner
export interface ToastProps extends Omit<ShadcnToastProps, "description"> {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
  [key: string]: any;
}

const useToast = () => {
  const toast = ({ title, description, variant, ...props }: ToastProps) => {
    sonnerToast(title, {
      description,
      className: variant === "destructive" ? "bg-destructive text-destructive-foreground" : undefined,
      ...props,
    });
  };
  
  return {
    toast,
    toasts: [] // This is included for compatibility with @/components/ui/toast
  };
};

export { useToast };

// Standalone toast function
export const toast = ({ title, description, variant, ...props }: ToastProps) => {
  sonnerToast(title, {
    description,
    className: variant === "destructive" ? "bg-destructive text-destructive-foreground" : undefined,
    ...props,
  });
};
