
import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/home/HeroSection";
import { VisionSection } from "@/components/home/VisionSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { SupportedBrands } from "@/components/SupportedBrands";
import { useNavigate } from "react-router-dom";
import { RippleButton } from "@/components/ui/ripple-button";
import { Gift, Menu, X } from "lucide-react";
import { FloatingEmojis } from "@/components/home/FloatingEmojis";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sidebar } from "@/components/Sidebar";
import { NotificationBar } from "@/components/notification/NotificationBar";
import { useTheme } from "@/contexts/ThemeContext";

export default function Index() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginTab, setLoginTab] = useState<"user" | "admin">("user");
  const [hideSidebar, setHideSidebar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { theme } = useTheme();

  const handleGetStarted = () => {
    navigate('/register');
    setMobileMenuOpen(false);
  };

  const handleUserLogin = () => {
    setLoginTab("user");
    setShowLogin(true);
    setHideSidebar(true); // Hide sidebar when login button is clicked
    setMobileMenuOpen(false);
  };

  const handleDashboard = () => {
    navigate('/dashboard');
    setMobileMenuOpen(false);
  };

  const handleUpgrade = () => {
    navigate('/upgrade');
    setMobileMenuOpen(false);
  };

  // Navigation items for mobile menu - removed Admin login
  const navItems = [
    { label: "User Login", onClick: handleUserLogin },
    { label: "Dashboard", onClick: handleDashboard },
    { label: "Register", onClick: handleGetStarted, highlight: true },
    { label: "Upgrade 🎁", onClick: handleUpgrade, special: true }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Add FloatingEmojis component here */}
      <FloatingEmojis />
      
      <div className="flex w-full">
        {/* Sidebar - Only show when not in login page */}
        {!showLogin && <Sidebar hidden={hideSidebar} />}
        
        <div className="flex-1">
          <header className="container mx-auto py-4 px-4 flex justify-between items-center">
            <div className="flex items-center">
              <Logo />
            </div>
            
            {isMobile ? (
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="h-10 w-10 flex items-center justify-center"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
                
                {mobileMenuOpen && (
                  <div className="absolute top-full right-0 w-64 mt-2 py-2 bg-background rounded-lg shadow-lg border z-50 animate-fade-in">
                    <div className="flex flex-col gap-1 p-2">
                      {navItems.map((item, index) => (
                        <Button 
                          key={index}
                          variant={item.highlight ? "default" : item.special ? "ghost" : "ghost"}
                          className={`w-full justify-start h-auto py-2 ${item.special ? "bg-gosip-purple-dark hover:bg-gosip-purple-darker shadow-lg hover:shadow-xl animate-pulse" : (item.highlight ? "bg-gosip-purple hover:bg-gosip-purple-dark" : "")}`}
                          onClick={item.onClick}
                        >
                          {item.special && <Gift className="mr-1 h-4 w-4" />}
                          {item.label}
                        </Button>
                      ))}
                      <div className="flex justify-center mt-2">
                        <ThemeToggle />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Modified desktop layout that doesn't collapse on zoom */
              <div className="flex items-center lg:ml-auto">
                <div className="flex flex-nowrap items-center gap-2">
                  <Button 
                    variant="ghost" 
                    onClick={handleUserLogin}
                    className="whitespace-nowrap flex-shrink-0"
                  >
                    User Login
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={handleDashboard}
                    className="whitespace-nowrap flex-shrink-0"
                  >
                    Dashboard
                  </Button>
                  <Button 
                    className="bg-gosip-purple hover:bg-gosip-purple-dark whitespace-nowrap flex-shrink-0"
                    onClick={handleGetStarted}
                  >
                    Register
                  </Button>
                  <RippleButton 
                    onClick={handleUpgrade}
                    className="bg-gosip-purple-dark hover:bg-gosip-purple-darker shadow-lg hover:shadow-xl animate-pulse whitespace-nowrap flex-shrink-0"
                  >
                    <Gift className="mr-1 h-4 w-4" /> Upgrade 🎁
                  </RippleButton>
                </div>
              </div>
            )}
          </header>

          <main className="flex-1">
            {showLogin ? (
              <div className="container mx-auto px-4 py-10">
                <LoginForm defaultTab={loginTab} />
                <div className="text-center mt-6">
                  <Button
                    variant="link"
                    onClick={() => {
                      setShowLogin(false);
                      setHideSidebar(false); // Show sidebar when returning to home
                    }}
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <HeroSection onGetStarted={handleGetStarted} />
                <VisionSection />
                <BenefitsSection />
                <FeaturesSection />
                <SupportedBrands />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
