import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalLeads = await prisma.lead.count();
    const leadsByStatus = await prisma.lead.groupBy({
      by: ["status"],
      _count: true,
    });

    const totalConsultations = await prisma.consultation.count();
    const consultationsByStatus = await prisma.consultation.groupBy({
      by: ["paymentStatus"],
      _count: true,
    });

    const paidPayments = await prisma.payment.findMany({
      where: { status: "PAID" },
    });

    const totalRevenue = paidPayments.reduce((sum, p) => sum + p.amount, 0);

    const paidConsultations = await prisma.consultation.findMany({
      where: { paymentStatus: "PAID" },
      include: { lead: true, images: true, answers: true },
      orderBy: { createdAt: "desc" },
    });

    const upcomingAppointments = await prisma.appointment.findMany({
      where: { status: "SCHEDULED" },
      include: {
        consultation: {
          include: { lead: true },
        },
      },
      orderBy: { startTime: "asc" },
    });

    const analyticsEvents = await prisma.analyticsEvent.groupBy({
      by: ["eventType"],
      _count: true,
    });

    const conversionRate = totalLeads > 0 ? ((paidConsultations.length / totalLeads) * 100).toFixed(1) : "0";

    return NextResponse.json({
      totalLeads,
      leadsByStatus,
      totalConsultations,
      consultationsByStatus,
      paidCount: paidConsultations.length,
      revenue: totalRevenue,
      conversionRate,
      paidConsultations,
      upcomingAppointments,
      analyticsEvents,
    });
  } catch (error: any) {
    console.error("Admin metrics error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
