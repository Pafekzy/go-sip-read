
import { Home, BookOpen, Headphones, Film, Users, Award, Trophy, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home, current: true },
  { name: "Books", href: "/books", icon: BookOpen, current: false },
  { name: "Podcasts", href: "/podcasts", icon: Headphones, current: false },
  { name: "Videos", href: "/videos", icon: Film, current: false },
  { name: "Groups", href: "/groups", icon: Users, current: false },
  { name: "Badges", href: "/badges", icon: Award, current: false },
  { name: "Challenges", href: "/challenges", icon: Trophy, current: false },
  { name: "Progress", href: "/progress", icon: LineChart, current: false },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const isMobile = useIsMobile();
  
  if (isMobile) return null;
  
  return (
    <div className={cn(
      "h-screen border-r bg-card sticky top-0 transition-all duration-300", 
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="h-full py-4 flex flex-col">
        <div className="space-y-1 px-2">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant={item.current ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                collapsed ? "justify-center px-2" : "px-3"
              )}
              asChild
            >
              <a href={item.href}>
                <item.icon className={cn(
                  "h-5 w-5",
                  collapsed ? "" : "mr-3"
                )} />
                {!collapsed && <span>{item.name}</span>}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
