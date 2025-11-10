// app/layout.tsx
import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";

import AdminLayout from "./components/AdminLayout";
import { UserProvider } from "./context/UserContext";
import { GeneralSettingsProvider } from "./context/GeneralSettingsContext";
import { ThemeProvider } from "./context/ThemeContext";

const exo = Exo({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
});

export const metadata: Metadata = {
  title: "Construction Site",
  description: "Explore our construction site project showcasing design and quality.",
  icons: { icon: "/favicon-32x32.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${exo.className} antialiased max-w-[1920px] mx-auto`}>
        <ThemeProvider>
          <UserProvider>
            <GeneralSettingsProvider>
              <AdminLayout>{children}</AdminLayout>
            </GeneralSettingsProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}