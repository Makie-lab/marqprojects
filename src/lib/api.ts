/**
 * Uniform API envelope.
 *
 * Every route returns the same shape so clients can handle success and failure
 * without special-casing per endpoint. Errors carry a stable machine-readable
 * `code` plus a human `message`.
 */

import { NextResponse } from "next/server";

export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "METHOD_NOT_ALLOWED"
  | "PAYLOAD_TOO_LARGE"
  | "BAD_REQUEST"
  | "UPSTREAM_ERROR"
  | "INTERNAL_ERROR";

interface SuccessBody<T> {
  ok: true;
  data: T;
  requestId: string;
}

interface ErrorBody {
  ok: false;
  error: {
    code: ApiErrorCode;
    message: string;
    fields?: Record<string, string>;
  };
  requestId: string;
}

const NO_STORE = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
} as const;

export function apiSuccess<T>(
  data: T,
  opts: { requestId: string; status?: number; headers?: Record<string, string> }
): NextResponse<SuccessBody<T>> {
  return NextResponse.json(
    { ok: true as const, data, requestId: opts.requestId },
    {
      status: opts.status ?? 200,
      headers: {
        ...NO_STORE,
        "X-Request-Id": opts.requestId,
        ...opts.headers,
      },
    }
  );
}

export function apiError(
  code: ApiErrorCode,
  message: string,
  opts: {
    requestId: string;
    status: number;
    fields?: Record<string, string>;
    headers?: Record<string, string>;
  }
): NextResponse<ErrorBody> {
  return NextResponse.json(
    {
      ok: false as const,
      error: { code, message, ...(opts.fields ? { fields: opts.fields } : {}) },
      requestId: opts.requestId,
    },
    {
      status: opts.status,
      headers: {
        ...NO_STORE,
        "X-Request-Id": opts.requestId,
        ...opts.headers,
      },
    }
  );
}

/** Guards against oversized bodies before parsing JSON. */
export const MAX_BODY_BYTES = 32 * 1024; // 32 KB

export async function readJson(
  request: Request
): Promise<{ ok: true; value: unknown } | { ok: false; reason: "too_large" | "invalid" }> {
  const declared = request.headers.get("content-length");
  if (declared && Number(declared) > MAX_BODY_BYTES) {
    return { ok: false, reason: "too_large" };
  }

  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) {
    return { ok: false, reason: "too_large" };
  }

  try {
    return { ok: true, value: JSON.parse(text) as unknown };
  } catch {
    return { ok: false, reason: "invalid" };
  }
}
