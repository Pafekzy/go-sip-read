
import { RippleButton } from "@/components/ui/ripple-button";

export function SupportSection() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
        Contact our team for detailed information about our plans and how they can benefit
        your learning journey.
      </p>
      <RippleButton>Contact Support</RippleButton>
    </div>
  );
}
