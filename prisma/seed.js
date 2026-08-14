const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Indian Minimalist initial database...");

  // Default settings
  const settings = [
    { key: "consultation_fee", value: "1999" },
    { key: "consultation_currency", value: "INR" },
    { key: "business_email", value: "hello@indianminimalist.in" },
    { key: "business_phone", value: "+91 98765 43210" },
    { key: "whatsapp_number", value: "919876543210" },
    { key: "available_days", value: "Monday,Tuesday,Wednesday,Thursday,Friday,Saturday" },
    { key: "available_slots", value: "10:00 AM,11:30 AM,02:00 PM,04:00 PM,05:30 PM" },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
  }

  // Seed sample leads
  const lead1 = await prisma.lead.create({
    data: {
      name: "Ananya Sharma",
      email: "ananya.sharma@example.com",
      phone: "+91 98200 12345",
      city: "Bengaluru",
      status: "QUALIFIED",
      consultations: {
        create: {
          homeType: "3 BHK Apartment",
          spaces: JSON.stringify(["Living Room", "Master Bedroom", "Balcony"]),
          vibes: JSON.stringify(["Warm Minimalist", "Japandi"]),
          photos: JSON.stringify([
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800"
          ]),
          notes: "Looking to make living room feel open with natural wood and linen upholstery.",
          amount: 1999,
          paymentStatus: "PAID",
          paymentId: "pay_Nkp827419X",
          razorpayOrderId: "order_Nkp736192Z",
          appointmentDate: "2026-08-20",
          appointmentTimeSlot: "11:30 AM",
          status: "BOOKED",
        },
      },
    },
  });

  const lead2 = await prisma.lead.create({
    data: {
      name: "Vikramaditya Roy",
      email: "vikram.roy@example.com",
      phone: "+91 99300 98765",
      city: "Mumbai",
      status: "NEW",
      consultations: {
        create: {
          homeType: "2 BHK Apartment",
          spaces: JSON.stringify(["Living Room"]),
          vibes: JSON.stringify(["Modern Indian", "Minimalist"]),
          photos: JSON.stringify([]),
          notes: "Need help selecting terracotta accents and warm ambient lighting.",
          amount: 1999,
          paymentStatus: "PENDING",
          status: "DRAFT",
        },
      },
    },
  });

  console.log("Seeding complete successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
