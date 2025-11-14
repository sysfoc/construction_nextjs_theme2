// app/login/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { KeyIcon, LogIn, Mail, Lock, Info, Zap } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/admin/dashboard");
    } else {
      setError(data.error || "Login failed");
    }

    setLoading(false);
  };

  const handleAutofill = () => {
    setEmail("admin@example.com");
    setPassword("admin123");
  };

  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Left Sidebar - Demo Credentials */}
      <div className="w-80 bg-primary flex-shrink-0 p-8 flex-col justify-center gap-3 shadow-2xl relative overflow-hidden hidden lg:flex">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
              <KeyIcon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-black text-white mb-2">Admin Portal</h2>
            <p className="text-white/80 text-sm">Quick access to your dashboard</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-white" />
                <h3 className="text-sm font-bold text-white">Demo Credentials</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-white/60 text-xs mb-1">Email</p>
                  <p className="text-white font-mono text-xs bg-white/10 px-2 py-1.5 rounded">admin@example.com</p>
                </div>
                <div>
                  <p className="text-white/60 text-xs mb-1">Password</p>
                  <p className="text-white font-mono text-xs bg-white/10 px-2 py-1.5 rounded">admin123</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAutofill}
              className="w-full bg-white text-primary px-4 py-3 rounded-lg font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Zap className="w-4 h-4" />
              Quick Fill
            </button>
          </div>
        </div>

        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-white/80 text-xs leading-relaxed">
              Click <strong>Quick Fill</strong> to autofill credentials, then <strong>Sign In</strong> to access the admin dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Centered Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[url('/gallery/commercial-7.jpg')] bg-cover bg-center relative">
        {/* <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-sm"></div> */}
        
        <div className="w-full max-w-md relative z-10">
          {/* Mobile Demo Credentials */}
          <div className="lg:hidden bg-primary/95 backdrop-blur-sm rounded-xl p-6 mb-6 border border-primary">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-white" />
              <h3 className="text-base font-bold text-white">Demo Access</h3>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Email:</span>
                <span className="text-white font-mono text-xs">admin@example.com</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Password:</span>
                <span className="text-white font-mono text-xs">admin123</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAutofill}
              className="w-full bg-white text-primary px-4 py-2.5 rounded-lg font-bold hover:bg-white/90 transition-all text-sm"
            >
              Quick Fill Credentials
            </button>
          </div>

          {/* Login Card */}
          <div className="bg-background rounded-2xl shadow-2xl p-7 border border-border">
            <div className="text-center mb-5">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-4">
                <LogIn className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-3xl font-black text-header-text mb-2">Welcome Back</h1>
              <p className="text-sm text-paragraph">Sign in to access your admin dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-paragraph mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Mail className="w-5 h-5 text-paragraph/40" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-all text-paragraph placeholder:text-paragraph/40"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-paragraph mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Lock className="w-5 h-5 text-paragraph/40" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-all text-paragraph placeholder:text-paragraph/40"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 font-bold text-lg">!</span>
                    </div>
                    <p className="text-red-700 text-sm font-semibold">{error}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In to Dashboard</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-center gap-2 text-xs text-paragraph/60">
                <KeyIcon className="w-3.5 h-3.5" />
                <span>Protected by industry-standard security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}