import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Menu, 
  Image,
  HelpCircle, 
  FolderOpen, 
  Headphones,
  Users,  
  MessageSquare, 
  Briefcase, 
  FileCheck,
  Bell,
  Handshake, 
  Award, 
  FileText, 
  Newspaper, 
  UserCheck, 
  GitBranch, 
  Shield, 
  BadgeInfo,
  FileSignature, 
  Images, 
  Mail, 
  MessageCircle, 
  UserCog,
  Settings,
  ChevronDown,
  X
} from 'lucide-react';
import AdminFooter from './Footer';

interface AdminSidebarProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  subItems?: { label: string; path: string }[];
}

export default function AdminSidebar({ isDrawerOpen, setIsDrawerOpen }: AdminSidebarProps) {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const menuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { 
      icon: Settings, 
      label: 'Settings',
      subItems: [
        { label: 'General', path: '/admin/settings/general' },
        { label: 'SEO', path: '/admin/settings/SEO' },
      ]
    },
    { icon: Menu, label: 'Menu Management', path: '/admin/menu' },
    { icon: Image, label: 'Slider Management', path: '/admin/heroslider' },
    { icon: Briefcase, label: 'Services', path: '/admin/services' },
    { icon: Briefcase, label: 'Booking', path: '/admin/booking' },
    { icon: HelpCircle, label: 'FAQs', path: '/admin/faqs' },
    { icon: FolderOpen, label: 'Portfolio', path: '/admin/portfolio' },
    { icon: Users, label: 'Team', path: '/admin/team' },
    { icon: MessageSquare, label: 'Testimonials', path: '/admin/testimonials' },
    { icon: Handshake, label: 'Partners', path: '/admin/partners' },
    { icon: Award, label: 'Why Choose Us', path: '/admin/why-choose-us' },
    { icon: FileText, label: 'Projects', path: '/admin/projects' },
    { icon: Newspaper, label: 'News Management', path: '/admin/news' },
    { icon: UserCheck, label: 'Careers', path: '/admin/careers' },
    { icon: BadgeInfo, label: 'About Page', path: '/admin/about' },
    { icon: UserCog, label: 'User Management', path: '/admin/user-management' },
    { icon: UserCog, label: 'Blogs', path: '/admin/blogs' },
    { icon: FileCheck, label: 'Job Applications', path: '/admin/job-applications' },
    { icon: GitBranch, label: 'How we work', path: '/admin/how-we-work' },
    { icon: Shield, label: 'Certifications', path: '/admin/certifications' },
    { icon: FileSignature, label: 'Quote Requests', path: '/admin/quote' },
    { icon: Bell, label: 'Emergency services', path: '/admin/emergency-service' },
    { icon: Images, label: 'Gallery', path: '/admin/gallery' },
    { icon: Mail, label: 'Newsletter', path: '/admin/newsletter' },
    { icon: MessageCircle, label: 'Contact Form', path: '/admin/contact' },
    { icon: Headphones, label: 'Customer Support', path: '/admin/customer-support' },
  ];

  const SidebarContent = () => (
    <div className="h-full bg-background flex flex-col">
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.subItems ? (
              <div>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-paragraph hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200 group"
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                  <ChevronDown 
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ease-out ${
                      openMenus[item.label] ? 'rotate-180' : 'rotate-0'
                    }`} 
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-out overflow-hidden ${
                    openMenus[item.label] 
                      ? 'max-h-96 opacity-100 mt-1' 
                      : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <div className="ml-5 space-y-1 py-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.path}
                        className="flex items-center px-3 py-2 text-sm text-paragraph hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200 transform hover:translate-x-1"
                      >
                        <span className="relative">
                          {subItem.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href={item.path!}
                className="flex items-center gap-3 px-3 py-2.5 text-paragraph hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200 group"
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
      <div className="flex-shrink-0 border-t border-gray-200">
        <AdminFooter/>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-out ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="h-[calc(100%-73px)]">
          <SidebarContent />
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200">
        <SidebarContent />
      </aside>
    </>
  );
}