import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { client } = await import("@/sanity/client");
    await client.fetch("*[_type == 'siteSettings'][0._id]");
    return NextResponse.json({ status: "ok", sanity: "connected" });
  } catch {
    return NextResponse.json({ status: "degraded", sanity: "disconnected" }, { status: 503 });
  }
}
