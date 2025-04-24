
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
  MousePointer
} from "lucide-react";

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  requiredRole?: string;
}

export function MainNavigation() {
  const { user, hasPermission } = useAuth();
  
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
  ];

  return (
    <nav className="flex flex-wrap gap-2 justify-center my-4">
      {navItems.map((item) => {
        // Skip items requiring higher permissions
        if (item.requiredRole && !hasPermission(item.requiredRole as any)) {
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
