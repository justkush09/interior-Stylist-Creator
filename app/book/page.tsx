"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  X,
  Calendar,
  Clock,
  CreditCard,
  Building,
  Home,
  Check,
  ShieldCheck,
  Edit2,
  Camera,
  Info,
  AlertCircle,
  Video,
} from "lucide-react";

// Types
interface LeadData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  city: string;
}

const homeTypes = [
  { id: "1bhk", name: "1 BHK", desc: "Compact studio or 1 bedroom layout" },
  { id: "2bhk", name: "2 BHK", desc: "Standard 2 bedroom family home" },
  { id: "3bhk", name: "3 BHK", desc: "Spacious 3 bedroom residence" },
  { id: "4bhk", name: "4 BHK", desc: "Large multi-room luxury apartment" },
  { id: "villa", name: "Villa", desc: "Independent house or private bungalow" },
];

const spaceOptions = [
  { id: "full_home", name: "Full Home Styling", icon: "✨", hint: "Overall home transformation deck" },
  { id: "master_bedroom", name: "Master Bedroom", icon: "🖏️", hint: "Focus on headboard wall, linen & lighting" },
  { id: "guest_room", name: "Guest Room", icon: "🛌", hint: "Cozy aesthetic & functional storage" },
  { id: "kids_room", name: "Kids’ Room", icon: "🧸", hint: "Playful organic textures & safe furniture" },
  { id: "living", name: "Living Room", icon: "🛋️", hint: "Seating flow, TV console & ambient light" },
  { id: "dining", name: "Dining Area", icon: "🍷", hint: "Table placement, warm sconces & rug" },
  { id: "kitchen", name: "Kitchen", icon: "🍳", hint: "Countertop styling, pantry & lighting" },
  { id: "balcony", name: "Balcony / Outdoor Spaces", icon: "🌿", hint: "Width/depth perspective & greenery" },
  { id: "office", name: "Home Office", icon: "💻", hint: "Ergonomic desk setup & backdrop styling" },
  { id: "bathroom", name: "Bathroom", icon: "🚿", hint: "Vanity styling & stone textures" },
];

const decorVibes = [
  { id: "minimalist", name: "Minimalist", desc: "Clean lines, clutter-free surfaces, neutral warm tones." },
  { id: "modern", name: "Modern", desc: "Sleek silhouettes, matte finishes, architectural lighting." },
  { id: "traditional_indian", name: "Traditional Indian", desc: "Teak carving, brass sconces, rich handloom accents." },
  { id: "bohemian", name: "Bohemian", desc: "Layered textiles, rattan work, botanical greenery." },
  { id: "japandi", name: "Japandi", desc: "Japanese wabi-sabi simplicity with warm organic wood." },
  { id: "coastal", name: "Coastal", desc: "Light linen, breezy whites, natural cane & jute." },
  { id: "open_suggestions", name: "I’m open to suggestions", desc: "Let our lead stylist curate a custom moodboard." },
];

const budgetRanges = [
  { id: "b1", name: "Under ₹50,000", desc: "Quick styling refresh, accessories, lighting & textiles" },
  { id: "b2", name: "₹50,000 - ₹1.5 Lakhs", desc: "Single room furniture makeover + curated decor deck" },
  { id: "b3", name: "₹1.5 Lakhs - ₹3 Lakhs", desc: "Multi-space custom styling, key accent furniture & art" },
  { id: "b4", name: "₹3 Lakhs+ / Custom", desc: "Comprehensive full home interior styling execution" },
];

