
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Construction } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(
      "Feature not yet available:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="container mx-auto px-4 text-center">
        <Logo />
        <div className="gosip-gradient-section max-w-2xl mx-auto mt-8">
          <div className="flex justify-center">
            <Construction className="h-24 w-24 text-white animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold mt-6 mb-4 bright-text">Coming Soon!</h1>
          <p className="text-white/90 dark:text-purple-200 mb-4">
            We're working hard to build this feature for you.
          </p>
          <p className="text-white/80 dark:text-purple-200/80 mb-8 max-w-md mx-auto">
            This part of the app is still under construction. Please check back later for updates!
          </p>
          <Button 
            onClick={handleGoBack}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm hover:scale-105 transition-transform"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
