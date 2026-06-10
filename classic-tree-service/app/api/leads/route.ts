import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Lead } from "../../../models/leads";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // honeypot
    if (body?.companyWebsite) return NextResponse.json({ ok: true });

    const name = String(body?.name ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const location = String(body?.location ?? "").trim();
    const message = String(body?.message ?? "").trim();
    const imageUrls = Array.isArray(body?.imageUrls) ? body.imageUrls.filter(Boolean) : [];
    const jobType = String(body?.jobType ?? "").trim();

    if (!name) return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
    if (!phone && !email)
      return NextResponse.json({ ok: false, error: "Phone or email is required." }, { status: 400 });
    if (email && !isValidEmail(email))
      return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
    if (!jobType)
      return NextResponse.json({ ok: false, error: "Job Type is required" }, { status: 400 });

    await dbConnect();

    const doc = await Lead.create({
      name,
      phone,
      email,
      location,
      message,
      imageUrls,
      jobType,
      userAgent: req.headers.get("user-agent") ?? undefined,
      ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined,
    });

    return NextResponse.json({ ok: true, id: doc._id });
  } catch (err: unknown) {
    console.error("Lead submission failed:", err);

    const message =
      err instanceof Error && err.message.includes("Missing environment variable")
        ? "Lead storage is not configured yet. Please check the production MongoDB environment variables."
        : "We could not submit your request right now. Please call us directly or try again in a few minutes.";

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
