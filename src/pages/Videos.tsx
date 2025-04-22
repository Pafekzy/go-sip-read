
import { Link } from "react-router-dom";
import { Film } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Videos() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <Film className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-6 gosip-gradient-text">Educational Videos</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Watch curated videos that help you learn new concepts efficiently.
        </p>
        
        <div className="grid gap-6">
          <div className="gosip-card p-6">
            <h2 className="text-2xl font-semibold mb-4">Featured Videos</h2>
            <p className="text-muted-foreground mb-4">
              Access a collection of educational videos tailored to your learning path.
            </p>
            <Button className="bg-gosip-purple hover:bg-gosip-purple-dark">
              Browse Videos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
