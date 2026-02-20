import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { initGlobalErrorHandlers } from "./lib/error-handler";
import { logger } from "./lib/logger";

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
    </ErrorBoundary>
  </StrictMode>
);
