
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EarlyLearning() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <BookOpen className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-6 gosip-gradient-text">Early And Continuous Self-Learning</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Start your journey of continuous learning and personal growth with our curated resources and AI-powered recommendations.
        </p>
        
        <div className="grid gap-6">
          <div className="gosip-card p-6">
            <h2 className="text-2xl font-semibold mb-4">Track Your Learning Journey</h2>
            <p className="text-muted-foreground mb-4">
              Our platform automatically tracks what you read, watch, and listen to, helping you maintain consistency in your learning journey.
            </p>
            <Button className="bg-gosip-purple hover:bg-gosip-purple-dark">
              Start Tracking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
