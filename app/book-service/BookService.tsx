// app/book-service/BookService.tsx
"use client";
import { useEffect, useState } from "react";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";

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
    <main className='min-h-screen px-6 py-16 flex items-center justify-center'>
      <section className='max-w-3xl w-full border border-gray-100 rounded-2xl shadow-md p-10'>
        <div className='text-center mb-10'>
          <h1 className='text-4xl font-extrabold text-primary mb-3 tracking-tight uppercase'>
            Book a Service
          </h1>
          <p className='text-base max-w-lg mx-auto'>
            Schedule your construction or renovation service with our expert
            team.
          </p>
        </div>

        <form className='grid md:grid-cols-2 gap-6' onSubmit={handleSubmit}>
          {[
            {
              id: "name",
              label: "Full Name",
              type: "text",
              placeholder: "John Doe",
            },
            {
              id: "email",
              label: "Email Address",
              type: "email",
              placeholder: "john@example.com",
            },
            {
              id: "phone",
              label: "Phone Number",
              type: "tel",
              placeholder: "+92 300 1234567",
            },
          ].map((field) => (
            <div key={field.id} className='col-span-2 md:col-span-1'>
              <label
                htmlFor={field.id}
                className='block text-sm font-medium mb-1'
              >
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                required
                placeholder={field.placeholder}
                value={formData[field.id as keyof typeof formData]}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary'
              />
            </div>
          ))}

          <div className='col-span-2 md:col-span-1'>
            <label htmlFor='service' className='block text-sm font-medium mb-1'>
              Service Type
            </label>
            <select
              id='service'
              required
              value={formData.service}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary'
            >
              <option value=''>Select a service</option>
              <option>Residential Construction</option>
              <option>Commercial Renovation</option>
              <option>Site Inspection</option>
              <option>Material Supply</option>
              <option>Custom Project</option>
            </select>
          </div>

          <div className='col-span-2 md:col-span-1'>
            <label htmlFor='date' className='block text-sm font-medium mb-1'>
              Preferred Date
            </label>
            <input
              id='date'
              type='date'
              required
              value={formData.date}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary'
            />
          </div>

          <div className='col-span-2'>
            <label htmlFor='details' className='block text-sm font-medium mb-1'>
              Project Details
            </label>
            <textarea
              id='details'
              rows={5}
              required
              value={formData.details}
              onChange={handleChange}
              placeholder='Describe your project, location, and any specific requirements...'
              className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary'
            ></textarea>
          </div>

          <div className='col-span-2'>
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-primary text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all uppercase tracking-wide'
            >
              {loading ? "Submitting..." : "Book Appointment"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
