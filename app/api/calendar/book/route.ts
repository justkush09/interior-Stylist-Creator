import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { consultationId, appointmentDate, appointmentTimeSlot } = await req.json();

    if (!consultationId || !appointmentDate || !appointmentTimeSlot) {
      return NextResponse.json(
        { error: "consultationId, appointmentDate, and appointmentTimeSlot are required" },
        { status: 400 }
      );
    }

    // Parse appointment time
    const startDateTime = new Date(`${appointmentDate} ${appointmentTimeSlot}`);
    const endDateTime = new Date(startDateTime.getTime() + 45 * 60 * 1000); // 45 minutes

    // Update consultation status
    const consultation = await prisma.consultation.update({
      where: { id: consultationId },
      data: {
        appointmentDate,
        appointmentTimeSlot,
        status: "BOOKED",
      },
      include: { lead: true },
    });

    // Create appointment entry
    const appointment = await prisma.appointment.create({
      data: {
        consultationId,
        startTime: startDateTime,
        endTime: endDateTime,
        status: "SCHEDULED",
        googleEventId: `evt_${Math.random().toString(36).substring(2, 10)}`,
      },
    });

    return NextResponse.json({ success: true, consultation, appointment });
  } catch (error: any) {
    console.error("Error booking appointment slot:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
