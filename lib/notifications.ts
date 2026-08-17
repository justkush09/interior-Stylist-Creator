import { Resend } from "resend";
import { prisma } from "./prisma";

export interface NotificationPayload {
  toEmail: string;
  toPhone: string;
  name: string;
  type: "LEAD_CREATED" | "PAYMENT_SUCCESS" | "BOOKING_CONFIRMED";
  details?: {
    consultationId?: string;
    amount?: number;
    date?: string;
    slot?: string;
    meetLink?: string;
  };
}

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const SENDER_EMAIL = process.env.SENDER_EMAIL || "Indian Minimalist <hello@indianminimalist.in>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@indianminimalist.in";

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

export async function sendNotifications(payload: NotificationPayload) {
  const results = {
    customerEmailSent: false,
    adminEmailSent: false,
    customerWhatsAppSent: false,
    adminWhatsAppSent: false,
  };

  // ----------------------------------------------------
  // 1. Transactional Emails (Customer & Admin) via Resend
  // ----------------------------------------------------
  if (resend) {
    try {
      // Customer Email
      let emailSubject = "";
      let emailHtml = "";

      if (payload.type === "LEAD_CREATED") {
        emailSubject = "Thank you for contacting Indian Minimalist";
        emailHtml = `
          <div style="font-family: serif; color: #2C362B; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #C86D51;">Hello ${payload.name},</h2>
            <p>Thank you for reaching out to <strong>Indian Minimalist Studio</strong>. We have received your inquiry and our team will get in touch with you shortly.</p>
            <p style="font-size: 0.9em; color: #666;">Warm regards,<br/>Indian Minimalist Styling Team</p>
          </div>
        `;
      } else if (payload.type === "PAYMENT_SUCCESS") {
        emailSubject = "Consultation Payment Confirmed — Indian Minimalist";
        emailHtml = `
          <div style="font-family: serif; color: #2C362B; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #C86D51;">Payment Confirmed</h2>
            <p>Dear ${payload.name},</p>
            <p>Your consultation payment of <strong>₹${payload.details?.amount || 1999}</strong> has been received successfully.</p>
            <p>Please proceed to select your preferred video consultation time slot if you haven't already.</p>
            <p style="font-size: 0.9em; color: #666;">Warm regards,<br/>Indian Minimalist Studio</p>
          </div>
        `;
      } else if (payload.type === "BOOKING_CONFIRMED") {
        emailSubject = "Consultation Confirmed — Indian Minimalist";
        emailHtml = `
          <div style="font-family: serif; color: #2C362B; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #C86D51;">Consultation Scheduled</h2>
            <p>Dear ${payload.name},</p>
            <p>Your 1-on-1 home styling consultation is confirmed for:</p>
            <p style="font-size: 1.1em; background: #FDFBF7; padding: 15px; border-left: 4px solid #C86D51;">
              <strong>Date:</strong> ${payload.details?.date}<br/>
              <strong>Time:</strong> ${payload.details?.slot}
            </p>
            ${payload.details?.meetLink ? `<p><a href="${payload.details.meetLink}" style="background: #C86D51; color: white; padding: 10px 18px; border-radius: 6px; text-decoration: none;">Join Google Meet Consultation</a></p>` : ""}
            <p style="font-size: 0.9em; color: #666;">Warm regards,<br/>Indian Minimalist Studio</p>
          </div>
        `;
      }

      const custRes = await resend.emails.send({
        from: SENDER_EMAIL,
        to: [payload.toEmail],
        subject: emailSubject,
        html: emailHtml,
      });

      results.customerEmailSent = Boolean(custRes.data?.id);

      await prisma.notification.create({
        data: {
          type: payload.type,
          channel: "EMAIL",
          recipient: payload.toEmail,
          template: payload.type,
          status: results.customerEmailSent ? "SENT" : "FAILED",
          metadata: JSON.stringify(custRes),
        },
      });

      // Admin Email Notification
      const adminRes = await resend.emails.send({
        from: SENDER_EMAIL,
        to: [ADMIN_EMAIL],
        subject: `[ADMIN ALERT] New ${payload.type} from ${payload.name}`,
        html: `
          <div style="font-family: sans-serif; color: #222;">
            <h3>New ${payload.type} Activity</h3>
            <p><strong>Name:</strong> ${payload.name}</p>
            <p><strong>Email:</strong> ${payload.toEmail}</p>
            <p><strong>Phone:</strong> ${payload.toPhone}</p>
            ${payload.details ? `<pre>${JSON.stringify(payload.details, null, 2)}</pre>` : ""}
          </div>
        `,
      });

      results.adminEmailSent = Boolean(adminRes.data?.id);

      await prisma.notification.create({
        data: {
          type: `ADMIN_${payload.type}`,
          channel: "EMAIL",
          recipient: ADMIN_EMAIL,
          template: `ADMIN_${payload.type}`,
          status: results.adminEmailSent ? "SENT" : "FAILED",
          metadata: JSON.stringify(adminRes),
        },
      });
    } catch (err: any) {
      console.error("[Email Notification Exception]", err?.message || err);
    }
  }

  // ----------------------------------------------------
  // 2. Meta WhatsApp Business Cloud API Integration
  // ----------------------------------------------------
  if (WHATSAPP_TOKEN && WHATSAPP_PHONE_NUMBER_ID) {
    try {
      let waText = "";
      if (payload.type === "LEAD_CREATED") {
        waText = `Hi ${payload.name}, thank you for reaching out to Indian Minimalist. We've received your inquiry and will get back to you shortly.`;
      } else if (payload.type === "PAYMENT_SUCCESS") {
        waText = `Hi ${payload.name}, your Indian Minimalist consultation payment of ₹${payload.details?.amount || 1999} has been received successfully.`;
      } else if (payload.type === "BOOKING_CONFIRMED") {
        waText = `Hi ${payload.name}, your consultation is confirmed for ${payload.details?.date} at ${payload.details?.slot}.`;
      }

      // Format recipient phone number
      const cleanPhone = payload.toPhone.replace(/[^\d]/g, "");
      const formattedPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;

      const waRes = await fetch(`https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: formattedPhone,
          type: "text",
          text: { body: waText },
        }),
      });

      const waData = await waRes.json();
      results.customerWhatsAppSent = waRes.ok;

      await prisma.notification.create({
        data: {
          type: payload.type,
          channel: "WHATSAPP",
          recipient: formattedPhone,
          template: payload.type,
          status: waRes.ok ? "SENT" : "FAILED",
          errorMessage: waRes.ok ? null : JSON.stringify(waData),
        },
      });
    } catch (err: any) {
      console.error("[WhatsApp Cloud API Exception]", err?.message || err);
    }
  }

  return { success: true, results, timestamp: new Date().toISOString() };
}
