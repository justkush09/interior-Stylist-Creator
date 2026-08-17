import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCalendarEvent } from "@/lib/google-calendar";
import { sendNotifications } from "@/lib/notifications";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { consultationId, appointmentDate, appointmentTimeSlot } = body;

    if (!consultationId || !appointmentDate || !appointmentTimeSlot) {
      return NextResponse.json(
        { error: "consultationId, appointmentDate, and appointmentTimeSlot are required" },
        { status: 400 }
      );
    }

    // 1. Fetch consultation & lead
    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
      include: { lead: true },
    });

    if (!consultation) {
      return NextResponse.json({ error: "Consultation not found" }, { status: 404 });
    }

    // 2. Check for slot conflict (double-booking prevention)
    const existingConflict = await prisma.appointment.findFirst({
      where: {
        consultation: {
          appointmentDate,
          appointmentTimeSlot,
          status: { in: ["SCHEDULED", "BOOKED"] },
        },
        status: "SCHEDULED",
      },
    });

    if (existingConflict) {
      return NextResponse.json(
        { error: "Selected slot is no longer available. Please select another slot." },
        { status: 409 }
      );
    }

    // 3. Create Google Calendar Event with Meet Video Link
    const eventDetails = await createCalendarEvent({
      summary: `Indian Minimalist Home Styling Consultation — ${consultation.lead?.name || "Client"}`,
      description: `1-on-1 Home Decor Consultation.\nHome Type: ${consultation.homeType || "N/A"}\nSpaces: ${consultation.spaces || "N/A"}\nBudget: ${consultation.budget || "N/A"}`,
      customerEmail: consultation.lead?.email || "client@example.com",
      customerName: consultation.lead?.name || "Client",
      dateStr: appointmentDate,
      timeSlot: appointmentTimeSlot,
    });

    // 4. Update Consultation status to SCHEDULED
    const updatedConsultation = await prisma.consultation.update({
      where: { id: consultationId },
      data: {
        appointmentDate,
        appointmentTimeSlot,
        status: "SCHEDULED",
      },
    });

    // 5. Create DB Appointment record
    const startTimeDate = new Date(`${appointmentDate}T11:30:00+05:30`);
    const endTimeDate = new Date(startTimeDate.getTime() + 45 * 60000);

    const appointment = await prisma.appointment.create({
      data: {
        consultationId,
        startTime: startTimeDate,
        endTime: endTimeDate,
        timezone: "Asia/Kolkata",
        googleEventId: eventDetails.googleEventId,
        meetLink: eventDetails.meetLink,
        status: "SCHEDULED",
      },
    });

    // 6. Trigger Real Email & WhatsApp Notifications
    if (consultation.lead) {
      sendNotifications({
        name: consultation.lead.name,
        toEmail: consultation.lead.email,
        toPhone: consultation.lead.phone,
        type: "BOOKING_CONFIRMED",
        details: {
          consultationId,
          date: appointmentDate,
          slot: appointmentTimeSlot,
          meetLink: eventDetails.meetLink,
        },
      }).catch(console.error);
    }

    return NextResponse.json({
      success: true,
      consultation: updatedConsultation,
      appointment,
    });
  } catch (error: any) {
    console.error("Error booking appointment slot:", error);
    return NextResponse.json({ error: "Booking failed", details: error.message }, { status: 500 });
  }
}
