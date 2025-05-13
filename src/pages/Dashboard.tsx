
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { ProgressStats } from "@/components/dashboard/ProgressStats";
import { ContentCard } from "@/components/dashboard/ContentCard";
import { QuoteCard } from "@/components/dashboard/QuoteCard";
import { AiChatCard } from "@/components/dashboard/AiChatCard";
import { ChevronLeft, ChevronRight, Home, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { RippleButton } from "@/components/ui/ripple-button";

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
    title: "The Science Of Conversation",
    author: "StanK Pod Cast",
    type: "podcast" as const,
    progress: 0,
    image: "/lovable-uploads/ced40444-1214-42e9-b13f-a7595b7b6f5d.png",
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

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleUpgrade = () => {
    navigate('/upgrade');
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
            <div className="flex items-center gap-2">
              <RippleButton 
                onClick={handleUpgrade}
                className="bg-gosip-purple-dark hover:bg-gosip-purple-darker shadow-lg hover:shadow-xl animate-pulse"
              >
                <Gift className="mr-1 h-4 w-4" /> Upgrade 🎁
              </RippleButton>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden md:flex"
              >
                {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <ProgressStats />
            </div>
            <div>
              <QuoteCard autoTransition={true} transitionTime={11000} />
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
