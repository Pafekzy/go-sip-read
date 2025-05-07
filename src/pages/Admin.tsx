
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/upgrade/PageHeader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserUpgradePanel } from "@/components/admin/UserUpgradePanel";
import { GroupManagement } from "@/components/admin/GroupManagement";
import { AnalyticsPanel } from "@/components/admin/AnalyticsPanel";
import { SystemSettingsPanel } from "@/components/admin/SystemSettingsPanel";
import { Home, AlertTriangle, ShieldAlert } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [adminType, setAdminType] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for authentication and admin status
    const checkAdmin = async () => {
      setLoading(true);
      
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        toast({
          title: "Authentication Required",
          description: "Please login to access the admin panel.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      setUser(session.user);
      
      // Query for admin type - in a real app you would check this from your database
      // This is a simplified example assuming admin info is stored in user metadata
      const adminTypeValue = localStorage.getItem('adminType') || null;
      setAdminType(adminTypeValue);
      
      // If not an admin, redirect to home
      if (!adminTypeValue) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }
      
      setLoading(false);
    };

    checkAdmin();
  }, [navigate, toast]);

  const handleReturnHome = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-gosip-purple border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <Button 
            onClick={handleReturnHome}
            variant="outline" 
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Button>
          
          <div className="flex items-center gap-2">
            <ShieldAlert className="text-gosip-purple" />
            <span className="font-bold text-gosip-purple">{adminType} Admin Panel</span>
          </div>
        </div>
        
        <PageHeader 
          title="Admin Control Panel"
          description="Manage and control all aspects of the GoSipRead platform"
        />

        {adminType === "gosipstaff" && (
          <div className="mt-4 mb-6">
            <Alert className="bg-gradient-to-r from-gosip-purple/20 to-gosip-purple-dark/20 border-gosip-purple">
              <AlertTriangle className="h-4 w-4 text-gosip-purple" />
              <AlertDescription className="text-gosip-purple-dark">
                You have full administrative access as GoSipStaff
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        <Tabs defaultValue="users" className="w-full mt-6">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 mb-8">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <UserUpgradePanel adminType={adminType || ""} />
          </TabsContent>
          
          <TabsContent value="groups">
            <GroupManagement adminType={adminType || ""} />
          </TabsContent>
          
          <TabsContent value="analytics">
            <AnalyticsPanel adminType={adminType || ""} />
          </TabsContent>
          
          <TabsContent value="settings">
            <SystemSettingsPanel adminType={adminType || ""} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
