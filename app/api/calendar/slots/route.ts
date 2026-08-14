import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    // Fetch dynamic slots setting from DB if present
    const slotsSetting = await prisma.setting.findUnique({
      where: { key: "available_slots" },
    });

    const defaultSlots = ["10:00 AM", "11:30 AM", "02:00 PM", "04:00 PM", "05:30 PM"];
    const availableSlots = slotsSetting ? slotsSetting.value.split(",") : defaultSlots;

    // Check existing appointments on this date to filter out booked slots
    let bookedSlots: string[] = [];
    if (date) {
      const existingConsultations = await prisma.consultation.findMany({
        where: {
          appointmentDate: date,
          status: { in: ["BOOKED", "COMPLETED"] },
        },
        select: { appointmentTimeSlot: true },
      });
      bookedSlots = existingConsultations
        .map((c: { appointmentTimeSlot: string | null }) => c.appointmentTimeSlot)
        .filter((slot: string | null): slot is string => Boolean(slot));
    }

    const freeSlots = availableSlots.filter((slot: string) => !bookedSlots.includes(slot));

    return NextResponse.json({ slots: freeSlots, allSlots: availableSlots, bookedSlots });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
