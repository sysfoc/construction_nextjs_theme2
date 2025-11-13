// app/admin/menu/page.tsx
"use client";
import { Save, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import {
  getPageVisibility,
  updatePageVisibility,
} from "@/lib/api/pageVisibility";
import Loader from "@/app/components/General/Loader";

interface MenuItem {
  _id: string;
  name: string;
  slug: string;
  visible: boolean;
}

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const pages = await getPageVisibility();
        setMenuItems(pages);
      } catch (error) {
        console.error("Failed to fetch pages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, []);

  const toggleVisibility = async (id: string) => {
    const item = menuItems.find((m) => m._id === id);
    if (!item) return;

    try {
      await updatePageVisibility(id, !item.visible);
      setMenuItems((prev) =>
        prev.map((m) => (m._id === id ? { ...m, visible: !m.visible } : m))
      );
    } catch (error) {
      console.error("Failed to update visibility:", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );

  return (
    <div className="p-4 mx-auto bg-background min-h-screen">
      <div className="flex sm:flex-row flex-col items-baseline gap-2 justify-start mb-4">
        <h1 className="text-2xl font-semibold text-[var(--header-text)]">
          Menu Management
        </h1>
        <p className="text-sm text-gray-600">Toggle visibility for pages</p>
      </div>

      <div className="bg-background border border-[var(--border-color)] rounded p-2">
        <div className="space-y-2 mb-4">
          {menuItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-2 border border-[var(--border-color)] rounded transition-all cursor-default"
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="text-sm text-[var(--header-text)] font-medium">
                  {item.name}
                </span>
              </div>

              <button
                onClick={() => toggleVisibility(item._id)}
                className="flex items-center gap-2 px-2 py-1 rounded text-sm"
              >
                {item.visible ? (
                  <>
                    <Eye className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Visible</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Hidden</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
