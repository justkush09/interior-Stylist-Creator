# INDIAN MINIMALIST — Production Project Documentation

> **Brand Ethos**: Premium home decor styling & consultation platform celebrating warm Indian textures, terracotta, natural teakwood, hand-loom cottons, and serene minimalist spaces.

---

## 📌 Executive Summary

**Indian Minimalist** is a production-ready home interior styling web application built on Next.js 14. It handles two complete customer journeys:
1. **Lead & Inquiry Funnel**: Captures initial visitor interest with UTM tracking and automated dual notifications (Resend Email & Meta WhatsApp Cloud API).
2. **Paid Consultation Booking Engine**: A seamless 9-step intake questionnaire aligned with official Google Form requirements, complete with room photo uploads, Razorpay payment processing (with HMAC webhook verification), and automated Google Calendar / Google Meet scheduling.

---

## 🛠 Technology Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Vanilla CSS Design System + Tailwind CSS (`app/globals.css`, `tailwind.config.ts`)
- **Database & ORM**: Prisma ORM v5 with SQLite (Local Development) & PostgreSQL (Production deployment ready)
- **Payments**: Razorpay SDK (`razorpay`) with HMAC SHA-256 webhook signature verification
- **Scheduling**: Google Calendar API (`googleapis`) with `freebusy.query` slot calculation & Google Meet link generation
- **Communications**: Resend Transactional Email Engine & Meta WhatsApp Business Cloud API
- **Icons**: Lucide React (`lucide-react`)

---

## 🗄 Database Models (`prisma/schema.prisma`)

1. **`Customer`**: Unique client records linked across multiple inquiries and consultations (`email`, `phone`, `name`).
2. **`Lead`**: Initial inquiries with UTM parameters (`utmSource`, `utmMedium`, `utmCampaign`) and status workflow (`NEW`, `CONTACTED`, `FOLLOW_UP`, `CONVERTED`, `CLOSED`).
3. **`Consultation`**: Master intake record tracking room preferences, budget tier, payment status (`PAYMENT_PENDING`, `PAID`), and scheduling state (`SCHEDULING_PENDING`, `SCHEDULED`, `COMPLETED`, `CANCELLED`).
4. **`ConsultationAnswer`**: Key-value pairs for granular questionnaire responses.
5. **`UploadedImage`**: Private room photos uploaded during intake, served via authenticated endpoint `/api/images/[id]`.
6. **`Payment`**: Financial ledger recording Razorpay order ID, payment ID, signature, amount, and raw webhook payloads.
7. **`Appointment`**: Verified consultation bookings storing start/end time in IST (`Asia/Kolkata`), Google Event ID, and live Google Meet video link.
8. **`Notification`**: Audit trail of outgoing Resend emails and Meta WhatsApp messages.
9. **`AnalyticsEvent`**: High-volume conversion event log (`page_view`, `consultation_started`, `lead_submitted`, `form_completed`, `payment_success`, `appointment_booked`).
10. **`Setting`**: Operational key-value configurations for dynamic slot and pricing management.

---

## 📋 9-Step Consultation Intake Flow (`/book`)

1. **Step 1: Contact Details** — Name, Phone Number, Email Address, City/Location.
2. **Step 2: Property Type** — 1 BHK, 2 BHK, 3 BHK, Villa, or Commercial Office.
3. **Step 3: Spaces to Style** — Living Room, Master Bedroom, Dining Room, Balcony, etc.
4. **Step 4: Decor Vibe & Aesthetic** — Japandi Warmth, Terracotta & Teak, Modern Earthy, Minimalist Brass.
5. **Step 5: Budget & Timeline** — Project budget tier selection.
6. **Step 6: Room Photo Upload** — Visual tips for room lighting & angles + secure photo upload handler.
7. **Step 7: Detailed Review** — Overview of all choices before payment.
8. **Step 8: Razorpay Payment** — Real Razorpay Checkout trigger (₹1,999 session fee).
9. **Step 9: Calendar Scheduling** — Real-time Google Calendar slot selection & Google Meet generation.

---

## 🔌 API Endpoints Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/leads` | `POST` | Upserts customer, creates lead with UTM data, triggers NEW notifications |
| `/api/consultations` | `POST` / `GET` | Creates or retrieves consultation intake records and answers |
| `/api/images` | `POST` | Validates (max 10MB, JPG/PNG/WEBP) and stores uploaded room photos |
| `/api/images/[id]` | `GET` | Securely serves stored room photo file |
| `/api/payment/create-order` | `POST` | Generates official Razorpay Order ID and pending Payment record |
| `/api/payment/verify` | `POST` | Verifies HMAC SHA-256 client signature and updates status to PAID |
| `/api/webhooks/razorpay` | `POST` | Idempotent webhook receiver for asynchronous payment.captured events |
| `/api/calendar/slots` | `GET` | Queries Google Calendar freebusy and DB reservations for free slots |
| `/api/calendar/book` | `POST` | Locks slot, creates Google Meet event, and sends invitations |
| `/api/analytics/event` | `POST` | Records funnel conversion analytics events |
| `/api/admin/metrics` | `GET` | Aggregates DB metrics, conversion rates, and revenue for admin dashboard |

---

## 🔑 Environment Variables Template (`.env`)

```env
# Database Connection (PostgreSQL for production, SQLite for local dev)
DATABASE_URL="file:./dev.db"

# Razorpay Production Keys
RAZORPAY_KEY_ID="rzp_live_xxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="xxxxxxxxxxxxxxxxxxxxxxxx"
RAZORPAY_WEBHOOK_SECRET="whsec_xxxxxxxxxxxx"

# Resend Transactional Email Key
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxx"
FROM_EMAIL="consultations@indianminimalist.com"

# Meta WhatsApp Business Cloud API
WHATSAPP_TOKEN="EAAGxxxxxxxxxxxxxxxxxxxxxxxx"
WHATSAPP_PHONE_NUMBER_ID="1234567890"

# Google Calendar Service Account Credentials
GOOGLE_CLIENT_EMAIL="indian-minimalist-service@project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID="consultations@indianminimalist.com"
```

---

## 💻 Commands & Local Operations

- **Start Local Server**: `npm run dev` (Runs at `http://localhost:3000`)
- **Run Production Build**: `npm run build`
- **Start Production Server**: `npm start`
- **Sync Database Schema**: `npx prisma db push`
- **Open Database Studio UI**: `npx prisma studio`

---

*Documentation compiled on 2026-08-14 for Indian Minimalist Studio.*
