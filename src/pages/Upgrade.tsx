
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { RippleButton } from "@/components/ui/ripple-button";
import { PricingCard } from "@/components/upgrade/PricingCard";
import { BillingToggle } from "@/components/upgrade/BillingToggle";
import { PageHeader } from "@/components/upgrade/PageHeader";
import { SupportSection } from "@/components/upgrade/SupportSection";
import { pricingData } from "@/data/pricingData";

export default function Upgrade() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-16 flex-1">
        <div className="mb-8">
          <RippleButton 
            onClick={handleReturnHome}
            variant="outline" 
            className="hover:bg-secondary"
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </RippleButton>
        </div>
        
        <div className="text-center mb-16">
          <PageHeader 
            title="Choose Your GoSipRead Plan"
            description="Take your learning journey to the next level with our premium features and tools"
          />
          
          <div className="flex justify-center items-center mt-8 mb-4">
            <BillingToggle 
              billingCycle={billingCycle}
              setBillingCycle={setBillingCycle}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingData.map((tier, i) => (
            <PricingCard
              key={i}
              {...tier}
              billingCycle={billingCycle}
            />
          ))}
        </div>

        <div className="mt-16">
          <SupportSection />
        </div>
      </div>
    </div>
  );
}
