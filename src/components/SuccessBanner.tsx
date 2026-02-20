import { useState, useEffect } from "react";

export default function SuccessBanner() {
  const [visible, setVisible] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setVisible(true);
      setSessionId(params.get("session_id"));
      // Clean URL without reload
      window.history.replaceState({}, "", window.location.pathname);
    }
    if (params.get("canceled") === "true") {
      // Just clean the URL, no banner needed
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  async function openPortal() {
    if (!sessionId) return;
    setPortalLoading(true);
    try {
      const res = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Portal error:", err);
    }
    setPortalLoading(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed top-14 inset-x-0 z-40 animate-slide-down">
      <div className="max-w-xl mx-auto px-4 py-3">
        <div className="bg-brand-500 text-white rounded-2xl shadow-lg px-5 py-4 flex items-start gap-3">
          <svg className="w-6 h-6 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="flex-1">
            <p className="font-semibold">Welcome to TipSplit Pro!</p>
            <p className="text-sm text-brand-100 mt-1">
              Your subscription is active. Pro features are on the way.
            </p>
            {sessionId && (
              <button
                onClick={openPortal}
                disabled={portalLoading}
                className="mt-2 text-sm underline hover:no-underline text-brand-100"
              >
                {portalLoading ? "Loading..." : "Manage subscription"}
              </button>
            )}
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-brand-200 hover:text-white transition-colors shrink-0"
            aria-label="Close"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
