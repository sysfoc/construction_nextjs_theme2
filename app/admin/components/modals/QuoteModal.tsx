'use client';
import { Mail, Phone, Calendar, X } from 'lucide-react';
import { useState } from 'react';

interface Quote {
  id: number;
  name: string;
  email: string;
  phone: string;
  projectDetails: string;
  status: 'Pending' | 'In Review' | 'Quoted' | 'Completed';
  response: string;
  date: string;
}

// Quote Modal Component
export default function QuoteModal({
  quote,
  onClose,
  onStatusChange,
  onResponseChange,
  statusOptions,
  statusColors,
}: {
  quote: Quote;
  onClose: () => void;
  onStatusChange: (id: number, status: Quote['status']) => void;
  onResponseChange: (id: number, response: string) => void;
  statusOptions: Quote['status'][];
  statusColors: Record<Quote['status'], string>;
}) {
  const [localResponse, setLocalResponse] = useState(quote.response);

  return (
    <div className="fixed inset-0 rounded-2xl flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-[var(--primary)] px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold text-[var(--primary-foreground)]">Quote Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="p-4 sm:p-5 space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-gray-900 mb-2.5 text-sm sm:text-base">{quote.name}</h3>
              <div className="space-y-1.5 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-3.5 h-3.5 text-[var(--primary)] flex-shrink-0" />
                  <span className="break-all font-medium">{quote.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-3.5 h-3.5 text-[var(--primary)] flex-shrink-0" />
                  <span className="font-medium">{quote.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-3.5 h-3.5 text-[var(--primary)] flex-shrink-0" />
                  <span>{quote.date}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                Status
              </label>
              <select
                value={quote.status}
                onChange={(e) => onStatusChange(quote.id, e.target.value as Quote['status'])}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 text-sm font-medium transition-colors"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                Project Details
              </label>
              <div className="bg-blue-50 border-l-4 p-3 sm:p-3.5 rounded-r-lg">
                <p className="text-xs sm:text-sm text-gray-900 leading-relaxed whitespace-pre-wrap break-words">
                  {quote.projectDetails}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                Response/Notes
              </label>
              <textarea
                value={localResponse}
                onChange={(e) => setLocalResponse(e.target.value)}
                rows={4}
                placeholder="Enter your response or notes here..."
                className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 resize-none text-xs sm:text-sm transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-5 sm:py-3.5 flex flex-col-reverse sm:flex-row justify-end gap-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onResponseChange(quote.id, localResponse);
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg font-medium shadow-sm hover:shadow-md transition-all text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}