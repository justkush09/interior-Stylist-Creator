import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalLeads = await prisma.lead.count();
    const totalConsultations = await prisma.consultation.count();
    const paidConsultations = await prisma.consultation.findMany({
      where: { paymentStatus: "PAID" },
      include: { lead: true },
    });

    const revenue = paidConsultations.reduce((sum: number, c: { amount: number }) => sum + c.amount, 0);

    const upcomingAppointments = await prisma.appointment.findMany({
      where: { status: "SCHEDULED" },
      include: { consultation: { include: { lead: true } } },
      orderBy: { startTime: "asc" },
    });

    const conversionRate = totalLeads > 0 ? ((paidConsultations.length / totalLeads) * 100).toFixed(1) : "0";

    return NextResponse.json({
      totalLeads,
      totalConsultations,
      paidCount: paidConsultations.length,
      revenue,
      conversionRate,
      upcomingAppointments,
      paidConsultations,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
