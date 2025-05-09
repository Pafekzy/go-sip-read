
import { Home, BookOpen, Headphones, Film, Users, Award, Trophy, LineChart, Moon, Sun, Tv } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/contexts/ThemeContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home, current: true },
  { name: "Books", href: "/books", icon: BookOpen, current: false },
  { name: "Podcasts", href: "/podcasts", icon: Headphones, current: false },
  { name: "Videos", href: "/videos", icon: Film, current: false },
  { name: "V.R Learning", href: "/vr-learning", icon: Tv, current: false },
  { name: "Groups", href: "/groups", icon: Users, current: false },
  { name: "Badges", href: "/badges", icon: Award, current: false },
  { name: "Challenges", href: "/challenges", icon: Trophy, current: false },
  { name: "Progress", href: "/progress", icon: LineChart, current: false },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  hidden?: boolean;
}

export function Sidebar({ collapsed = false, onToggle, hidden = false }: SidebarProps) {
  const isMobile = useIsMobile();
  const { theme, toggleTheme } = useTheme();
  
  if (isMobile) return null;
  
  return (
    <div className={cn(
      "h-screen border-r border-transparent bg-transparent backdrop-blur-sm sticky top-0 transition-all duration-300 ease-in-out opacity-[0.35]", 
      collapsed ? "w-14" : "w-48",
      hidden ? "-translate-x-full" : "translate-x-0"
    )}>
      <div className="h-full py-2 flex flex-col">
        <div className="space-y-1 px-2">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant={item.current ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start transition-all duration-150",
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
        <div className="mt-auto px-2 mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
            className="w-full justify-center"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
