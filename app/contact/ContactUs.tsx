"use client";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useGeneralSettings } from "@/app/context/GeneralSettingsContext";

export default function ContactUs() {
  const [isVisible, setIsVisible] = useState(true);
  const { settings } = useGeneralSettings();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = true;
      setIsVisible(visible);
    };
    checkVisibility();
  }, []);

  if (!isVisible) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact/add", {
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
          message: "",
        });
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Header */}
      <div className="bg-primary/5 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-3">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Reach out using the form or the details
            below.
          </p>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Get In Touch
            </h2>

            {/* Address Card */}
            <div className=" p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Address</h3>
                  <p className="text-sm text-primary">{settings?.address}</p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Phone</h3>
                  <a
                    href="tel:+923001234567"
                    className="text-sm text-primary hover:underline"
                  >
                    {settings?.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Email</h3>
                  <a
                    href="mailto:info@example.com"
                    className="text-sm text-primary hover:underline"
                  >
                    {settings?.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2065.6338946423252!2d73.12149629438385!3d30.67215066416969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1762511982793!5m2!1sen!2s"
                width="100%"
                height="250"
                allowFullScreen
                loading="lazy"
                className="w-full"
              ></iframe>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-gray-200 shadow-md overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-primary to-primary/90 p-6">
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <Send className="w-6 h-6" />
                  Send Us a Message
                </h2>
                <p className="text-white/90 text-sm mt-1">
                  Fill out the form below and we'll get back to you shortly
                </p>
              </div>

              {/* Form Body */}
              <div className="p-6 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-paragraph"
                    >
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border placeholder:text-paragraph/50 border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-paragraph"
                    >
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border placeholder:text-paragraph/50 border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-paragraph"
                  >
                    Your Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={6}
                    className="w-full border placeholder:text-paragraph/50 border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-gray-500">
                    <span className="text-primary">*</span> Required fields
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      const form =
                        e.currentTarget.closest(".space-y-5")?.parentElement;
                      const formElement = document.createElement("form");
                      formElement.style.display = "none";
                      const submitEvent = new Event("submit", {
                        bubbles: true,
                        cancelable: true,
                      });
                      Object.defineProperty(submitEvent, "target", {
                        value: formElement,
                        writable: false,
                      });
                      handleFormData(submitEvent as any);
                    }}
                    className="bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Info Banner */}
            <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-paragraph/80">
                <strong>Office Hours:</strong> {settings?.officeHours} |
                <strong> Response Time:</strong> Within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
