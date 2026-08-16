/**
 * Structured JSON logging.
 *
 * Emits one JSON object per line so logs are queryable in Vercel / CloudWatch /
 * Datadog without a parsing layer. Every API request carries a correlation id
 * so a single submission can be traced end-to-end.
 */

type Level = "debug" | "info" | "warn" | "error";

interface LogFields {
  [key: string]: unknown;
}

const LEVEL_ORDER: Record<Level, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const MIN_LEVEL: Level =
  process.env.LOG_LEVEL === "debug"
    ? "debug"
    : process.env.NODE_ENV === "production"
      ? "info"
      : "debug";

/** Keys whose values must never reach the log sink. */
const REDACT_KEYS = new Set([
  "email",
  "phone",
  "apiKey",
  "authorization",
  "cookie",
  "password",
  "token",
]);

function redact(fields: LogFields): LogFields {
  const out: LogFields = {};
  for (const [key, value] of Object.entries(fields)) {
    if (REDACT_KEYS.has(key) && typeof value === "string") {
      out[key] = maskEmailOrValue(value);
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      out[key] = redact(value as LogFields);
    } else {
      out[key] = value;
    }
  }
  return out;
}

function maskEmailOrValue(value: string): string {
  const at = value.indexOf("@");
  if (at > 0) {
    const local = value.slice(0, at);
    const domain = value.slice(at);
    const head = local.slice(0, 2);
    return `${head}${"*".repeat(Math.max(local.length - 2, 1))}${domain}`;
  }
  if (value.length <= 4) return "****";
  return `${value.slice(0, 2)}${"*".repeat(value.length - 2)}`;
}

function write(level: Level, message: string, fields: LogFields = {}): void {
  if (LEVEL_ORDER[level] < LEVEL_ORDER[MIN_LEVEL]) return;

  const entry = {
    level,
    msg: message,
    ts: new Date().toISOString(),
    ...redact(fields),
  };

  const line = JSON.stringify(entry);
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export const logger = {
  debug: (msg: string, fields?: LogFields) => write("debug", msg, fields),
  info: (msg: string, fields?: LogFields) => write("info", msg, fields),
  warn: (msg: string, fields?: LogFields) => write("warn", msg, fields),
  error: (msg: string, fields?: LogFields) => write("error", msg, fields),
  /** Returns a logger bound to a request id for end-to-end tracing. */
  child(bound: LogFields) {
    return {
      debug: (msg: string, f?: LogFields) => write("debug", msg, { ...bound, ...f }),
      info: (msg: string, f?: LogFields) => write("info", msg, { ...bound, ...f }),
      warn: (msg: string, f?: LogFields) => write("warn", msg, { ...bound, ...f }),
      error: (msg: string, f?: LogFields) => write("error", msg, { ...bound, ...f }),
    };
  },
};

/** Generates a correlation id, preferring an upstream-provided one. */
export function requestId(request: Request): string {
  return (
    request.headers.get("x-request-id") ??
    request.headers.get("x-vercel-id") ??
    (globalThis.crypto?.randomUUID?.() ?? `req_${Date.now().toString(36)}`)
  );
}
