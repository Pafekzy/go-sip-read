
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success!",
        description: "Registration successful. You can now login.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Full Name"
              required
              className="gosip-input"
            />
            <Input
              type="email"
              placeholder="Email"
              required
              className="gosip-input"
            />
            <Input
              type="password"
              placeholder="Password"
              required
              className="gosip-input"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              required
              className="gosip-input"
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-gosip-purple to-gosip-purple-dark hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Register"}
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Button variant="link" className="p-0" onClick={() => window.location.href = "/"}>
                Login here
              </Button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
