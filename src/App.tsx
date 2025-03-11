
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Introduction from "./pages/Introduction";
import Development from "./pages/Development";
import DangerSigns from "./pages/DangerSigns";
import Lifestyle from "./pages/Lifestyle";
import Malaria from "./pages/Malaria";
import BirthPrep from "./pages/BirthPrep";
import Nutrition from "./pages/Nutrition";
import NotFound from "./pages/NotFound";
import Summary from "./pages/Summary";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Hide Lovable badge when sharing
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const forceHideBadge = urlParams.get('forceHideBadge');
    
    if (forceHideBadge === 'true') {
      const badge = document.querySelector('[data-lovable-badge]');
      if (badge) {
        badge.remove();
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/intro" element={<Introduction />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/development" element={<Development />} />
            <Route path="/danger-signs" element={<DangerSigns />} />
            <Route path="/lifestyle" element={<Lifestyle />} />
            <Route path="/malaria" element={<Malaria />} />
            <Route path="/birth-prep" element={<BirthPrep />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
