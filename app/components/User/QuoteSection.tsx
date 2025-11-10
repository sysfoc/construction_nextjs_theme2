"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronsDown } from "lucide-react";

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
    <div className="relative w-full h-auto">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[400px] sm:h-[500px] overflow-hidden">
        <Image
          src="/worker_01.jpg"
          alt="Worker at Construction Site"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        
        {/* Hero Text */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 sm:px-12 max-w-6xl">
            <div className="max-w-2xl space-y-3">
              <div className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full mb-2">
                <span className="text-primary text-xs font-bold uppercase tracking-wide">
                  Professional Service
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Schedule Your Service Today
              </h2>
              <p className="text-white/90 text-sm sm:text-base max-w-xl">
                Receive personalized consultation and professional support tailored to your project needs.
              </p>
              <div className="flex items-center gap-2 text-primary text-xs sm:text-sm font-bold pt-2">
                <span>SCROLL TO BOOK</span>
                <ChevronsDown className="w-4 h-4 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative bg-background py-8 sm:py-12">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            
            {/* Left Side - Image & Info */}
            <div className="hidden lg:flex flex-col justify-center space-y-4">
              <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/quote_01.jpg"
                  alt="Construction Equipment"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Info Cards Overlay */}
                <div className="absolute bottom-6 left-6 right-6 space-y-3">
                  <div className="bg-background backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-paragraph">Fast Response</p>
                        <p className="text-xs text-paragraph/70">Within 24 hours</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-background backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-paragraph">Expert Team</p>
                        <p className="text-xs text-paragraph/70">Licensed professionals</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-background border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 sm:p-6">
              <div className="mb-4">
                <h3 className="text-lg sm:text-2xl font-bold text-paragraph mb-1">Book Your Appointment</h3>
                <p className="text-sm text-paragraph/70">Fill out the form below and we'll get back to you soon</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-paragraph text-sm font-semibold mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:focus:border-gray-400 rounded"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="email" className="block text-paragraph dark:text-gray-200 text-sm font-semibold mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:focus:border-gray-400 rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-paragraph dark:text-gray-200 text-sm font-semibold mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:focus:border-gray-400 rounded"
                    />
                  </div>
                </div>

                {/* Service Type & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="service" className="block text-paragraph dark:text-gray-200 text-sm font-semibold mb-1">
                      Service Type
                    </label>
                    <select
                      id="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:focus:border-gray-400 rounded"
                    >
                      <option value="">Select a service</option>
                      <option>Residential Construction</option>
                      <option>Commercial Renovation</option>
                      <option>Site Inspection</option>
                      <option>Material Supply</option>
                      <option>Custom Project</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-paragraph text-sm font-semibold mb-1">
                      Preferred Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:focus:border-gray-400 rounded"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label htmlFor="details" className="block text-paragraph text-sm font-semibold mb-1">
                    Project Details
                  </label>
                  <input
                    id="details"
                    type="text"
                    required
                    placeholder="Describe your project..."
                    value={formData.details}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:focus:border-gray-400 rounded"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary rounded-md dark:bg-primary text-primary-foreground px-4 py-3 font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Book Appointment Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}