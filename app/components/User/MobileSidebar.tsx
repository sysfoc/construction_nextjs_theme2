"use client";

import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavLink {
  name: string;
  href?: string;
  sublinks?: { name: string; href: string }[];
}

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  settings: {
    logo?: string | null;
    companyName?: string | null;
  } | null;
}

export default function MobileSidebar({
  isOpen,
  onClose,
  navLinks,
  settings,
}: MobileSidebarProps) {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const handleMobileDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 top-0 left-0 w-full h-full"
          onClick={onClose}
        ></div>
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={`
          lg:hidden fixed top-0 left-0 w-4/5 max-w-sm h-full bg-background z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          pt-8 pb-8 px-6 overflow-y-auto shadow-xl
        `}
      >
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div className="flex items-center gap-1 z-20">
            {settings?.logo && (
              <div className="w-10 h-10 lg:w-12 lg:h-12 relative">
                <Image
                  src={settings.logo}
                  alt="Company Logo"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span className="text-xl lg:text-2xl font-bold text-header-text">
              {settings?.companyName}
            </span>
          </div>
          <button
            className="p-2 rounded-md text-header-text"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col space-y-2">
          {navLinks.map((link, index) => (
            <div key={index} className="border-b border-border pb-2">
              {link.sublinks ? (
                <div>
                  <button
                    className="flex items-center justify-between w-full text-left text-header-text hover:text-primary font-medium py-3 text-base"
                    onClick={() => handleMobileDropdown(index)}
                  >
                    {link.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {activeDropdown === index && (
                    <div className="mt-1 ml-4 space-y-1">
                      {link.sublinks.map((sublink, subIndex) => (
                        <Link
                          key={subIndex}
                          href={sublink.href}
                          className="block py-2 px-3 text-foreground hover:text-primary transition-colors duration-200 rounded-lg hover:bg-gray-50 dark:bg-gray-900"
                          onClick={onClose}
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.href || "#"}
                  className="block text-header-text hover:text-primary font-medium py-3 text-base"
                  onClick={onClose}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}