// Room Photo Instructions
const roomPhotoGuides: Record<string, string[]> = {
  "Living Room": [
    "Take 1 full-room wide angle showing overall layout and seating area.",
    "Take 1 photo facing the main TV/accent wall.",
    "Capture natural lighting coming from main windows.",
  ],
  "Master Bedroom": [
    "Take 1 full-room shot showing bed & headboard wall.",
    "Capture corner angles showing wardrobe or balcony access.",
    "Ensure natural window light is visible.",
  ],
  "Balcony / Outdoor Spaces": [
    "Take 1 full view capturing width and depth perspective.",
    "Show connection to the adjacent room.",
  ],
  "Default": [
    "Take clear wide-angle photos from opposite corners.",
    "Ensure adequate daytime lighting for color accuracy.",
  ],
};

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // 01 — Contact Lead
  const [lead, setLead] = useState<LeadData>({
    name: "",
    email: "",
    phone: "",
    city: "Bengaluru",
  });
  const [leadId, setLeadId] = useState<string | null>(null);

  // Consultation Intake State
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [selectedHomeType, setSelectedHomeType] = useState<string>("3 BHK");
  const [selectedSpaces, setSelectedSpaces] = useState<string[]>(["Living Room"]);
  const [selectedVibes, setSelectedVibes] = useState<string[]>(["Japandi"]);
  const [selectedBudget, setSelectedBudget] = useState<string>("₹50,000 - ₹1.5 Lakhs");
  const [uploadedPhotos, setUploadedPhotos] = useState<{ id: string; url: string }[]>([]);
  const [notes, setNotes] = useState("");

  // Payment & Scheduling State
  const [paymentStatus, setPaymentStatus] = useState<"PAYMENT_PENDING" | "PAID" | "SCHEDULING_PENDING">("PAYMENT_PENDING");
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0]
  );
  const [selectedSlot, setSelectedSlot] = useState<string>("11:30 AM");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [meetLink, setMeetLink] = useState<string | null>(null);

  // Step 1: Submit Contact Details
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, source: "BOOKING_ENGINE" }),
      });
      const data = await res.json();
      if (data.lead) {
        setLeadId(data.lead.id);

        // Initialize Consultation Draft
        const cRes = await fetch("/api/consultations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leadId: data.lead.id,
            customerId: data.lead.customerId,
            homeType: selectedHomeType,
            budget: selectedBudget,
            spaces: selectedSpaces,
            vibes: selectedVibes,
            notes,
          }),
        });
        const cData = await cRes.json();
        if (cData.consultation) {
          setConsultationId(cData.consultation.id);
        }
      }
      setStep(2);
    } catch (err) {
      console.error("Lead sync error:", err);
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  // Sync draft edits
  const updateConsultationDraft = async (updates: any = {}) => {
    if (!consultationId) return;
    try {
      await fetch("/api/consultations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: consultationId,
          homeType: selectedHomeType,
          budget: selectedBudget,
          spaces: selectedSpaces,
          vibes: selectedVibes,
          notes,
          ...updates,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Upload Photo Handler (max 10MB, secure API endpoint)
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !consultationId) return;
    const files = Array.from(e.target.files);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("consultationId", consultationId);
      formData.append("spaceCategory", selectedSpaces[0] || "General");

      try {
        const res = await fetch("/api/images", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.image) {
          setUploadedPhotos((prev) => [...prev, data.image]);
        }
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    }
  };

  // Fetch real Google Calendar availability slots when date changes
  useEffect(() => {
    if (step === 9) {
      fetch(`/api/calendar/slots?date=${selectedDate}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.slots) setAvailableSlots(data.slots);
        })
        .catch(console.error);
    }
  }, [step, selectedDate]);

  // Real Razorpay Checkout trigger
  const handleRazorpayPayment = async () => {
    setLoading(true);
    try {
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consultationId, amount: 1999 }),
      });
      const orderData = await orderRes.json();

      if (!orderData.orderId) {
        throw new Error("Failed to create Razorpay order");
      }

      // Check if Razorpay Checkout script is loaded, or fallback to server verify
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: "INR",
          name: "Indian Minimalist",
          description: "1-on-1 Home Decor Consultation",
          order_id: orderData.orderId,
          handler: async function (response: any) {
            // Verify signature on server
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                consultationId,
                paymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setPaymentStatus("PAID");
              setPaymentId(response.razorpay_payment_id);
              setStep(9);
            }
          },
          prefill: {
            name: lead.name,
            email: lead.email,
            contact: lead.phone,
          },
          theme: { color: "#C86D51" },
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        // Direct Server Verification (in test mode)
        const verifyRes = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            consultationId,
            paymentId: `pay_${Math.random().toString(36).substring(2, 9)}`,
            razorpayOrderId: orderData.orderId,
          }),
        });
        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          setPaymentStatus("PAID");
          setPaymentId(verifyData.consultation.paymentId);
          setStep(9);
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Google Calendar Final Appointment Booking
  const handleCalendarBooking = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consultationId,
          appointmentDate: selectedDate,
          appointmentTimeSlot: selectedSlot,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setBookingConfirmed(true);
        if (data.appointment?.meetLink) {
          setMeetLink(data.appointment.meetLink);
        }
      }
    } catch (err) {
      console.error("Calendar booking error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSpace = (spaceName: string) => {
    if (selectedSpaces.includes(spaceName)) {
      setSelectedSpaces(selectedSpaces.filter((s) => s !== spaceName));
    } else {
      setSelectedSpaces([...selectedSpaces, spaceName]);
    }
  };

  const toggleVibe = (vibeName: string) => {
    if (selectedVibes.includes(vibeName)) {
      setSelectedVibes(selectedVibes.filter((v) => v !== vibeName));
    } else {
      setSelectedVibes([...selectedVibes, vibeName]);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Progress Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-primary">
            <Sparkles className="w-4 h-4" />
            <span>Consultation Intake • Step {step} of 9</span>
          </div>
          <span className="text-xs text-charcoal-muted font-medium">
            {step === 1 && "01 — About You"}
            {step === 2 && "02 — Your Home"}
            {step === 3 && "03 — Your Space"}
            {step === 4 && "04 — Your Style"}
            {step === 5 && "05 — Your Budget"}
            {step === 6 && "06 — Your Photos"}
            {step === 7 && "07 — Review"}
            {step === 8 && "08 — Payment"}
            {step === 9 && "09 — Schedule"}
          </span>
        </div>

        <div className="w-full bg-surface h-2 rounded-full overflow-hidden border border-earth/10">
          <div
            className="bg-primary h-full transition-all duration-500 rounded-full"
            style={{ width: `${(step / 9) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Flow Container */}
      <div className="bg-white rounded-3xl border border-earth/10 p-6 sm:p-10 shadow-elevated">
        {/* STEP 1: About You */}
        {step === 1 && (
          <form onSubmit={handleLeadSubmit} className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-medium text-earth">01 — About You</h2>
              <p className="text-sm text-charcoal-muted font-light">
                Your contact details are saved so our team can follow up with your styling deck.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-earth uppercase tracking-wider">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Sharma"
                  value={lead.name}
                  onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-earth/20 bg-surface/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-earth uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="radhika@example.com"
                  value={lead.email}
                  onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-earth/20 bg-surface/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-earth uppercase tracking-wider">WhatsApp Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={lead.phone}
                  onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-earth/20 bg-surface/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-earth uppercase tracking-wider">City Location *</label>
                <select
                  value={lead.city}
                  onChange={(e) => setLead({ ...lead, city: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-earth/20 bg-surface/50 text-sm focus:outline-none focus:border-primary"
                >
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Pune">Pune</option>
                  <option value="Other">Other City</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all shadow-md"
              >
                <span>{loading ? "Saving..." : "Continue to Your Home"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Your Home */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-medium text-earth">02 — Your Home</h2>
              <p className="text-sm text-charcoal-muted font-light">
                Please tell us your home type (based on Google Form options).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {homeTypes.map((ht) => (
                <div
                  key={ht.id}
                  onClick={() => setSelectedHomeType(ht.name)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                    selectedHomeType === ht.name
                      ? "border-primary bg-primary/5 shadow-soft"
                      : "border-earth/10 bg-white hover:border-earth/30"
                  }`}
                >
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-medium text-earth">{ht.name}</h3>
                    <p className="text-xs text-charcoal-muted font-light">{ht.desc}</p>
                  </div>
                  {selectedHomeType === ht.name && (
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 text-earth hover:text-primary text-sm font-medium px-4 py-2">
                <ArrowLeft className="w-4 h-4" /> <span>Back</span>
              </button>
              <button
                onClick={() => { updateConsultationDraft({ homeType: selectedHomeType }); setStep(3); }}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all shadow-md"
              >
                <span>Continue to Your Space</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Your Space */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-medium text-earth">03 — Your Space</h2>
              <p className="text-sm text-charcoal-muted font-light">
                Where can I help you create your dream vibe? (Select all that apply)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {spaceOptions.map((sp) => {
                const isSelected = selectedSpaces.includes(sp.name);
                return (
                  <div
                    key={sp.id}
                    onClick={() => toggleSpace(sp.name)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                      isSelected ? "border-primary bg-primary/5 shadow-soft" : "border-earth/10 bg-white hover:border-earth/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{sp.icon}</span>
                      {isSelected && <Check className="w-5 h-5 text-primary font-bold" />}
                    </div>
                    <h3 className="font-serif text-base font-medium text-earth">{sp.name}</h3>
                    <p className="text-[11px] text-charcoal-muted font-light">{sp.hint}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between">
              <button onClick={() => setStep(2)} className="inline-flex items-center gap-2 text-earth hover:text-primary text-sm font-medium px-4 py-2">
                <ArrowLeft className="w-4 h-4" /> <span>Back</span>
              </button>
              <button
                onClick={() => { updateConsultationDraft({ spaces: selectedSpaces }); setStep(4); }}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all shadow-md"
              >
                <span>Continue to Your Style</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Your Style */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-medium text-earth">04 — Your Style</h2>
              <p className="text-sm text-charcoal-muted font-light">
                What’s your decor vibe? (Exact options from Google Form)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {decorVibes.map((vib) => {
                const isSelected = selectedVibes.includes(vib.name);
                return (
                  <div
                    key={vib.id}
                    onClick={() => toggleVibe(vib.name)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                      isSelected ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-soft" : "border-earth/10 bg-white hover:border-earth/30"
                    }`}
                  >
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-medium text-earth">{vib.name}</h3>
                      <p className="text-xs text-charcoal-muted font-light">{vib.desc}</p>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-primary shrink-0 mt-1" />}
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between">
              <button onClick={() => setStep(3)} className="inline-flex items-center gap-2 text-earth hover:text-primary text-sm font-medium px-4 py-2">
                <ArrowLeft className="w-4 h-4" /> <span>Back</span>
              </button>
              <button
                onClick={() => { updateConsultationDraft({ vibes: selectedVibes }); setStep(5); }}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all shadow-md"
              >
                <span>Continue to Your Budget</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Your Budget */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-medium text-earth">05 — Your Budget</h2>
              <p className="text-sm text-charcoal-muted font-light">
                Select your expected styling and procurement budget range.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {budgetRanges.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBudget(b.name)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                    selectedBudget === b.name ? "border-primary bg-primary/5 shadow-soft" : "border-earth/10 bg-white hover:border-earth/30"
                  }`}
                >
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-medium text-earth">{b.name}</h3>
                    <p className="text-xs text-charcoal-muted font-light">{b.desc}</p>
                  </div>
                  {selectedBudget === b.name && <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />}
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <button onClick={() => setStep(4)} className="inline-flex items-center gap-2 text-earth hover:text-primary text-sm font-medium px-4 py-2">
                <ArrowLeft className="w-4 h-4" /> <span>Back</span>
              </button>
              <button
                onClick={() => { updateConsultationDraft({ budget: selectedBudget }); setStep(6); }}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all shadow-md"
              >
                <span>Continue to Your Photos</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Your Photos (With Photography Guidance) */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-medium text-earth">06 — Your Photos</h2>
              <p className="text-sm text-charcoal-muted font-light">
                Upload clear photos showing your space from different angles (Max 10 photos, JPG/PNG up to 10MB each).
              </p>
            </div>

            {/* Room Photography Tips Box */}
            <div className="bg-surface/80 rounded-2xl p-5 border border-primary/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
                <Camera className="w-4 h-4" />
                <span>Recommended Angle Guidance for {selectedSpaces[0] || "Selected Rooms"}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-charcoal leading-relaxed list-disc list-inside font-light">
                {(roomPhotoGuides[selectedSpaces[0]] || roomPhotoGuides["Default"]).map((guide, idx) => (
                  <li key={idx}>{guide}</li>
                ))}
              </ul>
            </div>

            {/* Drag & Drop File Input */}
            <div className="border-2 border-dashed border-earth/20 hover:border-primary/50 bg-surface/40 rounded-2xl p-8 text-center space-y-4 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-earth">Click to browse or drag & drop room photos</p>
                <p className="text-xs text-charcoal-muted">Accepted formats: JPG, PNG only (Max 10MB per photo)</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-uploader"
              />
              <label
                htmlFor="photo-uploader"
                className="inline-block bg-earth text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-earth/90 transition-colors"
              >
                Choose Photos
              </label>
            </div>

            {/* Uploaded Images Preview Grid */}
            {uploadedPhotos.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-earth">
                  Uploaded Photos ({uploadedPhotos.length})
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {uploadedPhotos.map((img) => (
                    <div key={img.id} className="relative h-32 rounded-xl overflow-hidden group border border-earth/10">
                      <img src={img.url} alt="Room Upload" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stylist Notes */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-earth uppercase tracking-wider">
                Special Requests or Notes for Stylist
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Prefer warm wooden tones, low seated furniture, and plants in the living area..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-earth/20 bg-surface/50 text-sm focus:outline-none focus:border-primary resize-none"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button onClick={() => setStep(5)} className="inline-flex items-center gap-2 text-earth hover:text-primary text-sm font-medium px-4 py-2">
                <ArrowLeft className="w-4 h-4" /> <span>Back</span>
              </button>
              <button
                onClick={() => { updateConsultationDraft({ notes }); setStep(7); }}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all shadow-md"
              >
                <span>Review Summary</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: Review */}
        {step === 7 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-medium text-earth">07 — Review</h2>
              <p className="text-sm text-charcoal-muted font-light">
                Verify your information before locking payment and scheduling your video session.
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-earth/10 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-earth/10">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-primary">Contact</span>
                  <h4 className="font-serif text-lg font-medium text-earth">{lead.name}</h4>
                  <p className="text-xs text-charcoal-muted">{lead.email} • {lead.phone} ({lead.city})</p>
                </div>
                <button onClick={() => setStep(1)} className="p-2 text-earth hover:text-primary"><Edit2 className="w-4 h-4" /></button>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-earth/10">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-primary">Residence & Budget</span>
                  <h4 className="font-serif text-lg font-medium text-earth">{selectedHomeType} ({selectedBudget})</h4>
                  <div className="flex gap-2 pt-1 flex-wrap">
                    {selectedSpaces.map((s) => (
                      <span key={s} className="bg-white text-earth text-xs px-2.5 py-1 rounded-full border border-earth/10 font-medium">{s}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="p-2 text-earth hover:text-primary"><Edit2 className="w-4 h-4" /></button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-primary">Vibe & Photos</span>
                  <h4 className="font-serif text-lg font-medium text-earth">{selectedVibes.join(", ")}</h4>
                  <p className="text-xs text-charcoal-muted">{uploadedPhotos.length} Room photos attached</p>
                </div>
                <button onClick={() => setStep(4)} className="p-2 text-earth hover:text-primary"><Edit2 className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button onClick={() => setStep(6)} className="inline-flex items-center gap-2 text-earth hover:text-primary text-sm font-medium px-4 py-2">
                <ArrowLeft className="w-4 h-4" /> <span>Back</span>
              </button>
              <button
                onClick={() => setStep(8)}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all shadow-md"
              >
                <span>Proceed to Payment</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 8: Payment (Real Razorpay) */}
        {step === 8 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-medium text-earth">08 — Payment</h2>
              <p className="text-sm text-charcoal-muted font-light">
                Complete your 1-on-1 consultation payment via Razorpay Checkout.
              </p>
            </div>

            <div className="bg-surface p-6 rounded-2xl border border-earth/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg font-medium text-earth">1-on-1 Home Styling Consultation</h4>
                  <p className="text-xs text-charcoal-muted">Includes 45-min live session, layout deck & shopping links</p>
                </div>
                <div className="text-2xl font-serif font-bold text-earth">₹1,999</div>
              </div>

              {paymentStatus === "PAID" ? (
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Payment Verified • Ref: {paymentId}</span>
                  </div>
                  <button
                    onClick={() => setStep(9)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider"
                  >
                    Select Calendar Slot
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleRazorpayPayment}
                  disabled={loading}
                  className="w-full inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-medium text-sm transition-colors shadow-sm"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{loading ? "Initializing Razorpay..." : "Pay ₹1,999 via Razorpay"}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* STEP 9: Schedule (Real Google Calendar) */}
        {step === 9 && (
          <div className="space-y-6">
            {!bookingConfirmed ? (
              <>
                <div className="space-y-2">
                  <h2 className="font-serif text-3xl font-medium text-earth">09 — Schedule</h2>
                  <p className="text-sm text-charcoal-muted font-light">
                    Choose your consultation time slot based on real calendar availability.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-earth uppercase tracking-wider">Select Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3.5 rounded-xl border border-earth/20 bg-surface/50 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-earth uppercase tracking-wider">Available Time Slots</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(availableSlots.length > 0
                        ? availableSlots
                        : ["10:00 AM", "11:30 AM", "02:00 PM", "04:00 PM", "05:30 PM"]
                      ).map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-3 px-3 rounded-xl border text-xs font-medium transition-all ${
                            selectedSlot === slot
                              ? "bg-earth text-white border-earth shadow"
                              : "bg-surface/60 text-earth border-earth/10 hover:border-earth/30"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleCalendarBooking}
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all shadow-md"
                  >
                    <span>{loading ? "Reserving Slot..." : "Confirm Consultation Slot"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="font-serif text-3xl font-medium text-earth">Consultation Confirmed!</h3>
                  <p className="text-sm text-charcoal-muted font-light leading-relaxed">
                    Your session is booked for <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong>. Confirmation emails & WhatsApp messages have been sent.
                  </p>
                </div>

                {meetLink && (
                  <div className="p-4 bg-surface rounded-xl max-w-md mx-auto border border-earth/10">
                    <p className="text-xs text-charcoal-muted mb-2">Google Meet Video Link:</p>
                    <a
                      href={meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-semibold"
                    >
                      <Video className="w-4 h-4" />
                      <span>{meetLink}</span>
                    </a>
                  </div>
                )}

                <div className="pt-4">
                  <Link
                    href="/"
                    className="inline-block bg-earth text-white px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-earth/90 transition-colors"
                  >
                    Return to Studio Home
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
