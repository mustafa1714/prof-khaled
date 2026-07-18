import { NextResponse } from "next/server";
import { sanityFetch } from "@/sanity/client";
import { CONTACT_INFO_QUERY } from "@/sanity/queries";

export const revalidate = 300;

export async function GET() {
  try {
    const data = await sanityFetch<{ whatsappNumber?: string; whatsappDefaultMsg?: string }>({
      query: CONTACT_INFO_QUERY,
      params: { lang: "ar" },
      revalidate: 300,
    });

    return NextResponse.json({
      whatsappNumber: data?.whatsappNumber || "",
      whatsappDefaultMsg: data?.whatsappDefaultMsg || "",
    });
  } catch {
    return NextResponse.json({ whatsappNumber: "", whatsappDefaultMsg: "" });
  }
}
