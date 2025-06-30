
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MealPlanning from "./pages/MealPlanning";
import NotFound from "./pages/NotFound";
import WelcomeScreen from "./components/WelcomeScreen";

const queryClient = new QueryClient();

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem('gym-buddy-visited');
    if (visited) {
      setShowWelcome(false);
      setHasVisited(true);
    }
  }, []);

  const handleStartApp = () => {
    localStorage.setItem('gym-buddy-visited', 'true');
    setShowWelcome(false);
    setHasVisited(true);
  };

  if (showWelcome && !hasVisited) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WelcomeScreen onStart={handleStartApp} />
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/meals" element={<MealPlanning />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
