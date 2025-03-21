
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
  // Remove all Lovable branding when the app loads
  useEffect(() => {
    // Check URL parameters for forceHideBadge
    const urlParams = new URLSearchParams(window.location.search);
    const forceHideBadge = urlParams.get('forceHideBadge');
    
    // Always remove Lovable branding, regardless of URL parameter
    const removeLovableBranding = () => {
      // Remove badge
      const badge = document.querySelector('[data-lovable-badge]');
      if (badge) {
        badge.remove();
      }
      
      // Remove any other elements with Lovable class or attribute
      const lovableElements = document.querySelectorAll('[class*="lovable"], [data-lovable]');
      lovableElements.forEach(element => {
        element.remove();
      });
    };
    
    // Execute immediately
    removeLovableBranding();
    
    // Also set up an observer to remove any dynamically added Lovable elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        removeLovableBranding();
      });
    });
    
    observer.observe(document.body, { 
      childList: true,
      subtree: true
    });
    
    return () => {
      observer.disconnect();
    };
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
