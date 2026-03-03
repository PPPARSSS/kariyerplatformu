import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Progress from "./pages/Progress";
import Catalog from "./pages/Catalog";
import English from "./pages/English";
import Leadership from "./pages/Leadership";
import SoftSkills from "./pages/SoftSkills";
import Intern from "./pages/Intern";
import Corporate from "./pages/Corporate";
import Onboarding from "./pages/Onboarding";
import Community from "./pages/Community";
import Competitions from "./pages/Competitions";
import Teammates from "./pages/Teammates";
import Organization from "./pages/Organization";
import Films from "./pages/Films";
import News from "./pages/News";
import Articles from "./pages/Articles";
import HrAnalytics from "./pages/HrAnalytics";
import CareerMap from "./pages/CareerMap";
import CareerPathEditor from "./pages/CareerPathEditor";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import AdminUsers from "./pages/AdminUsers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/catalog" element={<ProtectedRoute><Catalog /></ProtectedRoute>} />
            <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
            <Route path="/skill-tree" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
            <Route path="/career-map" element={<ProtectedRoute><CareerMap /></ProtectedRoute>} />
            <Route path="/english" element={<ProtectedRoute><English /></ProtectedRoute>} />
            <Route path="/leadership" element={<ProtectedRoute><Leadership /></ProtectedRoute>} />
            <Route path="/soft-skills" element={<ProtectedRoute><SoftSkills /></ProtectedRoute>} />
            <Route path="/intern" element={<ProtectedRoute><Intern /></ProtectedRoute>} />
            <Route path="/corporate" element={<ProtectedRoute><Corporate /></ProtectedRoute>} />
            <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
            <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
            <Route path="/competitions" element={<ProtectedRoute><Competitions /></ProtectedRoute>} />
            <Route path="/teammates" element={<ProtectedRoute><Teammates /></ProtectedRoute>} />
            <Route path="/organization" element={<ProtectedRoute><Organization /></ProtectedRoute>} />
            <Route path="/films" element={<ProtectedRoute><Films /></ProtectedRoute>} />
            <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
            <Route path="/articles" element={<ProtectedRoute><Articles /></ProtectedRoute>} />
            <Route path="/hr-analytics" element={<ProtectedRoute requiredRole="yonetici"><HrAnalytics /></ProtectedRoute>} />
            <Route path="/career-path-editor" element={<ProtectedRoute requiredRole="yonetici"><CareerPathEditor /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute requiredRole="ust_yonetici"><AdminUsers /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
