
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
        <div className="mt-8 flex justify-center">
          <Construction className="h-24 w-24 text-gosip-purple animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold mt-6 mb-4">Coming Soon!</h1>
        <p className="text-xl text-muted-foreground mb-4">
          We're working hard to build this feature for you.
        </p>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          This part of the app is still under construction. Please check back later for updates!
        </p>
        <Button 
          onClick={handleGoBack}
          className="bg-gosip-purple hover:bg-gosip-purple-dark"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
