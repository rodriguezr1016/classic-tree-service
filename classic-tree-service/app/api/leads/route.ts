import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Lead } from "../../../models/leads";
import { ok } from "assert";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  const body = await req.json();

  // honeypot
  if (body?.companyWebsite) return NextResponse.json({ ok: true });

  const name = String(body?.name ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const message = String(body?.message ?? "").trim();
  const imageUrls = Array.isArray(body?.imageUrls) ? body.imageUrls.filter(Boolean) : [];
  const jobType = String(body?.jobType ?? "").trim();

  if (!name) return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
  if (!phone && !email)
    return NextResponse.json({ ok: false, error: "Phone or email is required." }, { status: 400 });
  if (email && !isValidEmail(email))
    return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
  if (!jobType) return NextResponse.json({ok: false, error: "Job Type is required"}, {status: 400});
  await dbConnect();

  const doc = await Lead.create({
    name,
    phone,
    email,
    message,
    imageUrls,
    jobType,
    userAgent: req.headers.get("user-agent") ?? undefined,
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined,
  });

  return NextResponse.json({ ok: true, id: doc._id });
}
