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
    <main className="min-h-screen flex items-center justify-center px-6">
      <section className="max-w-md w-full border border-gray-100 rounded-2xl shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold mb-3 text-primary">
          {mode === "subscribe" ? "Subscribe to Newsletter" : "Unsubscribe"}
        </h1>
        <p className="mb-8">
          {mode === "subscribe"
            ? "Enter your email to stay updated. A confirmation link will be sent to your inbox."
            : "Enter your email to unsubscribe from our mailing list."}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all"
          >
            {mode === "subscribe" ? "Subscribe" : "Unsubscribe"}
          </button>
        </form>
        <div className="mt-6 text-sm">
          {mode === "subscribe" ? (
            <>
              Want to unsubscribe?{" "}
              <button
                onClick={() => setMode("unsubscribe")}
                className="text-primary font-medium hover:underline"
              >
                Click here
              </button>
            </>
          ) : (
            <>
              Want to subscribe again?{" "}
              <button
                onClick={() => setMode("subscribe")}
                className="text-primary font-medium hover:underline"
              >
                Click here
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
