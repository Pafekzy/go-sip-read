
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Create a schema for registration validation with regex patterns
const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .regex(
      /^[A-Z][a-z]+(?: [A-Z][a-z]+)+$/,
      "Must include first and last name, each starting with a capital letter"
    ),
  email: z
    .string()
    .email("Please enter a valid email address")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email format"
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      "Password must include lowercase, uppercase, number and special character"
    ),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
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

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      setIsCheckingAuth(true);
      const { data } = await supabase.auth.getSession();
      
      // If user is already logged in, redirect to dashboard
      if (data.session) {
        navigate("/dashboard");
      }
      
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, [navigate]);

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
    
    setIsLoading(true);
    setGeneralError(null);

    try {
      // First check if the email already exists
      const { data: existingUsers, error: checkError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', formData.email)
        .single();

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

      // Modified: Register the user using Supabase Auth with disableAutoConfirm: false
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName
          },
          captchaToken: "disabled" // This bypasses the captcha requirement
        }
      });

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
      setIsLoading(false);
    }
  };

  // Show loading indicator while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gosip-purple"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2" 
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <CardTitle className="text-2xl text-center flex-1 pr-8">Create Your Account</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {generalError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{generalError}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className={`gosip-input ${formErrors.fullName ? 'border-red-500' : ''}`}
              />
              {formErrors.fullName && (
                <p className="text-xs text-red-500 mt-1">{formErrors.fullName}</p>
              )}
            </div>
            
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`gosip-input ${formErrors.email ? 'border-red-500' : ''}`}
              />
              {formErrors.email && (
                <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
              )}
            </div>
            
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`gosip-input ${formErrors.password ? 'border-red-500' : ''}`}
              />
              {formErrors.password && (
                <p className="text-xs text-red-500 mt-1">{formErrors.password}</p>
              )}
            </div>
            
            <div>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`gosip-input ${formErrors.confirmPassword ? 'border-red-500' : ''}`}
              />
              {formErrors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{formErrors.confirmPassword}</p>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-gosip-purple to-gosip-purple-dark hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Register"}
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Button variant="link" className="p-0" onClick={() => navigate("/")}>
                Login here
              </Button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
