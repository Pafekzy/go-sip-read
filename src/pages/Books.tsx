
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Books() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <BookOpen className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-6 gosip-gradient-text">Books & Articles</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Explore our curated collection of books and articles to enhance your learning journey.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder content - to be implemented based on user needs */}
          <div className="gosip-card">
            <h3 className="text-xl font-semibold mb-4">Coming Soon</h3>
            <p className="text-muted-foreground">
              This section is under development. Check back soon for our collection of educational resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
