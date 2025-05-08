import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { NotificationBar } from "@/components/notification/NotificationBar";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
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

  const handleSubmitStart = () => {
    setIsLoading(true);
  };

  const handleSubmitEnd = () => {
    setIsLoading(false);
  };

  // Show loading indicator while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
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
            <RegisterForm 
              onSubmitStart={handleSubmitStart} 
              onSubmitEnd={handleSubmitEnd} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
