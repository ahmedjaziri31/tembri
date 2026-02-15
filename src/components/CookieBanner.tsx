"use client";

import { useEffect, useState } from "react";
import CookieSettingsModal from "./CookieSettingsModal";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
    <div className="fixed bottom-0 left-0 w-full z-50
      bg-gradient-to-r from-[#0b1f1a] via-[#0f2a23] to-[#13332b]
      text-white border-t border-white/10 backdrop-blur-md">

      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

        <p className="text-sm text-white/80">
          This website uses cookies to improve your experience.{" "}
          <button
            onClick={() => setOpenSettings(true)}
            className="underline text-[#6ee7b7] hover:text-[#34d399]"
          >
           Cookie settings
            </button>

        </p>

        <div className="flex gap-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 text-sm border border-white/30 text-white/80 hover:bg-white/10 transition rounded-md"
          >
            Decline
          </button>

          <button
            onClick={acceptCookies}
            className="px-5 py-2 text-sm bg-[#2f6f5e] hover:bg-[#3f8a75] text-white font-medium rounded-md shadow-md transition"
          >
            Accept
          </button>
        </div>

      </div>
    </div>
    <CookieSettingsModal
      isOpen={openSettings}
      onClose={() => setOpenSettings(false)}
    />
    </>
  );
}
