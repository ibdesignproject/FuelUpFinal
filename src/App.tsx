
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Options from "./pages/Options";
import Profile from "./pages/Profile";
import MealGenerator from "./pages/MealGenerator";
import MealBrowsing from "./pages/MealBrowsing";
import Nutrition from "./pages/Nutrition";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/options" element={<Options />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<MealGenerator />} />
          <Route path="/browse" element={<MealBrowsing />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
