"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";

// Admin components
import Sidebar from "../admin/components/Sidebar";
import AdminHeader from "../admin/components/Header";

// User components
import Header from "./User/Header";
import Footer from "./User/Footer";
import Cookie from "./User/Cookie";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isLoginRoute = pathname === "/login";


  // Admin layout
  if (isAdminRoute) {
    return (
      <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
        <Sidebar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
        <div className="flex-1 flex flex-col">
          <AdminHeader onMenuClick={() => setIsDrawerOpen(true)} />
          <main className="flex-1 mt-16 lg:ml-64">
            {children}
          </main>
        </div>
      </div>
    );
  }
 
  // Login page layout
  if (isLoginRoute) {
    return <main>{children}</main>;
  }

  // User layout
  return (
    <>
      <Header />
      <main>{children}</main>
      <Cookie />
      <Footer />
    </>
  );
}