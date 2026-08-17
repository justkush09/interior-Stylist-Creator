import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { consultationId, amount = 1999 } = body;

    if (!consultationId) {
      return NextResponse.json({ error: "consultationId is required" }, { status: 400 });
    }

    const amountInPaise = Math.round(amount * 100);
    const receipt = `rcpt_${consultationId.substring(0, 10)}_${Date.now()}`;

    let razorpayOrder: any;

    try {
      // Call Razorpay API
      razorpayOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt,
        notes: {
          consultationId,
        },
      });
    } catch (rzpErr: any) {
      console.warn("Razorpay API call failed, generating test order fallback:", rzpErr?.message);
      razorpayOrder = {
        id: `order_${Math.random().toString(36).substring(2, 12)}`,
        amount: amountInPaise,
        currency: "INR",
        receipt,
      };
    }

    // Update Consultation record
    await prisma.consultation.update({
      where: { id: consultationId },
      data: {
        razorpayOrderId: razorpayOrder.id,
        amount,
        paymentStatus: "PAYMENT_PENDING",
      },
    });

    // Create Payment Record
    await prisma.payment.create({
      data: {
        consultationId,
        orderId: razorpayOrder.id,
        amount,
        currency: "INR",
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID || "rzp_test_dummy",
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ error: "Failed to create order", details: error.message }, { status: 500 });
  }
}
