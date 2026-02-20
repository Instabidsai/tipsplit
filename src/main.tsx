import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { initGlobalErrorHandlers } from "./lib/error-handler";
import { logger } from "./lib/logger";

// Load Google Fonts stylesheet non-blocking (CSP-safe, no inline handlers)
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap";
document.head.appendChild(fontLink);

// Initialize global error handlers before rendering
initGlobalErrorHandlers();
logger.info("TipSplit app starting", "main", {
  url: window.location.href,
  userAgent: navigator.userAgent,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
      <Analytics />
      <SpeedInsights />
    </ErrorBoundary>
  </StrictMode>
);
