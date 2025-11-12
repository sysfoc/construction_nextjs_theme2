"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function QuoteSection() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    details: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/book-service/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert("Booking submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          date: "",
          details: "",
        });
      } else {
        alert(`${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Server error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Banner Card */}
        <div className="relative bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 mb-6 overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 sm:opacity-90 opacity-50">
            <Image
              src="/worker_01.jpg"
              alt="Worker"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full mb-3">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-[10px] font-bold uppercase">Professional Service</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Schedule Your Service Today</h2>
            <p className="text-white/90 text-xs sm:text-sm">Get expert consultation tailored to your project needs</p>
          </div>
        </div>

        {/* Form and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Left: Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-header-background rounded-xl p-4 border-l-4 border-primary">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-paragraph mb-1">Fast Response</h3>
                  <p className="text-xs text-paragraph/70">Get reply within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="bg-header-background rounded-xl p-4 border-l-4 border-primary">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-paragraph mb-1">Expert Team</h3>
                  <p className="text-xs text-paragraph/70">Licensed professionals</p>
                </div>
              </div>
            </div>

            <div className="bg-header-background rounded-xl p-4 border-l-4 border-primary">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-paragraph mb-1">Free Quote</h3>
                  <p className="text-xs text-paragraph/70">No obligation estimate</p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="hidden lg:block relative h-40 rounded-xl overflow-hidden">
              <Image
                src="/gallery/infrastructure-6.jpg"
                alt="Construction"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-2 bg-header-background rounded-xl p-5 border border-border shadow-lg">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-paragraph mb-1">Book Appointment</h3>
              <p className="text-xs text-paragraph/70">Fill the form and we'll contact you</p>
            </div>

            <div className="space-y-5">
              <input
                id="name"
                type="text"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-border bg-background px-4 py-3 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-paragraph"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-border bg-background px-4 py-3 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-paragraph"
                />
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-border bg-background px-4 py-3 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-paragraph"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  id="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full border border-border bg-background px-4 py-3 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-paragraph"
                >
                  <option value="">Select Service</option>
                  <option>Residential Construction</option>
                  <option>Commercial Renovation</option>
                  <option>Site Inspection</option>
                  <option>Material Supply</option>
                  <option>Custom Project</option>
                </select>
                <input
                  id="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-border bg-background px-4 py-3 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-paragraph"
                />
              </div>

              <input
                id="details"
                type="text"
                required
                placeholder="Project Details"
                value={formData.details}
                onChange={handleChange}
                className="w-full border border-border bg-background px-4 py-3 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-paragraph"
              />

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-primary text-primary-foreground px-4 py-3 font-bold text-sm rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Book Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}