
import { Badge } from "@/components/ui/badge";

interface BillingToggleProps {
  billingCycle: "monthly" | "yearly";
  setBillingCycle: (cycle: "monthly" | "yearly") => void;
}

export function BillingToggle({ billingCycle, setBillingCycle }: BillingToggleProps) {
  return (
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
  );
}
