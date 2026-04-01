import { Switch, Route, Router as WouterRouter } from "wouter";
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

const queryClient = new QueryClient();

function Router() {
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="flex flex-col min-h-[100dvh]">
            <Navbar />
            <main className="flex-grow pt-16">
              <Router />
            </main>
            <Footer />
            <FloatingWhatsApp />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
