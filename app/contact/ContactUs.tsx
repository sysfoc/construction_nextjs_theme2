"use client";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
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
    <main className="min-h-screen bg-background py-10">
      {/* Hero Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full mb-3">
          <Mail className="w-3.5 h-3.5 text-primary" />
          <span className="text-primary text-[10px] font-bold uppercase tracking-wide">
            Get In Touch
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
          Contact Us
        </h1>
        <p className="text-xs sm:text-sm text-paragraph max-w-2xl">
          We'd love to hear from you. Reach out using the form or the details
          below.
        </p>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* left Column - Form */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border-1 border-border shadow-lg overflow-hidden bg-background">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-primary to-primary/90 p-5">
                <h2 className="text-xl font-extrabold text-primary-foreground flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  SEND US A MESSAGE
                </h2>
                <p className="text-primary-foreground/90 text-xs mt-1">
                  Fill out the form below and we'll get back to you shortly
                </p>
              </div>

              {/* Form Body */}
              <div className="p-6 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-bold mb-2 text-foreground uppercase tracking-wide"
                    >
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border-1 border-border placeholder:text-paragraph/50 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary transition-all text-sm"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold mb-2 text-foreground uppercase tracking-wide"
                    >
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border-1 border-border placeholder:text-paragraph/50 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary transition-all text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold mb-2 text-foreground uppercase tracking-wide"
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
                    className="w-full border-1 border-border placeholder:text-paragraph/50 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary transition-all resize-none text-sm"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-paragraph">
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
                    className="bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm uppercase tracking-wide"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Info Banner */}
            <div className="mt-6 bg-primary/10 border-1 border-primary/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-paragraph">
                    <span className="font-bold text-foreground">
                      Office Hours:
                    </span>{" "}
                    {settings?.officeHours}
                  </p>
                  <p className="text-xs text-paragraph mt-1">
                    <span className="font-bold text-foreground">
                      Response Time:
                    </span>{" "}
                    Within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* right Column - Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-base font-bold text-foreground mb-4 uppercase tracking-wide">
              Contact Information
            </h2>

            {/* Address Card */}
            <div className="bg-background p-4 rounded-xl border-1 border-border hover:border-primary hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1 text-foreground uppercase">
                    Address
                  </h3>
                  <p className="text-xs text-primary">{settings?.address}</p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-background p-4 rounded-xl border-1 border-border hover:border-primary hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1 text-foreground uppercase">
                    Phone
                  </h3>
                  <a
                    href={`tel:${settings?.phone}`}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    {settings?.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-background p-4 rounded-xl border-1 border-border hover:border-primary hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1 text-foreground uppercase">
                    Email
                  </h3>
                  <a
                    href={`mailto:${settings?.email}`}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    {settings?.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border-1 border-border shadow-lg mt-6">
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
        </div>
      </section>
    </main>
  );
}
