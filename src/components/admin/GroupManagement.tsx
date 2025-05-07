
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Group, Settings } from "lucide-react";

interface GroupManagementProps {
  adminType: string;
}

export function GroupManagement({ adminType }: GroupManagementProps) {
  // Different admin types have different capabilities
  const canCreateGroups = ["gosipstaff", "groupadmin", "techmentor", "productivityguru"].includes(adminType);
  const canManageAllGroups = ["gosipstaff", "techmentor", "productivityguru"].includes(adminType);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Group className="h-5 w-5 text-gosip-purple" />
          Group Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {canCreateGroups ? (
            <div>
              <h3 className="text-lg font-medium mb-3">Group Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="bg-gosip-purple hover:bg-gosip-purple-dark">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Group
                </Button>
                
                {canManageAllGroups && (
                  <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Manage All Groups
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                You don't have permission to manage groups.
              </p>
            </div>
          )}
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Your Groups</h3>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-muted-foreground">No groups found</p>
              {canCreateGroups && (
                <Button 
                  variant="link" 
                  className="mt-2 text-gosip-purple"
                >
                  Create your first group
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
