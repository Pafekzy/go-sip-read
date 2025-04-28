
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Books from "./pages/Books";
import EarlyLearning from "./pages/EarlyLearning";
import Podcasts from "./pages/Podcasts";
import Videos from "./pages/Videos";
import AiAssistant from "./pages/AiAssistant";
import Achievements from "./pages/Achievements";
import Groups from "./pages/Groups";
import Register from "./pages/Register";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/books" element={<Books />} />
                <Route path="/early-learning" element={<EarlyLearning />} />
                <Route path="/podcasts" element={<Podcasts />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/ai-assistant" element={<AiAssistant />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
