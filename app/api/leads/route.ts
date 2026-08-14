import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, city } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email, and phone are required" }, { status: 400 });
    }

    // Create or find existing lead by email
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        city: city || "Bengaluru",
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, lead });
  } catch (error: any) {
    console.error("Error creating lead:", error);
    return NextResponse.json({ error: "Failed to create lead", details: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      include: { consultations: true },
    });
    return NextResponse.json({ leads });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
