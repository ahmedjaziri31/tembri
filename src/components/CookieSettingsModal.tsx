"use client";

import { useState } from "react";

export default function CookieSettingsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  if (!isOpen) return null;

  const savePreferences = () => {
    localStorage.setItem(
      "cookie_preferences",
      JSON.stringify({
        necessary: true,
        analytics,
        marketing,
      })
    );
    localStorage.setItem("cookie_consent", "accepted");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-[#0b1f1a] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Privacy Overview</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">✕</button>
        </div>

        <p className="text-white/70 text-sm">
          This website uses cookies to improve your experience. Necessary cookies
          are always enabled. You can enable or disable other categories.
        </p>

        {/* Necessary */}
        <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
          <span className="text-white">Necessary</span>
          <span className="text-sm text-white/60">Always Enabled</span>
        </div>

        {/* Analytics */}
        <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
          <span className="text-white">Analytics</span>
          <input
            type="checkbox"
            checked={analytics}
            onChange={() => setAnalytics(!analytics)}
            className="w-5 h-5 accent-[#3f8a75]"
          />
        </div>

        {/* Marketing */}
        <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
          <span className="text-white">Marketing</span>
          <input
            type="checkbox"
            checked={marketing}
            onChange={() => setMarketing(!marketing)}
            className="w-5 h-5 accent-[#3f8a75]"
          />
        </div>

        <button
          onClick={savePreferences}
          className="w-full bg-[#2f6f5e] hover:bg-[#3f8a75] text-white py-3 rounded-lg font-medium transition"
        >
          Save & Accept
        </button>
      </div>
    </div>
  );
}
