
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RippleButton } from "@/components/ui/ripple-button";
import { Check, X, Gift, MessageSquare } from "lucide-react";

interface Feature {
  name: string;
  included: boolean;
}

export interface PricingTierProps {
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
  billingCycle: "monthly" | "yearly";
}

export function PricingCard({
  name,
  price,
  description,
  features,
  buttonText,
  isPopular,
  isSpecial,
  specialButtonLink,
  billingCycle,
}: PricingTierProps) {
  
  const formatPrice = (price: number | string) => {
    if (typeof price === "number") {
      return `₦${price.toLocaleString()}`;
    }
    return price;
  };

  return (
    <Card
      className={`relative flex flex-col border-2 h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        isPopular ? "border-gosip-purple" : "border-border"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 bg-gosip-purple text-white text-sm font-medium rounded-full">
          Most Popular
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <span className="text-3xl font-bold">
            {formatPrice(price[billingCycle])}
          </span>
          {" "}
          <span className="text-muted-foreground">
            / {billingCycle === "monthly" ? "month" : "year"}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature, j) => (
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
        {isSpecial ? (
          <a 
            href={specialButtonLink} 
            target="_blank" 
            rel="noreferrer" 
            className="w-full"
          >
            <RippleButton
              className="w-full bg-green-600 hover:bg-green-700"
              rippleColor="rgba(255, 255, 255, 0.5)"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              {buttonText}
            </RippleButton>
          </a>
        ) : (
          <RippleButton
            className={`w-full ${
              isPopular
                ? "bg-gosip-purple hover:bg-gosip-purple-dark"
                : name === "Free Subscriber"
                ? "bg-secondary hover:bg-secondary/80"
                : ""
            }`}
          >
            {name !== "Free Subscriber" && <Gift className="mr-2 h-4 w-4" />}
            {buttonText}
          </RippleButton>
        )}
      </CardFooter>
    </Card>
  );
}
