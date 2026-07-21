import { NextResponse } from "next/server";

// Rate limiting - stores request counts per IP (resets on server restart)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT = 5;              // max 5 requests
const WINDOW_MS = 60 * 60 * 1000;  // per 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.lastReset > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT) {
    return true;
  }

  entry.count++;
  return false;
}

export async function POST(request: Request) {
  try {
    // Get IP address
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Resend integration stub
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey && resendApiKey !== "re_xxxxx") {
      console.log("Would send email via Resend:", { name, email, subject, message });
    } else {
      console.log("Contact form submission (Resend not configured):", {
        name,
        email,
        subject,
        message,
      });
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
