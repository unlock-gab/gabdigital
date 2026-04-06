import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem("admin_credentials");
    const credentials = stored
      ? (JSON.parse(stored) as { email: string; password: string })
      : { email: "admin@gabdigital.com", password: "admin123" };
    if (email === credentials.email && password === credentials.password) {
      localStorage.setItem("admin_authenticated", "true");
      setLocation("/admin");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4" dir="ltr">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950"></div>
      <Card className="w-full max-w-md relative z-10 bg-slate-900 border-slate-800 shadow-2xl">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="mb-4">
            <span className="text-3xl font-black text-white">
              GAB <span className="text-orange-500">Admin</span>
            </span>
          </div>
          <CardTitle className="text-2xl font-semibold text-white">Welcome back</CardTitle>
          <CardDescription className="text-slate-400">
            Sign in to your admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@gabdigital.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-orange-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-orange-500"
              />
            </div>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}