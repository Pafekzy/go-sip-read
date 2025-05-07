import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/forms/FormInput";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { loginSchema, LoginFormData } from "@/utils/loginValidationSchema";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

interface AdminLoginFormProps {
  onSuccess: () => void;
}

export const AdminLoginForm = ({ onSuccess }: AdminLoginFormProps) => {
  const [adminType, setAdminType] = useState("");
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
      loginSchema.parse(formData);
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
    
    // Check restricted admin types
    if (["gosipstaff", "productivityguru", "techmentor"].includes(adminType)) {
      toast({
        title: "Access Restricted",
        description: "Only GoSipStaff can upgrade you to this Admin Level",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setGeneralError(null);

    try {
      // Sign in with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // Store admin type in localStorage
      localStorage.setItem('adminType', adminType);
      
      // If successful
      toast({
        title: "Success!",
        description: "You have successfully logged in as admin.",
      });
      
      // Navigate to admin page
      navigate('/admin');
      
    } catch (error: any) {
      console.error("Login error:", error);
      
      if (error.message?.includes("Invalid login credentials")) {
        setGeneralError("Invalid email or password. Please try again or register if you don't have an account.");
      } else {
        setGeneralError(error.message || "Failed to login. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {generalError && (
        <Alert variant="destructive">
          <AlertDescription>{generalError}</AlertDescription>
        </Alert>
      )}
      
      <Select
        value={adminType}
        onValueChange={setAdminType}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Admin Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gosipstaff">GoSipStaff</SelectItem>
          <SelectItem value="groupadmin">Group Admin</SelectItem>
          <SelectItem value="productivityguru">Productivity Guru Admin</SelectItem>
          <SelectItem value="techmentor">Tech Mentor Admin</SelectItem>
        </SelectContent>
      </Select>
      
      <FormInput
        type="email"
        name="email"
        placeholder="Admin Email"
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
      
      {["gosipstaff", "productivityguru", "techmentor"].includes(adminType) && (
        <Alert>
          <AlertDescription>
            Only GoSipStaff can upgrade you to this Admin Level
          </AlertDescription>
        </Alert>
      )}
      
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-gosip-purple to-gosip-purple-dark hover:opacity-90"
        disabled={isLoading || !adminType}
      >
        {isLoading ? "Logging in..." : "Login as Admin"}
      </Button>
    </form>
  );
};
