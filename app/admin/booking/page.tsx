'use client';

import { useEffect, useState } from "react";
import { Calendar, Mail, Phone, Eye, X, ClipboardList } from "lucide-react";

interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  details: string;
  createdAt: string;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/book-service/get");
        const data = await res.json();
        if (data.success) setBookings(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <main className="min-h-screen px-6 py-10 bg-background transition-colors duration-300">
      <section className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#ff6600] mb-2 uppercase tracking-tight">
            Booking Requests
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage all service booking requests submitted by users.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#ff6600]" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-300 py-20 text-lg">
            No booking requests yet.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-2xl">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-[#ff6600]/10 text-[#ff6600] uppercase text-sm">
                  <th className="py-3 px-4 text-left">Client</th>
                  <th className="py-3 px-4 text-left">Contact</th>
                  <th className="py-3 px-4 text-left">Service</th>
                  <th className="py-3 px-4 text-left">Preferred Date</th>
                  <th className="py-3 px-4 text-left">Details</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className="border-t bg-background"
                  >
                    <td className="py-4 px-4 font-medium text-gray-700">
                      {booking.name}
                      <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                        {new Date(booking.createdAt).toLocaleString()}
                      </p>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-200">
                      <div className="flex flex-col gap-1">
                        <p className="flex items-center gap-1">
                          <Mail size={14} className="text-[#ff6600]" /> {booking.email}
                        </p>
                        <p className="flex items-center gap-1">
                          <Phone size={14} className="text-[#ff6600]" /> {booking.phone}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700 dark:text-white">
                      {booking.service}
                    </td>
                    <td className="py-4 px-4 flex items-center gap-2 text-gray-700 dark:text-gray-200">
                      <Calendar size={16} className="text-[#ff6600]" />
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-200 max-w-xs truncate">
                      {booking.details.length > 80
                        ? booking.details.slice(0, 80) + "..."
                        : booking.details}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="inline-flex items-center justify-center rounded-full p-2 hover:bg-[#ff6600]/10 dark:hover:bg-[#ff6600]/20 transition"
                        title="View Details"
                      >
                        <Eye size={18} className="text-[#ff6600]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      {selectedBooking && (
        <div className="fixed inset-0 bg-background backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-background border border-gray-300 rounded-2xl shadow-lg max-w-lg w-full p-6 relative animate-in fade-in duration-300">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <X size={20} className="text-gray-600 dark:text-gray-300" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <ClipboardList className="text-[#ff6600]" />
              <h2 className="text-2xl font-bold text-[#ff6600]">Booking Details</h2>
            </div>

            <div className="space-y-3 text-gray-700 dark:text-gray-200">
              <p>
                <span className="font-semibold">Client:</span> {selectedBooking.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {selectedBooking.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {selectedBooking.phone}
              </p>
              <p>
                <span className="font-semibold">Service Type:</span> {selectedBooking.service}
              </p>
              <p>
                <span className="font-semibold">Preferred Date:</span>{" "}
                {new Date(selectedBooking.date).toLocaleDateString()}
              </p>
              <div>
                <p className="font-semibold mb-1">Project Details:</p>
                <p className=" rounded-lg p-3 text-sm">
                  {selectedBooking.details}
                </p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                Submitted on {new Date(selectedBooking.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
