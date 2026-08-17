import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { sendNotifications } from "@/lib/notifications";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { consultationId, paymentId, razorpayOrderId, signature } = body;

    if (!consultationId || !paymentId) {
      return NextResponse.json({ error: "consultationId and paymentId required" }, { status: 400 });
    }

    // Verify signature if provided
    if (signature && razorpayOrderId) {
      const isValid = verifyRazorpaySignature(razorpayOrderId, paymentId, signature);
      if (!isValid) {
        return NextResponse.json({ error: "Invalid Razorpay payment signature" }, { status: 400 });
      }
    }

    // Update Consultation Status
    const consultation = await prisma.consultation.update({
      where: { id: consultationId },
      data: {
        paymentStatus: "PAID",
        paymentId,
        status: "SCHEDULING_PENDING",
      },
      include: {
        lead: true,
      },
    });

    // Upsert Payment entity status
    await prisma.payment.upsert({
      where: { paymentId },
      update: {
        status: "PAID",
        signature,
      },
      create: {
        consultationId,
        orderId: razorpayOrderId || `ord_${consultationId}`,
        paymentId,
        signature,
        amount: consultation.amount,
        currency: "INR",
        status: "PAID",
      },
    });

    // Send Real Notifications for Payment Success
    if (consultation.lead) {
      sendNotifications({
        name: consultation.lead.name,
        toEmail: consultation.lead.email,
        toPhone: consultation.lead.phone,
        type: "PAYMENT_SUCCESS",
        details: {
          consultationId: consultation.id,
          amount: consultation.amount,
        },
      }).catch((e) => console.error("Notification async error:", e));
    }

    return NextResponse.json({ success: true, consultation });
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: "Payment verification failed", details: error.message }, { status: 500 });
  }
}
