"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

/**
 * Route-level error boundary. Logs the digest so a production incident can be
 * correlated with server logs, and always offers a recovery path.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(
      JSON.stringify({
        level: "error",
        msg: "client.route_error",
        digest: error.digest ?? null,
        message: error.message,
        ts: new Date().toISOString(),
      })
    );
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 pt-28 pb-16">
      <div className="glass-card p-8 max-w-md text-center">
        <AlertTriangle size={40} className="mx-auto mb-4 opacity-40" />
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-sm opacity-60 mb-6">
          An unexpected error occurred while rendering this page. You can retry,
          or head back to the homepage.
        </p>
        {error.digest ? (
          <p className="text-xs opacity-40 mb-6 font-mono break-all">
            Reference: {error.digest}
          </p>
        ) : null}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="mag-search-btn justify-center">
            <RotateCcw size={16} /> Try again
          </button>
          <Link href="/" className="chip justify-center py-3 px-5">
            <Home size={15} /> Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
