
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Groups() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <Users className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="heading-container">
          <h1 className="text-4xl font-bold mb-6 gosip-gradient-text">Learning Groups</h1>
        </div>
        
        <p className="text-xl text-muted-foreground mb-8">
          Join or create learning groups to study together and motivate each other.
        </p>
        
        <div className="gosip-card p-6">
          <h2 className="text-2xl font-semibold mb-4">Available Groups</h2>
          <p className="text-muted-foreground mb-4">
            Find study groups based on your interests or create your own.
          </p>
          <Button className="bg-gosip-purple hover:bg-gosip-purple-dark">
            Browse Groups
          </Button>
        </div>
      </div>
    </div>
  );
}
