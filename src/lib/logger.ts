// Structured logging for TipSplit client-side and API functions
// Outputs structured JSON logs for observability

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  data?: Record<string, unknown>;
}

const LOG_BUFFER_MAX = 100;
const logBuffer: LogEntry[] = [];

function createEntry(
  level: LogLevel,
  message: string,
  context?: string,
  data?: Record<string, unknown>
): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(context && { context }),
    ...(data && { data }),
  };
}

function emit(entry: LogEntry) {
  // Store in buffer for health dashboard
  logBuffer.push(entry);
  if (logBuffer.length > LOG_BUFFER_MAX) {
    logBuffer.shift();
  }

  // Output to console with structured format
  const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}]`;
  const ctx = entry.context ? ` [${entry.context}]` : "";
  const msg = `${prefix}${ctx} ${entry.message}`;

  switch (entry.level) {
    case "debug":
      console.debug(msg, entry.data ?? "");
      break;
    case "info":
      console.info(msg, entry.data ?? "");
      break;
    case "warn":
      console.warn(msg, entry.data ?? "");
      break;
    case "error":
      console.error(msg, entry.data ?? "");
      break;
  }
}

export const logger = {
  debug(message: string, context?: string, data?: Record<string, unknown>) {
    emit(createEntry("debug", message, context, data));
  },
  info(message: string, context?: string, data?: Record<string, unknown>) {
    emit(createEntry("info", message, context, data));
  },
  warn(message: string, context?: string, data?: Record<string, unknown>) {
    emit(createEntry("warn", message, context, data));
  },
  error(message: string, context?: string, data?: Record<string, unknown>) {
    emit(createEntry("error", message, context, data));
  },
  getBuffer(): readonly LogEntry[] {
    return logBuffer;
  },
  getErrorCount(): number {
    return logBuffer.filter((e) => e.level === "error").length;
  },
  getWarnCount(): number {
    return logBuffer.filter((e) => e.level === "warn").length;
  },
};
