
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RippleButton } from "@/components/ui/ripple-button";
import { Check, X, Gift, MessageSquare } from "lucide-react";

interface Feature {
  name: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: {
    monthly: number | string;
    yearly: number | string;
  };
  description: string;
  features: Feature[];
  buttonText: string;
  isPopular?: boolean;
  isSpecial?: boolean;
  specialButtonLink?: string;
}

export default function Upgrade() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const pricingData: PricingTier[] = [
    {
      name: "Free Subscriber",
      price: {
        monthly: 0,
        yearly: 0,
      },
      description: "Basic access with limitations",
      features: [
        { name: "Create group", included: false },
        { name: "Get promo codes", included: false },
        { name: "Enter a group", included: false },
        { name: "Host a book war", included: false },
        { name: "Be made group admin", included: false },
        { name: "1-year automated portfolio", included: false },
        { name: "Read books", included: true },
        { name: "Download books", included: false },
      ],
      buttonText: "Current Plan",
    },
    {
      name: "Group Admin",
      price: {
        monthly: 1000,
        yearly: 10000,
      },
      description: "Perfect for community leaders",
      features: [
        { name: "Create group", included: true },
        { name: "Get promo codes", included: false },
        { name: "Enter a group", included: true },
        { name: "Host a book war", included: false },
        { name: "Be made group admin", included: true },
        { name: "1-year automated portfolio", included: true },
        { name: "Read books", included: true },
        { name: "Download books", included: true },
      ],
      buttonText: "Upgrade Now",
      isPopular: true,
    },
    {
      name: "Tech Mentor",
      price: {
        monthly: 45000,
        yearly: 450000,
      },
      description: "Advanced features for leaders",
      features: [
        { name: "Create group", included: true },
        { name: "Get promo codes every 3 days", included: true },
        { name: "Enter a group", included: true },
        { name: "Host a book war", included: true },
        { name: "Be made group admin", included: true },
        { name: "1-year automated portfolio", included: true },
        { name: "Alpha-group feature", included: true },
        { name: "Include 1 advert in groups", included: true },
      ],
      buttonText: "Upgrade Now",
    },
    {
      name: "Productivity Guru",
      price: {
        monthly: 200000,
        yearly: 2000000,
      },
      description: "Enterprise-level tools and support",
      features: [
        { name: "All Tech Mentor features", included: true },
        { name: "Premium support", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Custom integration", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Custom branding", included: true },
        { name: "API access", included: true },
        { name: "Priority features access", included: true },
      ],
      buttonText: "Reach out on WhatsApp",
      isSpecial: true,
      specialButtonLink: "https://chat.whatsapp.com/KyG2DVv5zl35PkqaThvINk",
    },
  ];

  const formatPrice = (price: number | string) => {
    if (typeof price === "number") {
      return `₦${price.toLocaleString()}`;
    }
    return price;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gosip-gradient-text">
            Choose Your GoSipRead Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Take your learning journey to the next level with our premium features and tools
          </p>
          
          <div className="flex justify-center items-center mt-8 mb-4">
            <div className="bg-secondary rounded-full p-1 flex gap-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-gosip-purple text-white"
                    : "hover:bg-muted"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  billingCycle === "yearly"
                    ? "bg-gosip-purple text-white"
                    : "hover:bg-muted"
                }`}
              >
                Yearly
                <Badge className="ml-2 bg-gosip-purple-dark">Save 20%</Badge>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingData.map((tier, i) => (
            <Card
              key={i}
              className={`relative flex flex-col border-2 h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                tier.isPopular ? "border-gosip-purple" : "border-border"
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 bg-gosip-purple text-white text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">
                    {formatPrice(tier.price[billingCycle])}
                  </span>
                  {" "}
                  <span className="text-muted-foreground">
                    / {billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                {tier.isSpecial ? (
                  <a 
                    href={tier.specialButtonLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full"
                  >
                    <RippleButton
                      className="w-full bg-green-600 hover:bg-green-700"
                      rippleColor="rgba(255, 255, 255, 0.5)"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {tier.buttonText}
                    </RippleButton>
                  </a>
                ) : (
                  <RippleButton
                    className={`w-full ${
                      tier.isPopular
                        ? "bg-gosip-purple hover:bg-gosip-purple-dark"
                        : tier.name === "Free Subscriber"
                        ? "bg-secondary hover:bg-secondary/80"
                        : ""
                    }`}
                  >
                    {tier.name !== "Free Subscriber" && <Gift className="mr-2 h-4 w-4" />}
                    {tier.buttonText}
                  </RippleButton>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Contact our team for detailed information about our plans and how they can benefit
            your learning journey.
          </p>
          <RippleButton>Contact Support</RippleButton>
        </div>
      </div>
    </div>
  );
}
