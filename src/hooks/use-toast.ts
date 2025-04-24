
import { type ToastProps } from "@/components/ui/toast";
import { toast as sonnerToast } from "sonner";

const useToast = () => {
  const toast = ({ title, description, ...props }: ToastProps) => {
    sonnerToast(title, {
      description,
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
export const toast = ({ title, description, ...props }: ToastProps) => {
  sonnerToast(title, {
    description,
    ...props,
  });
};
