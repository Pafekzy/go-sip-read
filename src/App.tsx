
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
import Mindfulness from "./pages/Mindfulness";
import BreathSync from "./pages/mindfulness/BreathSync";
import MindNumber from "./pages/mindfulness/MindNumber";
import Feedback from "./pages/Feedback";
import Upgrade from "./pages/Upgrade";

// Create a client
const queryClient = new QueryClient();

// Layout wrapper component that adds Footer except for specific pages
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isUpgradePage = location.pathname === "/upgrade";
  
  return (
    <>
      {children}
      {!isUpgradePage && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route element={<Layout><Index /></Layout>} path="/" />
                <Route element={<Layout><Register /></Layout>} path="/register" />
                <Route element={<Layout><Dashboard /></Layout>} path="/dashboard" />
                <Route element={<Layout><Books /></Layout>} path="/books" />
                <Route element={<Layout><EarlyLearning /></Layout>} path="/early-learning" />
                <Route element={<Layout><Podcasts /></Layout>} path="/podcasts" />
                <Route element={<Layout><Videos /></Layout>} path="/videos" />
                <Route element={<Layout><AiAssistant /></Layout>} path="/ai-assistant" />
                <Route element={<Layout><Achievements /></Layout>} path="/achievements" />
                <Route element={<Layout><Groups /></Layout>} path="/groups" />
                <Route element={<Layout><Mindfulness /></Layout>} path="/mindfulness" />
                <Route element={<Layout><BreathSync /></Layout>} path="/mindfulness/breathsync" />
                <Route element={<Layout><MindNumber /></Layout>} path="/mindfulness/mindnumber" />
                <Route element={<Layout><Feedback /></Layout>} path="/feedback" />
                <Route path="/upgrade" element={<Upgrade />} />
                <Route element={<Layout><NotFound /></Layout>} path="*" />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
