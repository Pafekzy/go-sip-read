
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Search, UserPlus, ShieldCheck } from "lucide-react";

interface UserUpgradePanelProps {
  adminType: string;
}

export function UserUpgradePanel({ adminType }: UserUpgradePanelProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUpgradeType, setSelectedUpgradeType] = useState("");
  const { toast } = useToast();
  
  const isGoSipStaff = adminType === "gosipstaff";
  
  const handleUpgradeUser = () => {
    if (!searchTerm) {
      toast({
        title: "Error",
        description: "Please enter a user email to upgrade",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedUpgradeType) {
      toast({
        title: "Error",
        description: "Please select an upgrade type",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would implement the actual upgrade logic
    // For demo purposes, we'll just show a success toast
    toast({
      title: "User Upgraded",
      description: `User ${searchTerm} successfully upgraded to ${selectedUpgradeType}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-gosip-purple" />
          User Management & Upgrades
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Find User</label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="email"
                placeholder="Enter user email"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Upgrade to</label>
            <Select
              value={selectedUpgradeType}
              onValueChange={setSelectedUpgradeType}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select upgrade type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GroupAdmin">Group Admin (₦1,000/month)</SelectItem>
                <SelectItem value="TechMentor" disabled={!isGoSipStaff}>
                  Tech Mentor (₦45,000/month)
                  {!isGoSipStaff && " - GoSipStaff only"}
                </SelectItem>
                <SelectItem value="ProductivityGuru" disabled={!isGoSipStaff}>
                  Productivity Guru (₦200,000/month)
                  {!isGoSipStaff && " - GoSipStaff only"}
                </SelectItem>
                {isGoSipStaff && (
                  <SelectItem value="GoSipStaff">
                    GoSipStaff
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleUpgradeUser}
            className="w-full mt-4 bg-gosip-purple hover:bg-gosip-purple-dark"
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            Upgrade User
          </Button>
          
          {!isGoSipStaff && (
            <p className="text-xs text-muted-foreground mt-2">
              Note: Only GoSipStaff can upgrade users to Tech Mentor or Productivity Guru levels.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
