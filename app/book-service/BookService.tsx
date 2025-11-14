// app/book-service/BookService.tsx
"use client";
import { useEffect, useState } from "react";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";
import { Award, Shield, Star } from "lucide-react";


export default function BookService() {
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    details: "",
  });

  const router = useRouter();

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("book-service");
      setIsVisible(visible);
      if (!visible) router.push("/not-found");
    };
    checkVisibility();
  }, [router]);

  if (!isVisible) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
    <main className="min-h-screen flex flex-col items-center px-6 py-20">

      {/* PAGE HEADING OUTSIDE */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-extrabold text-primary tracking-tight uppercase mb-3">
          Book a Service
        </h1>
        <p className="text-base max-w-2xl mx-auto">
          Secure your construction, renovation, or inspection appointment with our expert team.
        </p>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="w-full max-w-5xl grid lg:grid-cols-3 gap-10">

        {/* SIDEBAR WITH IMAGE */}
        <aside className="lg:col-span-1 bg-background border border-gray-100 shadow-md rounded-2xl p-0 overflow-hidden flex flex-col">

          {/* Sidebar Image */}
          <div className="w-full h-56 overflow-hidden rounded-t-2xl">
            <img
              src="/gallery/infrastructure-6.jpg"
              alt="Service"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6 mt-6">
  <div className="flex items-start gap-4 p-4">
    <div className="p-3 bg-primary text-primary-foreground rounded-xl">
      <Shield className="w-6 h-6" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-primary">Strong & Reliable Services</h3>
      <p className="text-paragraph text-sm">
        We deliver high-quality construction work backed by trusted professionals.
      </p>
    </div>
  </div>

  <div className="flex items-start gap-4 p-4">
    <div className="p-3 bg-primary text-primary-foreground rounded-xl">
      <Award className="w-6 h-6" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-primary">Experienced Professionals</h3>
      <p className="text-paragraph text-sm">
        Work done by a trained and certified workforce.
      </p>
    </div>
  </div>

  <div className="flex items-start gap-4 p-4">
    <div className="p-3 bg-primary text-primary-foreground rounded-xl">
      <Star className="w-6 h-6" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-primary">Quality Guaranteed</h3>
      <p className="text-paragraph text-sm">
        We ensure every service meets strict quality standards.
      </p>
    </div>
  </div>
</div>

        </aside>

        {/* FORM SECTION */}
        <section className="lg:col-span-2 bg-white border border-gray-100 shadow-md rounded-2xl p-10">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Inputs Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
                { id: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                { id: "phone", label: "Phone Number", type: "tel", placeholder: "+92 300 1234567" },
              ].map((field) => (
                <div key={field.id} className="flex flex-col">
                  <label htmlFor={field.id} className="text-sm font-medium mb-2">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              ))}

              {/* Service Dropdown */}
              <div className="flex flex-col">
                <label htmlFor="service" className="text-sm font-medium mb-2">
                  Service Type
                </label>
                <select
                  id="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a service</option>
                  <option>Residential Construction</option>
                  <option>Commercial Renovation</option>
                  <option>Site Inspection</option>
                  <option>Material Supply</option>
                  <option>Custom Project</option>
                </select>
              </div>

              {/* Date */}
              <div className="flex flex-col">
                <label htmlFor="date" className="text-sm font-medium mb-2">
                  Preferred Date
                </label>
                <input
                  id="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <label htmlFor="details" className="text-sm font-medium mb-2">
                Project Details
              </label>
              <textarea
                id="details"
                rows={5}
                required
                placeholder="Describe your project, location, and any specific requirements..."
                value={formData.details}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-semibold py-3 rounded-xl uppercase tracking-wide hover:opacity-90 transition-all"
            >
              {loading ? "Submitting..." : "Book Appointment"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
