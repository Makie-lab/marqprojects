import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
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
      // In production, send email via Resend
      // const resend = new Resend(resendApiKey);
      // await resend.emails.send({ ... });
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
