
import { RippleButton } from "@/components/ui/ripple-button";
import { toast } from "@/components/ui/use-toast";

export function SupportSection() {
  const handleSupportClick = () => {
    // Show toast notification
    toast({
      title: "Support Request",
      description: "Redirecting you to our WhatsApp support group.",
      duration: 3000,
    });
    
    // Redirect to WhatsApp group link
    window.open("https://chat.whatsapp.com/BCDPNyc6v7X2DtKM2oQ6PB", "_blank");
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
        Contact our team for detailed information about our plans and how they can benefit
        your learning journey.
      </p>
      <RippleButton onClick={handleSupportClick}>Contact Support</RippleButton>
    </div>
  );
}
