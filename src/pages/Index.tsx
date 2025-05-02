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
import { Gift } from "lucide-react";
import { FloatingEmojis } from "@/components/home/FloatingEmojis";

export default function Index() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginTab, setLoginTab] = useState<"user" | "admin">("user");  // Specify the type explicitly
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Add FloatingEmojis component here */}
      <FloatingEmojis />
      
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="space-x-2">
          <Button 
            variant="ghost" 
            onClick={handleUserLogin}
          >
            User Login
          </Button>
          <Button 
            variant="ghost" 
            onClick={handleAdminLogin}
          >
            Admin Login
          </Button>
          <Button 
            variant="ghost"
            onClick={handleDashboard}
          >
            Dashboard
          </Button>
          <Button 
            className="bg-gosip-purple hover:bg-gosip-purple-dark"
            onClick={handleGetStarted}
          >
            Register
          </Button>
          <RippleButton 
            onClick={handleUpgrade}
            className="bg-gosip-purple-dark hover:bg-gosip-purple-darker shadow-lg hover:shadow-xl animate-pulse"
          >
            <Gift className="mr-1 h-4 w-4" /> Upgrade 🎁
          </RippleButton>
        </div>
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

      <footer className="bg-card py-6 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Logo />
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} GoSipRead. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
