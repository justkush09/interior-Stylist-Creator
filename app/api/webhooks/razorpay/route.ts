import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { sendNotifications } from "@/lib/notifications";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (webhookSecret && signature) {
      const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);
      if (!isValid) {
        return NextResponse.json({ error: "Invalid Razorpay Webhook Signature" }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    // Handle payment.captured event
    if (event === "payment.captured" || event === "order.paid") {
      const paymentEntity = payload.payload.payment.entity;
      const orderId = paymentEntity.order_id;
      const paymentId = paymentEntity.id;
      const amount = paymentEntity.amount / 100;

      // Find consultation by razorpayOrderId
      const consultation = await prisma.consultation.findFirst({
        where: { razorpayOrderId: orderId },
        include: { lead: true },
      });

      if (consultation) {
        // Idempotent update
        if (consultation.paymentStatus !== "PAID") {
          await prisma.consultation.update({
            where: { id: consultation.id },
            data: {
              paymentStatus: "PAID",
              paymentId,
              status: "SCHEDULING_PENDING",
            },
          });

          await prisma.payment.upsert({
            where: { paymentId },
            update: {
              status: "PAID",
              rawPayload: rawBody,
            },
            create: {
              consultationId: consultation.id,
              orderId,
              paymentId,
              amount,
              currency: "INR",
              status: "PAID",
              rawPayload: rawBody,
            },
          });

          // Trigger notifications
          if (consultation.lead) {
            sendNotifications({
              name: consultation.lead.name,
              toEmail: consultation.lead.email,
              toPhone: consultation.lead.phone,
              type: "PAYMENT_SUCCESS",
              details: {
                consultationId: consultation.id,
                amount,
              },
            }).catch(console.error);
          }
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    console.error("Razorpay webhook error:", error);
    return NextResponse.json({ error: "Webhook error", details: error.message }, { status: 500 });
  }
}
