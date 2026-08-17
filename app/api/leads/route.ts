import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNotifications } from "@/lib/notifications";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, city, source, utmSource, utmMedium, utmCampaign } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email, and phone are required" }, { status: 400 });
    }

    // 1. Upsert Customer Record
    const customer = await prisma.customer.upsert({
      where: { email },
      update: { name, phone },
      create: { email, name, phone },
    });

    // 2. Create Lead Record with Status = NEW
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        city: city || "Bengaluru",
        source: source || "DIRECT_WEB",
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
        status: "NEW",
        customerId: customer.id,
      },
    });

    // 3. Trigger Real Notifications (Resend Email + Meta WhatsApp)
    sendNotifications({
      name,
      toEmail: email,
      toPhone: phone,
      type: "LEAD_CREATED",
      details: {
        consultationId: lead.id,
      },
    }).catch((err) => console.error("Notification async error:", err));

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
      include: {
        consultations: true,
        customer: true,
      },
    });
    return NextResponse.json({ leads });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
