import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

import Home from "@/pages/Home";
import Services from "@/pages/Services";
import OurWork from "@/pages/OurWork";
import DigitalProducts from "@/pages/DigitalProducts";
import Academy from "@/pages/Academy";
import About from "@/pages/About";
import StartProject from "@/pages/StartProject";
import Contact from "@/pages/Contact";

import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminServices from "@/pages/admin/AdminServices";
import AdminPortfolio from "@/pages/admin/AdminPortfolio";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminCourses from "@/pages/admin/AdminCourses";
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import AdminMessages from "@/pages/admin/AdminMessages";
import AdminProjectRequests from "@/pages/admin/AdminProjectRequests";
import AdminFAQ from "@/pages/admin/AdminFAQ";
import AdminSettings from "@/pages/admin/AdminSettings";

const queryClient = new QueryClient();

function PublicRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/our-work" component={OurWork} />
      <Route path="/digital-products" component={DigitalProducts} />
      <Route path="/academy" component={Academy} />
      <Route path="/about" component={About} />
      <Route path="/start-project" component={StartProject} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AdminRouter() {
  return (
    <Switch>
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/services" component={AdminServices} />
      <Route path="/admin/portfolio" component={AdminPortfolio} />
      <Route path="/admin/products" component={AdminProducts} />
      <Route path="/admin/courses" component={AdminCourses} />
      <Route path="/admin/testimonials" component={AdminTestimonials} />
      <Route path="/admin/messages" component={AdminMessages} />
      <Route path="/admin/project-requests" component={AdminProjectRequests} />
      <Route path="/admin/faq" component={AdminFAQ} />
      <Route path="/admin/settings" component={AdminSettings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  if (isAdminRoute) {
    return <AdminRouter />;
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-grow pt-16">
        <PublicRouter />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppContent />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
