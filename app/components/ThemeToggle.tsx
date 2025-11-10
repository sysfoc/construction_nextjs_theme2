"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg dark:bg-gray-800 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <motion.div
          key="moon"
          initial={{ y: 0 }}
          animate={{ y: [-2, 2, 0] }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Moon className="w-5 h-5 text-black" />
        </motion.div>
      ) : (
        <motion.div
          key="sun"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Sun className="w-5 h-5 text-orange-500" />
        </motion.div>
      )}
    </button>
  );
}
