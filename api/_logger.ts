// Structured JSON logger for Vercel serverless API functions
// Outputs JSON lines compatible with Vercel's log drain and observability tools

type LogLevel = "info" | "warn" | "error";

interface LogPayload {
  timestamp: string;
  level: LogLevel;
  message: string;
  context: string;
  data?: Record<string, unknown>;
}

function emit(level: LogLevel, message: string, context: string, data?: Record<string, unknown>) {
  const payload: LogPayload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
    ...(data && { data }),
  };

  const line = JSON.stringify(payload);

  switch (level) {
    case "info":
      console.log(line);
      break;
    case "warn":
      console.warn(line);
      break;
    case "error":
      console.error(line);
      break;
  }
}

export const apiLogger = {
  info(message: string, context: string, data?: Record<string, unknown>) {
    emit("info", message, context, data);
  },
  warn(message: string, context: string, data?: Record<string, unknown>) {
    emit("warn", message, context, data);
  },
  error(message: string, context: string, data?: Record<string, unknown>) {
    emit("error", message, context, data);
  },
};
