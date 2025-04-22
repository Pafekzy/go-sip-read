
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AiAssistant() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <MessageCircle className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-6 gosip-gradient-text">AI Learning Assistant</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Get personalized learning recommendations and answers to your questions with our AI assistant.
        </p>
        
        <div className="grid gap-6">
          <div className="gosip-card p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Personal AI Mentor</h2>
            <p className="text-muted-foreground mb-4">
              Choose your AI mentor persona and get customized guidance for your learning journey.
            </p>
            <Button className="bg-gosip-purple hover:bg-gosip-purple-dark">
              Chat with AI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
