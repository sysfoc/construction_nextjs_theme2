"use client";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  MessageCircle,
  Send,
  MessageSquare,
  Music,
  Dribbble,
  Palette,
  Play,
  Users,
  BookOpen,
  AtSign,
  Mail,
  Phone,
  Clock,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useGeneralSettings } from "@/app/context/GeneralSettingsContext";
import Image from "next/image";

const SOCIAL_ICONS = {
  facebook: { icon: Facebook, color: "hover:bg-blue-600" },
  twitter: { icon: Twitter, color: "hover:bg-sky-500" },
  instagram: { icon: Instagram, color: "hover:bg-pink-600" },
  linkedin: { icon: Linkedin, color: "hover:bg-blue-700" },
  youtube: { icon: Youtube, color: "hover:bg-red-600" },
  github: { icon: Github, color: "hover:bg-gray-700" },
  discord: { icon: MessageCircle, color: "hover:bg-indigo-600" },
  telegram: { icon: Send, color: "hover:bg-sky-600" },
  whatsapp: { icon: MessageSquare, color: "hover:bg-green-600" },
  tiktok: { icon: Music, color: "hover:bg-black" },
  pinterest: { icon: Dribbble, color: "hover:bg-pink-500" },
  dribbble: { icon: Dribbble, color: "hover:bg-pink-600" },
  behance: { icon: Palette, color: "hover:bg-blue-600" },
  twitch: { icon: Play, color: "hover:bg-purple-600" },
  reddit: { icon: Users, color: "hover:bg-orange-600" },
  medium: { icon: BookOpen, color: "hover:bg-gray-700" },
  mastodon: { icon: AtSign, color: "hover:bg-purple-700" },
};

const QUICK_LINKS = [
  { name: "About", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
  { name: "News letter", href: "/newsletter" },
  { name: "How we work", href: "/how-we-work" },
  { name: "FAQ", href: "/faqs" },
];

const SHOWCASE_LINKS = [
  { name: "Partners", href: "/partners" },
  { name: "Certifications", href: "/certifications" },
  { name: "Projects", href: "/projects" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Why Choose Us", href: "/why-choose-us" },
  { name: "Gallery", href: "/gallery" },
];

function Footer() {
  const [email, setEmail] = useState("");
  const { settings } = useGeneralSettings();

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/subscribers/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await response.json();
      if (response.ok) {
        setEmail("");
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
    }
  };

  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top Section - Company Info & Newsletter Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 pb-6 border-b border-gray-800">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {settings?.logo && (
                <div className="w-10 h-10 lg:w-12 lg:h-12 relative">
                  <Image
                    src={settings?.logo}
                    alt="Company Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <span className="text-xl lg:text-2xl font-bold text-white">
                {settings?.companyName}
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
              Construct is a trusted construction company committed to quality,
              innovation, and reliability. We deliver efficient and lasting
              solutions for residential, commercial, and infrastructure
              projects.
            </p>

            {/* Social Media Icons - Horizontal Below Description */}
            {settings?.socialLinks && settings.socialLinks.length > 0 && (
              <div className="pt-2">
                <div className="flex flex-wrap gap-2">
                  {settings.socialLinks
                    .filter((link) => link.url)
                    .map((link) => {
                      const socialConfig =
                        SOCIAL_ICONS[
                          link.platform as keyof typeof SOCIAL_ICONS
                        ];
                      if (!socialConfig) return null;
                      const Icon = socialConfig.icon;
                      return (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-9 h-9 rounded-full bg-gray-800 ${socialConfig.color} transition-all duration-300 flex items-center justify-center hover:scale-110`}
                          aria-label={link.platform}
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                </div>
              </div>
            )}
          </div>

          {/* Newsletter Section */}
          <div className="bg-gray-900 rounded-xl p-6 max-w-lg">
            <h2 className="text-xl font-bold text-white mb-2">
              Join Newsletter
            </h2>
            <p className="text-gray-400 text-xs mb-4">
              Stay updated with our latest news and offerings
            </p>
            <div className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleForm(e as any);
                    }
                  }}
                  className="w-full pl-10 pr-3 py-2.5 bg-gray-800 text-white text-sm placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="button"
                onClick={handleForm as any}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 text-sm rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        {/* Middle Section - Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 mb-6 sm:px-10">
          {/* Quick Links */}
          <div>
            <h3 className="text-white text-base font-bold mb-3 relative inline-block">
              Quick Link
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm hover:pl-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Showcase Links */}
          <div>
            <h3 className="text-white text-base font-bold mb-3 relative inline-block">
              Showcase
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-2">
              {SHOWCASE_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm hover:pl-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-white text-base font-bold mb-3 relative inline-block">
              Contact Info
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-primary"></span>
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm break-all">
                  {settings?.email}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm">{settings?.phone}</p>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm">{settings?.officeHours}</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm break-words">
                  {settings?.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-800 pt-5">
          <p className="text-gray-400 text-xs text-start">
            © {new Date().getFullYear()} Powered by{" "}
            <Link
              href="https://sysfoc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-primary font-semibold transition-colors duration-200"
            >
              Sysfoc
            </Link>
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
