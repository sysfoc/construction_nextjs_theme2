"use client";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: "text-red-600",
          button: "bg-red-600 hover:bg-red-700 text-white",
        };
      case "warning":
        return {
          icon: "text-yellow-600",
          button: "bg-yellow-600 hover:bg-yellow-700 text-white",
        };
      case "info":
        return {
          icon: "text-blue-600",
          button: "bg-blue-600 hover:bg-blue-700 text-white",
        };
      default:
        return {
          icon: "text-red-600",
          button: "bg-red-600 hover:bg-red-700 text-white",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-opacity-20"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`${styles.icon}`}>
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5">
          <p className="text-sm sm:text-base text-gray-600">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 p-4 sm:p-5 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 dark:bg-gray-900 transition-colors text-sm sm:text-base font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`w-full sm:w-auto px-4 py-2 rounded transition-colors text-sm sm:text-base font-medium ${styles.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}