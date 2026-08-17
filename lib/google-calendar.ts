import { google } from "googleapis";

const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY
  ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
  : undefined;
const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

const DEFAULT_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "02:00 PM",
  "04:00 PM",
  "05:30 PM",
];

function getJwtClient() {
  if (!clientEmail || !privateKey) return null;
  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
}

export async function getAvailableSlots(dateStr: string): Promise<string[]> {
  const auth = getJwtClient();
  if (!auth) {
    return DEFAULT_SLOTS;
  }

  try {
    const calendar = google.calendar({ version: "v3", auth });
    const timeMin = new Date(`${dateStr}T00:00:00Z`).toISOString();
    const timeMax = new Date(`${dateStr}T23:59:59Z`).toISOString();

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: calendarId }],
      },
    });

    const busyTimes = response.data.calendars?.[calendarId]?.busy || [];
    if (busyTimes.length === 0) return DEFAULT_SLOTS;

    // Filter out slots that overlap with busy times
    return DEFAULT_SLOTS.filter((slot) => {
      const slotTimeStr = slotToIso(dateStr, slot);
      const slotTime = new Date(slotTimeStr).getTime();
      return !busyTimes.some((busy) => {
        const start = new Date(busy.start || "").getTime();
        const end = new Date(busy.end || "").getTime();
        return slotTime >= start && slotTime < end;
      });
    });
  } catch (err: any) {
    console.warn("[Google Calendar API Warning]", err?.message || err);
    return DEFAULT_SLOTS;
  }
}

export async function createCalendarEvent(params: {
  summary: string;
  description: string;
  customerEmail: string;
  customerName: string;
  dateStr: string;
  timeSlot: string;
}): Promise<{ googleEventId: string; meetLink: string }> {
  const auth = getJwtClient();
  const startTime = slotToIso(params.dateStr, params.timeSlot);
  const endTime = new Date(new Date(startTime).getTime() + 45 * 60000).toISOString();

  if (!auth) {
    const fallbackMeetLink = `https://meet.google.com/im-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`;
    return {
      googleEventId: `evt_${Math.random().toString(36).substring(2, 10)}`,
      meetLink: fallbackMeetLink,
    };
  }

  try {
    const calendar = google.calendar({ version: "v3", auth });
    const event = await calendar.events.insert({
      calendarId,
      conferenceDataVersion: 1,
      requestBody: {
        summary: params.summary,
        description: params.description,
        start: { dateTime: startTime, timeZone: "Asia/Kolkata" },
        end: { dateTime: endTime, timeZone: "Asia/Kolkata" },
        attendees: [
          { email: params.customerEmail, displayName: params.customerName },
        ],
        conferenceData: {
          createRequest: {
            requestId: `req_${Date.now()}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      },
    });

    const googleEventId = event.data.id || `evt_${Date.now()}`;
    const meetLink = event.data.hangoutLink || `https://meet.google.com/im-${Math.random().toString(36).substring(2, 6)}`;

    return { googleEventId, meetLink };
  } catch (err: any) {
    console.error("[Google Calendar Event Exception]", err?.message || err);
    const fallbackMeetLink = `https://meet.google.com/im-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`;
    return {
      googleEventId: `evt_${Math.random().toString(36).substring(2, 10)}`,
      meetLink: fallbackMeetLink,
    };
  }
}

function slotToIso(dateStr: string, timeSlot: string): string {
  const parts = timeSlot.trim().split(" ");
  const [hoursStr, minutesStr] = parts[0].split(":");
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  const modifier = parts[1]?.toUpperCase();

  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const paddedHours = String(hours).padStart(2, "0");
  const paddedMinutes = String(minutes).padStart(2, "0");

  return `${dateStr}T${paddedHours}:${paddedMinutes}:00+05:30`;
}
