
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/forms/FormInput";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RegisterFormData, registerSchema } from "@/utils/validationSchemas";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod"; // Add this import to fix the error

interface RegisterFormProps {
  onSubmitStart: () => void;
  onSubmitEnd: () => void;
}

export const RegisterForm = ({ onSubmitStart, onSubmitEnd }: RegisterFormProps) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Clear general error
    if (generalError) {
      setGeneralError(null);
    }
  };

  const validateForm = (): boolean => {
    try {
      registerSchema.parse(formData);
      setFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setFormErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSubmitStart();
    setGeneralError(null);

    try {
      // First check if the email already exists
      const { data: existingUsers, error: checkError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', formData.email)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 means no results found, which is what we want
        throw checkError;
      }

      if (existingUsers) {
        toast({
          title: "Account already exists",
          description: "You have already been registered. Please sign in.",
          variant: "destructive",
        });
        navigate("/"); // Redirect to login page
        return;
      }

      console.log("Attempting to sign up user with email:", formData.email);
      
      // Fix: Use the signUp method with only one argument containing all options
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
          // Set captchaToken to null explicitly
          captchaToken: null
        }
      });

      console.log("Signup response:", data ? "Success" : "Failed", error ? error.message : "No error");

      if (error) throw error;

      // If successful
      toast({
        title: "Registration successful!",
        description: "Your account has been created. You can now login.",
      });
      
      // Redirect to login page
      navigate("/");
      
    } catch (error: any) {
      console.error("Registration error:", error);
      
      if (error.message?.includes("already registered")) {
        toast({
          title: "Account already exists",
          description: "You have already been registered. Please sign in.",
          variant: "destructive",
        });
        navigate("/"); // Redirect to login page
      } else {
        setGeneralError(error.message || "Failed to register. Please try again.");
      }
    } finally {
      onSubmitEnd();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {generalError && (
        <Alert variant="destructive">
          <AlertDescription>{generalError}</AlertDescription>
        </Alert>
      )}
      
      <FormInput
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        error={formErrors.fullName}
      />
      
      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        error={formErrors.email}
      />
      
      <FormInput
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        error={formErrors.password}
      />
      
      <FormInput
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={formErrors.confirmPassword}
      />
      
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-gosip-purple to-gosip-purple-dark hover:opacity-90"
      >
        Register
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Already have an account?{" "}
        <Button variant="link" className="p-0" onClick={() => navigate("/")}>
          Login here
        </Button>
      </p>
    </form>
  );
};
