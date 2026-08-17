import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { leadId, customerId, homeType, budget, spaces, vibes, photos, notes, amount, answers } = body;

    if (!leadId) {
      return NextResponse.json({ error: "leadId is required" }, { status: 400 });
    }

    const consultation = await prisma.consultation.create({
      data: {
        leadId,
        customerId: customerId || null,
        homeType: homeType || "",
        budget: budget || "",
        spaces: JSON.stringify(spaces || []),
        vibes: JSON.stringify(vibes || []),
        photos: JSON.stringify(photos || []),
        notes: notes || "",
        amount: amount || 1999,
        paymentStatus: "PAYMENT_PENDING",
        status: "DRAFT",
      },
    });

    // Save structured consultation answers if provided
    if (answers && Array.isArray(answers)) {
      for (const ans of answers) {
        if (ans.questionKey && ans.answerValue) {
          await prisma.consultationAnswer.create({
            data: {
              consultationId: consultation.id,
              questionKey: ans.questionKey,
              questionLabel: ans.questionLabel || ans.questionKey,
              answerValue: typeof ans.answerValue === "string" ? ans.answerValue : JSON.stringify(ans.answerValue),
            },
          });
        }
      }
    }

    return NextResponse.json({ success: true, consultation });
  } catch (error: any) {
    console.error("Error creating consultation:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, homeType, budget, spaces, vibes, photos, notes, appointmentDate, appointmentTimeSlot, paymentStatus, paymentId, status } = body;

    if (!id) {
      return NextResponse.json({ error: "consultation id is required" }, { status: 400 });
    }

    const consultation = await prisma.consultation.update({
      where: { id },
      data: {
        ...(homeType && { homeType }),
        ...(budget && { budget }),
        ...(spaces && { spaces: JSON.stringify(spaces) }),
        ...(vibes && { vibes: JSON.stringify(vibes) }),
        ...(photos && { photos: JSON.stringify(photos) }),
        ...(notes !== undefined && { notes }),
        ...(appointmentDate && { appointmentDate }),
        ...(appointmentTimeSlot && { appointmentTimeSlot }),
        ...(paymentStatus && { paymentStatus }),
        ...(paymentId && { paymentId }),
        ...(status && { status }),
      },
      include: {
        images: true,
        answers: true,
        lead: true,
      },
    });

    return NextResponse.json({ success: true, consultation });
  } catch (error: any) {
    console.error("Error updating consultation:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
