
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { inspiringQuotes } from "@/utils/quotes";

interface QuoteCardProps {
  text?: string;
  author?: string;
  autoTransition?: boolean;
  transitionTime?: number;
}

export function QuoteCard({ 
  text, 
  author, 
  autoTransition = true, 
  transitionTime = 11000 
}: QuoteCardProps) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Use provided quote if available, otherwise use from collection
  const quotes = text && author ? [{ text, author }] : inspiringQuotes;
  const currentQuote = quotes[currentQuoteIndex];
  
  useEffect(() => {
    if (!autoTransition || quotes.length <= 1) return;
    
    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      
      // Change quote after fade-out animation completes
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setIsTransitioning(false);
      }, 500); // 500ms for fade-out animation
      
    }, transitionTime);
    
    return () => clearInterval(intervalId);
  }, [autoTransition, quotes.length, transitionTime]);
  
  return (
    <Card className="bg-gradient-to-br from-gosip-purple/10 to-gosip-purple-dark/10 border-0">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <Quote className="h-6 w-6 text-gosip-purple-dark opacity-70" />
          <p 
            className={`text-lg font-medium italic transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          >
            {currentQuote.text}
          </p>
          <p 
            className={`text-right text-sm text-muted-foreground transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          >
            — {currentQuote.author}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
