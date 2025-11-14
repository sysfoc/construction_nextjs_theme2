// app/newsletter/Newsletter.tsx
"use client";

import { useState, useEffect } from "react";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";

export default function Newsletter() {
  const [mode, setMode] = useState<"subscribe" | "unsubscribe">("subscribe");
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("newsletter");
      setIsVisible(visible);
      if (!visible) {
        router.push("/not-found");
      }
    };
    checkVisibility();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "subscribe") {
      try {
        const response = await fetch("/api/subscribers/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email.trim() }),
        });
        const data = await response.json();
        if (response.ok) {
          setEmail("");
          alert(data.message);
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error("Error subscribing to newsletter:", error);
      }
    } else {
      try {
        const response = await fetch("/api/subscribers/unsubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email.trim() }),
        });
        const data = await response.json();
        if (response.ok) {
          setEmail("");
          alert(data.message);
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error("Error subscribing to newsletter:", error);
      }
    }
  };

  if (!isVisible) {
    return null;
  }

 return (
  <main className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <section className="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8">
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">
          {mode === "subscribe" ? "Subscribe to our Newsletter" : "Unsubscribe"}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {mode === "subscribe"
            ? "Stay updated with our latest news and exclusive updates."
            : "We're sorry to see you go. You can unsubscribe below."}
        </p>
      </div>

      {/* Toggle Buttons */}
      <div className="grid grid-cols-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-8">
        <button
          onClick={() => setMode("subscribe")}
          className={`py-2 rounded-lg font-semibold text-sm transition-all ${
            mode === "subscribe"
              ? "bg-primary text-white shadow"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          Subscribe
        </button>
        <button
          onClick={() => setMode("unsubscribe")}
          className={`py-2 rounded-lg font-semibold text-sm transition-all ${
            mode === "unsubscribe"
              ? "bg-primary text-white shadow"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          Unsubscribe
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="text-left">
          <label className="text-xs uppercase font-semibold text-gray-700 dark:text-gray-300 tracking-wide">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2"
        >
          {mode === "subscribe" ? "Subscribe" : "Unsubscribe"}
        </button>
      </form>
    </section>
  </main>
);
}