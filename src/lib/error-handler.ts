// Global error handlers for uncaught errors and unhandled promise rejections
import { logger } from "./logger";

let initialized = false;

export function initGlobalErrorHandlers() {
  if (initialized) return;
  initialized = true;

  // Catch uncaught errors
  window.onerror = (
    message: string | Event,
    source?: string,
    lineno?: number,
    colno?: number,
    error?: Error
  ) => {
    logger.error(
      typeof message === "string" ? message : "Uncaught error",
      "window.onerror",
      {
        source: source ?? "unknown",
        line: lineno ?? 0,
        column: colno ?? 0,
        stack: error?.stack ?? "no stack",
      }
    );
    // Return false to allow default browser error handling
    return false;
  };

  // Catch unhandled promise rejections
  window.addEventListener("unhandledrejection", (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    const message =
      reason instanceof Error
        ? reason.message
        : typeof reason === "string"
          ? reason
          : "Unhandled promise rejection";

    logger.error(message, "unhandledrejection", {
      stack: reason instanceof Error ? reason.stack ?? "no stack" : "no stack",
      type: typeof reason,
    });
  });

  logger.info("Global error handlers initialized", "error-handler");
}
