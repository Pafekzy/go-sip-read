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
import { Gift, Menu } from "lucide-react";
import { FloatingEmojis } from "@/components/home/FloatingEmojis";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Index() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginTab, setLoginTab] = useState<"user" | "admin">("user");  // Specify the type explicitly
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleUserLogin = () => {
    setLoginTab("user");
    setShowLogin(true);
  };

  const handleAdminLogin = () => {
    setLoginTab("admin");
    setShowLogin(true);
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const handleUpgrade = () => {
    navigate('/upgrade');
  };

  // Navigation items for mobile menu
  const navItems = [
    { label: "User Login", onClick: handleUserLogin },
    { label: "Admin Login", onClick: handleAdminLogin },
    { label: "Dashboard", onClick: handleDashboard },
    { label: "Register", onClick: handleGetStarted, highlight: true },
    { label: "Upgrade 🎁", onClick: handleUpgrade, special: true }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Add FloatingEmojis component here */}
      <FloatingEmojis />
      
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
        </div>
        
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-3 mt-8">
                {navItems.map((item, index) => (
                  <Button 
                    key={index}
                    variant={item.highlight ? "default" : item.special ? "ghost" : "ghost"}
                    className={`w-full ${item.special ? "bg-gosip-purple-dark hover:bg-gosip-purple-darker shadow-lg hover:shadow-xl animate-pulse" : (item.highlight ? "bg-gosip-purple hover:bg-gosip-purple-dark" : "")}`}
                    onClick={item.onClick}
                  >
                    {item.special && <Gift className="mr-1 h-4 w-4" />}
                    {item.label}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant="ghost" 
              onClick={handleUserLogin}
              className="whitespace-nowrap"
            >
              User Login
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleAdminLogin}
              className="whitespace-nowrap"
            >
              Admin Login
            </Button>
            <Button 
              variant="ghost"
              onClick={handleDashboard}
              className="whitespace-nowrap"
            >
              Dashboard
            </Button>
            <Button 
              className="bg-gosip-purple hover:bg-gosip-purple-dark whitespace-nowrap"
              onClick={handleGetStarted}
            >
              Register
            </Button>
            <RippleButton 
              onClick={handleUpgrade}
              className="bg-gosip-purple-dark hover:bg-gosip-purple-darker shadow-lg hover:shadow-xl animate-pulse whitespace-nowrap"
            >
              <Gift className="mr-1 h-4 w-4" /> Upgrade 🎁
            </RippleButton>
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
                onClick={() => setShowLogin(false)}
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
  );
}
