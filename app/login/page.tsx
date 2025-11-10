// app/login/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { Key, KeyIcon, LogIn, User2 } from "lucide-react";
import User from "@/lib/models/User";

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
    <div className="min-h-screen w-full flex items-center justify-center bg-[url('/gallery/commercial-7.jpg')] bg-cover bg-center bg-no-repeat p-6">
      <div className="w-full max-w-4xl bg-background rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row-reverse">
          {/* Left Panel - Demo Credentials */}
          <div className="md:w-2/5 bg-primary p-8 flex flex-col justify-center text-white">
            <div className="mb-6">
              <div className="text-2xl flex items-center gap-2">
                <User2 className="w-6 h-6" />
                <h2 className="font-bold m-0">Welcome Back</h2>
              </div>
              <p className="text-orange-100 text-sm">
                Sign in to access your admin dashboard
              </p>
            </div>


             <div className="text-orange-100 text-xs mb-5">
              <ul className="list-disc list-inside space-y-1">
                <li>Click on button above to autofill fields.</li>
                <li>
                  Click on <strong>Sign In</strong> to access the dashboard.
                </li>
                <li>Discover the admin side.</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 mb-5 border border-white/20">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Demo Credentials
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-start">
                  <span className="text-orange-200 text-sm font-medium w-20">
                    Email:
                  </span>
                  <span className="text-white text-sm font-mono">
                    admin@example.com
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-orange-200 text-sm font-medium w-20">
                    Password:
                  </span>
                  <span className="text-white text-sm font-mono">admin123</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleAutofill}
                className="w-full px-4 py-2.5 bg-white text-primary rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg"
              >
                Quick Fill Credentials
              </button>
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className="md:w-3/5 p-8 md:p-10 text-paragraph">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl flex items-center gap-2 font-bold mb-2">
                  Admin Login
                  <KeyIcon className="text-primary" />
                </h1>
                <p>Enter your credentials to continue</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 placeholder-paragraph/50 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 placeholder-paragraph/50 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {error && (
                  <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                    <svg
                      className="w-5 h-5 text-red-500 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-red-700 text-sm font-medium">
                      {error}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] py-2.5 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 disabled:from-orange-300 disabled:to-orange-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign In to Dashboard"
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-gray-200">
                <p className="text-center text-sm text-gray-500">
                  Protected by industry-standard security
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
