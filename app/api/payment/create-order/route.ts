import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { consultationId, amount } = await req.json();

    const orderId = `order_${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

    if (consultationId) {
      await prisma.consultation.update({
        where: { id: consultationId },
        data: { razorpayOrderId: orderId },
      });
    }

    return NextResponse.json({
      success: true,
      orderId,
      amount: amount || 1999,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID || "rzp_test_simulated_key",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
