
export interface PricingTier {
  name: string;
  price: {
    monthly: number | string;
    yearly: number | string;
  };
  description: string;
  features: {
    name: string;
    included: boolean;
  }[];
  buttonText: string;
  isPopular?: boolean;
  isSpecial?: boolean;
  specialButtonLink?: string;
}

export const pricingData: PricingTier[] = [
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
