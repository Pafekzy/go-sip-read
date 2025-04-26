
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  BookOpen,
  Video,
  Headphones,
  Award,
  Users,
  Target,
  MessageCircle,
  BadgeDollarSign,
  MousePointer,
  Shield
} from "lucide-react";

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  requiredPermission?: keyof ReturnType<typeof useAuth>['getPermissionsForRole']; 
  requiredRole?: UserRole;
}

// Import UserRole type from AuthContext to use it properly
import { UserRole } from "@/contexts/AuthContext";

export function MainNavigation() {
  const { user, hasPermission, hasSpecificPermission } = useAuth();
  
  const navItems: NavItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: BookOpen },
    { name: "Books", path: "/books", icon: BookOpen },
    { name: "Early Learning", path: "/early-learning", icon: BookOpen },
    { name: "Videos", path: "/videos", icon: Video },
    { name: "Podcasts", path: "/podcasts", icon: Headphones },
    { name: "AI Assistant", path: "/ai-assistant", icon: MessageCircle },
    { name: "Achievements", path: "/achievements", icon: Award },
    { name: "Groups", path: "/groups", icon: Users, requiredRole: "subscribed" },
    { name: "Focus Games", path: "/presentness-game", icon: MousePointer },
    { name: "Accountability", path: "/accountability", icon: BadgeDollarSign },
    { 
      name: "Admin Panel", 
      path: "/admin", 
      icon: Shield, 
      requiredPermission: "canAccessAdminPanel"
    },
  ];

  return (
    <nav className="flex flex-wrap gap-2 justify-center my-4">
      {navItems.map((item) => {
        // Skip items requiring higher permissions
        if (item.requiredRole && !hasPermission(item.requiredRole)) {
          return null;
        }
        
        // Skip items requiring specific permissions
        if (item.requiredPermission && !hasSpecificPermission(item.requiredPermission)) {
          return null;
        }
        
        return (
          <Link key={item.path} to={item.path}>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 transition-all hover:bg-primary hover:text-primary-foreground"
            >
              <item.icon size={16} />
              {item.name}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}
