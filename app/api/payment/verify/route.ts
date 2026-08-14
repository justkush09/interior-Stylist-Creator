import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { consultationId, paymentId, razorpayOrderId } = await req.json();

    if (!consultationId) {
      return NextResponse.json({ error: "consultationId is required" }, { status: 400 });
    }

    const updated = await prisma.consultation.update({
      where: { id: consultationId },
      data: {
        paymentStatus: "PAID",
        paymentId: paymentId || `pay_${Math.random().toString(36).substring(2, 11)}`,
        status: "PAID",
      },
    });

    return NextResponse.json({ success: true, consultation: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
