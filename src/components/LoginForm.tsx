
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [adminType, setAdminType] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success!",
        description: "You have successfully logged in.",
      });
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs defaultValue="user" className="w-full">
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
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gosip-purple to-gosip-purple-dark hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login as User"}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="admin">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
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
                <Input
                  type="email"
                  placeholder="Admin Email"
                  required
                  className="gosip-input"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  required
                  className="gosip-input"
                />
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
