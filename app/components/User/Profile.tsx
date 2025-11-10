import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

interface CEOProfileProps {
  yearsOfExperience?: number;
  description?: string;
  features?: string[];
  imageUrl?: string;
  signatureUrl?: string;
}

const CEOProfile: React.FC<CEOProfileProps> = ({
  yearsOfExperience = 25,
  description = "With decades of experience in the construction industry, our leadership ensures that every project upholds strict safety standards, legal compliance, and quality assurance. Our certifications demonstrate a consistent commitment to delivering reliable and accountable construction services.",
  features = [
    "Licensed & Insured Contractors",
    "OSHA & Safety Certified Team",
    "ISO 9001 Quality Standards",
  ],
  imageUrl = "/certifications/ceo.png",
  signatureUrl
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-12 px-6 md:px-10 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {/* Left Side - Image */}
          <div className="relative inline-block">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image
                src={imageUrl}
                alt="Leadership"
                fill
                className="object-contain rounded-xl"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-4">
            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[var(--primary)]" />
                    </div>
                  </div>
                  <span className="text-gray-800 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CEOProfile;
