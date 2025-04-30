
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

interface LoginFormProps {
  defaultTab?: "user" | "admin";
}

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({ defaultTab = "user" }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [adminType, setAdminType] = useState("");
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
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
    
    setIsLoading(true);
    setGeneralError(null);

    // Check restricted admin types
    if (defaultTab === "admin" && ["gosipstaff", "productivityguru", "techmentor"].includes(adminType)) {
      toast({
        title: "Access Restricted",
        description: "Only GoSipStaff can upgrade you to this Admin Level",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Sign in with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // If successful
      toast({
        title: "Success!",
        description: "You have successfully logged in.",
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
      
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
    <Card className="w-full max-w-md mx-auto">
      <Tabs defaultValue={defaultTab} className="w-full">
        <CardHeader>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User Login</TabsTrigger>
            <TabsTrigger value="admin">Admin Login</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          <TabsContent value="user">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {generalError && (
                  <Alert variant="destructive">
                    <AlertDescription>{generalError}</AlertDescription>
                  </Alert>
                )}
                
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`gosip-input ${formErrors.email ? 'border-red-500' : ''}`}
                    required
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
                    required
                  />
                  {formErrors.password && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.password}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gosip-purple to-gosip-purple-dark hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login as User"}
                </Button>
                
                <div className="text-center">
                  <Button 
                    variant="link" 
                    className="p-0"
                    onClick={() => navigate("/register")}
                  >
                    Don't have an account? Register here
                  </Button>
                </div>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="admin">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
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
                
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Admin Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`gosip-input ${formErrors.email ? 'border-red-500' : ''}`}
                    required
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
                    required
                  />
                  {formErrors.password && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.password}</p>
                  )}
                </div>
                
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
              </div>
            </form>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
