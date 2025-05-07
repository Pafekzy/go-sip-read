
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Settings, Lock } from "lucide-react";
import { useState } from "react";

interface SystemSettingsPanelProps {
  adminType: string;
}

export function SystemSettingsPanel({ adminType }: SystemSettingsPanelProps) {
  // Only GoSipStaff can access system settings
  const hasAccess = adminType === "gosipstaff";
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-gosip-purple" />
          System Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasAccess ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Maintenance Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Enable to temporarily restrict access to the platform
                </p>
              </div>
              <Switch
                checked={maintenanceMode}
                onCheckedChange={setMaintenanceMode}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Registration Open</h3>
                <p className="text-sm text-muted-foreground">
                  Allow new users to register
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Require email verification for new accounts
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="border-t pt-4 mt-4">
              <Button variant="destructive" className="w-full">
                Clear System Cache
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Lock className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">
              System settings are only accessible to GoSipStaff administrators.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
