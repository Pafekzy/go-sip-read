
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/forms/LoginForm";
import { AdminLoginForm } from "@/components/forms/AdminLoginForm";

interface LoginContainerProps {
  defaultTab?: "user" | "admin";
}

export function LoginContainer({ defaultTab = "user" }: LoginContainerProps) {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // Redirect to dashboard
    navigate("/dashboard");
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
            <div className="space-y-4">
              <LoginForm onSuccess={handleLoginSuccess} />
              
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
          </TabsContent>

          <TabsContent value="admin">
            <div className="space-y-4">
              <AdminLoginForm onSuccess={handleLoginSuccess} />
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
