
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { ProgressStats } from "@/components/dashboard/ProgressStats";
import { ContentCard } from "@/components/dashboard/ContentCard";
import { QuoteCard } from "@/components/dashboard/QuoteCard";
import { AiChatCard } from "@/components/dashboard/AiChatCard";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const recentContent = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    type: "book" as const,
    progress: 0,
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    title: "The Science of Learning",
    author: "Learning Lab",
    type: "podcast" as const,
    progress: 0,
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    title: "How to Learn Anything Fast",
    author: "Jim Kwik",
    type: "video" as const,
    progress: 0,
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    title: "Deep Work",
    author: "Cal Newport",
    type: "book" as const,
    progress: 0,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80",
  },
];

const quotes = [
  {
    text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss",
  },
  {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi",
  },
  {
    text: "The beautiful thing about learning is that nobody can take it away from you.",
    author: "B.B. King",
  },
];

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const navigate = useNavigate();

  const nextQuote = () => {
    setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const prevQuote = () => {
    setQuoteIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handleGoHome}
                className="shrink-0"
              >
                <Home className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold mb-1">Welcome back!</h1>
                <p className="text-muted-foreground">
                  Continue your learning journey
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden md:flex"
            >
              {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <ProgressStats />
            </div>
            <div className="relative">
              <QuoteCard 
                text={quotes[quoteIndex].text} 
                author={quotes[quoteIndex].author} 
              />
              <div className="absolute top-1/2 -left-3 transform -translate-y-1/2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full bg-background shadow-sm"
                  onClick={prevQuote}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute top-1/2 -right-3 transform -translate-y-1/2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full bg-background shadow-sm"
                  onClick={nextQuote}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Continue Learning</h2>
              <Button variant="link" className="text-gosip-purple">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentContent.map((item) => (
                <ContentCard key={item.id} {...item} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">AI Learning Assistant</h2>
            <AiChatCard />
          </div>
        </div>
      </div>
    </div>
  );
}
