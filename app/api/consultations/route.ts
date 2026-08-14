import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { leadId, homeType, spaces, vibes, photos, notes, amount } = body;

    if (!leadId) {
      return NextResponse.json({ error: "leadId is required" }, { status: 400 });
    }

    const consultation = await prisma.consultation.create({
      data: {
        leadId,
        homeType: homeType || "",
        spaces: JSON.stringify(spaces || []),
        vibes: JSON.stringify(vibes || []),
        photos: JSON.stringify(photos || []),
        notes: notes || "",
        amount: amount || 1999,
        status: "DRAFT",
      },
    });

    return NextResponse.json({ success: true, consultation });
  } catch (error: any) {
    console.error("Error creating consultation:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, homeType, spaces, vibes, photos, notes, appointmentDate, appointmentTimeSlot, paymentStatus, paymentId } = body;

    if (!id) {
      return NextResponse.json({ error: "consultation id is required" }, { status: 400 });
    }

    const consultation = await prisma.consultation.update({
      where: { id },
      data: {
        ...(homeType && { homeType }),
        ...(spaces && { spaces: JSON.stringify(spaces) }),
        ...(vibes && { vibes: JSON.stringify(vibes) }),
        ...(photos && { photos: JSON.stringify(photos) }),
        ...(notes !== undefined && { notes }),
        ...(appointmentDate && { appointmentDate }),
        ...(appointmentTimeSlot && { appointmentTimeSlot }),
        ...(paymentStatus && { paymentStatus }),
        ...(paymentId && { paymentId }),
      },
    });

    return NextResponse.json({ success: true, consultation });
  } catch (error: any) {
    console.error("Error updating consultation:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
