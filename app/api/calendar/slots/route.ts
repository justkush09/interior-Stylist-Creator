import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAvailableSlots } from "@/lib/google-calendar";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

    // 1. Get available slots from Google Calendar API
    const googleSlots = await getAvailableSlots(date);

    // 2. Get DB booked slots to prevent double-booking
    const existingConsultations = await prisma.consultation.findMany({
      where: {
        appointmentDate: date,
        status: { in: ["SCHEDULED", "BOOKED", "COMPLETED"] },
      },
      select: { appointmentTimeSlot: true },
    });

    const bookedSlots = existingConsultations
      .map((c: { appointmentTimeSlot: string | null }) => c.appointmentTimeSlot)
      .filter((slot: string | null): slot is string => Boolean(slot));

    const finalAvailableSlots = googleSlots.filter((slot) => !bookedSlots.includes(slot));

    return NextResponse.json({
      date,
      slots: finalAvailableSlots,
      googleSlots,
      bookedSlots,
    });
  } catch (error: any) {
    console.error("Error fetching calendar slots:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
