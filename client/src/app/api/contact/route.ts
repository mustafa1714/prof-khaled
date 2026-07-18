import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/client";

const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_SUBJECT = 500;
const MAX_MESSAGE = 5000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;

  entry.count++;
  return true;
}

function isValidOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  const allowedHosts = [
    "profkhaled.com",
    "www.profkhaled.com",
    "localhost:3000",
  ];

  if (origin) {
    try {
      const url = new URL(origin);
      return allowedHosts.some(
        (h) => url.host === h || url.hostname === h
      );
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      const url = new URL(referer);
      return allowedHosts.some(
        (h) => url.host === h || url.hostname === h
      );
    } catch {
      return false;
    }
  }

  return false;
}

export async function POST(request: NextRequest) {
  if (!isValidOrigin(request)) {
    return NextResponse.json(
      { success: false, error: "Forbidden" },
      { status: 403 }
    );
  }

  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    const name = sanitize(String(body.name || ""));
    const email = sanitize(String(body.email || ""));
    const subject = sanitize(String(body.subject || ""));
    const message = sanitize(String(body.message || ""));
    const language = sanitize(String(body.language || "ar"));

    if (!name || name.length > MAX_NAME) {
      return NextResponse.json(
        { success: false, error: "Invalid name" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > MAX_EMAIL) {
      return NextResponse.json(
        { success: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    if (subject.length > MAX_SUBJECT) {
      return NextResponse.json(
        { success: false, error: "Subject too long" },
        { status: 400 }
      );
    }

    if (!message || message.length > MAX_MESSAGE) {
      return NextResponse.json(
        { success: false, error: "Invalid message" },
        { status: 400 }
      );
    }

    if (!["ar", "en", "tr"].includes(language)) {
      return NextResponse.json(
        { success: false, error: "Invalid language" },
        { status: 400 }
      );
    }

    const doc = {
      _type: "contactMessage",
      name,
      email,
      subject,
      message,
      language,
      status: "unread",
      sentAt: new Date().toISOString(),
    };

    await writeClient.create(doc);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit" },
      { status: 500 }
    );
  }
}
