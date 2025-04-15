
import { useState } from "react";
import { Bell, Menu, MessageCircle, Search, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <nav className="border-b bg-background py-2 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>
        
        {!isMobile && (
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search books, podcasts, videos..."
                className="w-full py-2 pl-10 pr-4 rounded-full bg-secondary border-0 focus:outline-none focus:ring-2 focus:ring-gosip-purple/30"
              />
            </div>
          </div>
        )}

        {isMobile ? (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
            
            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-background border-b p-4 flex flex-col gap-4 animate-fade-in">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search books, podcasts, videos..."
                    className="w-full py-2 pl-10 pr-4 rounded-full bg-secondary border-0 focus:outline-none focus:ring-2 focus:ring-gosip-purple/30"
                  />
                </div>
                <Button variant="ghost" className="justify-start">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  AI Chat
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button variant="ghost" className="justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-gosip-purple text-white">US</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </nav>
  );
}
