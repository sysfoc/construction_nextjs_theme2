"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Cookie = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [prefs, setPrefs] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = Cookies.get("cookie_preferences");
    if (!saved) {
      setShowPopup(true);
    } else {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.analytics !== undefined && parsed.marketing !== undefined) {
          setPrefs(parsed);
        }
      } catch {}
    }
  }, []);

  const handleAcceptAll = () => {
    const allPrefs = { necessary: true, analytics: true, marketing: true };
    Cookies.set("cookie_preferences", JSON.stringify(allPrefs), {
      expires: 365,
    });
    setPrefs(allPrefs);
    setShowPopup(false);
  };

  const handleSave = () => {
    Cookies.set("cookie_preferences", JSON.stringify(prefs), { expires: 365 });
    setShowPopup(false);
  };

  const handleRejectAll = () => {
    const rejectedPrefs = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    Cookies.set("cookie_preferences", JSON.stringify(rejectedPrefs), {
      expires: 365,
    });
    setPrefs(rejectedPrefs);
    setShowPopup(false);
  };

  const togglePref = (key: keyof typeof prefs) => {
    if (key === "necessary") return;
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!showPopup) return null;
  return (
    <div className='fixed bottom-4 left-4 right-4 md:right-6 md:left-auto md:bottom-6 z-50'>
      <div className='bg-white border shadow-lg rounded-xl p-4 md:p-6 max-w-md mx-auto md:ml-auto flex flex-col gap-4 text-sm text-gray-800'>
        <div>
          We use cookies to enhance your experience. You can manage your
          preferences below.
        </div>

        {showManage && (
          <div className='bg-gray-100 p-3 rounded-md text-xs text-gray-700 flex flex-col gap-2'>
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                className='border border-primary checked:bg-primary focus:outline-none focus:ring-0'
                checked
                disabled
              />
              <span>
                <strong>Necessary</strong> — Required for site to function
              </span>
            </label>
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={prefs.analytics}
                onChange={() => togglePref("analytics")}
                className='border border-primary checked:bg-primary focus:outline-none focus:ring-0'
              />
              <span>
                <strong>Analytics</strong> — Helps us improve performance
              </span>
            </label>
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={prefs.marketing}
                className='border border-primary checked:bg-primary focus:outline-none focus:ring-0'
                onChange={() => togglePref("marketing")}
              />
              <span>
                <strong>Marketing</strong> — Personalized advertising
              </span>
            </label>
          </div>
        )}

        <div className='flex flex-col md:flex-row gap-2 justify-end'>
          <button
            onClick={() => setShowManage((prev) => !prev)}
            className='text-gray-500 hover:text-black underline text-xs'
          >
            {showManage ? "Hide Preferences" : "Manage Preferences"}
          </button>

          {showManage ? (
            <button
              onClick={handleSave}
              className='bg-primary text-white px-4 py-2 rounded-md hover:!bg-primary/90 transition'
            >
              Save Preferences
            </button>
          ) : (
            <>
              <button
                onClick={handleRejectAll}
                className='bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition'
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className='bg-primary text-primary-foreground px-4 py-2 rounded-md hover:!bg-primary/90 transition'
              >
                Accept All
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cookie;
