// app/quote/RequestQuote.tsx
"use client";

import { useState, useEffect } from "react";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";

export default function RequestQuote() {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("quote");
      setIsVisible(visible);
      if (!visible) {
        router.push("/not-found");
      }
    };
    checkVisibility();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/quote/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          details: "",
        });
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <section className="w-full max-w-2xl border border-gray-100 rounded-2xl shadow-md p-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-3">
            Request a Quote
          </h1>
          <p className="text-base">
            Fill out the form below, and our team will get back to you with a
            customized quote for your project.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleFormData}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="details" className="block text-sm font-medium mb-1">
              Project Details
            </label>
            <textarea
              id="details"
              required
              rows={5}
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              placeholder="Describe your project goals, requirements, and timeline..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-all"
          >
            Submit Request
          </button>
        </form>
      </section>
    </main>
  );
}
