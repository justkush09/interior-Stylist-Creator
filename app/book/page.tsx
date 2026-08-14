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
  { id: "1bhk", name: "1 BHK Apartment", desc: "Compact studio or 1 bedroom apartment" },
  { id: "2bhk", name: "2 BHK Apartment", desc: "Standard 2 bedroom family layout" },
  { id: "3bhk", name: "3 BHK Apartment", desc: "Spacious 3 bedroom residence" },
  { id: "4bhk", name: "4 BHK Apartment", desc: "Large luxury apartment" },
  { id: "villa", name: "Villa / Independent House", desc: "Multi-story house or private villa" },
];

const spaceOptions = [
  { id: "living", name: "Living Room", icon: "🛋️", hint: "Capture natural light from windows" },
  { id: "bedroom", name: "Master Bedroom", icon: "🖏️", hint: "Show headboard wall & natural light" },
  { id: "dining", name: "Dining Area", icon: "🍷", hint: "Include seating flow & light fixtures" },
  { id: "balcony", name: "Balcony / Terrace", icon: "🌿", hint: "Focus on view & greenery space" },
  { id: "office", name: "Home Office / Study", icon: "💻", hint: "Show desk orientation & outlets" },
  { id: "full_home", name: "Full Residence", icon: "✨", hint: "Overview of all major rooms" },
];

const decorVibes = [
  {
    id: "warm_minimalist",
    name: "Warm Minimalist",
    desc: "Creamy ivory walls, low-slung teak sofas, unbleached linen, terracotta urns.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600",
  },
  {
    id: "japandi",
    name: "Japandi Indian",
    desc: "Japanese wabi-sabi simplicity blended with Indian cane work & brass sconces.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600",
  },
  {
    id: "contemporary_indian",
    name: "Contemporary Indian",
    desc: "Earthy block prints, solid wood carving, muted saffron accents, warm ambient light.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
  },
  {
    id: "organic_boho",
    name: "Organic Earthy",
    desc: "Jute rugs, lush indoor flora, macrame touches, raw clay pottery.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600",
  },
];

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Lead State
  const [lead, setLead] = useState<LeadData>({
    name: "",
    email: "",
    phone: "",
    city: "Bengaluru",
  });
  const [leadId, setLeadId] = useState<string | null>(null);

  // Consultation State
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [selectedHomeType, setSelectedHomeType] = useState<string>("3 BHK Apartment");
  const [selectedSpaces, setSelectedSpaces] = useState<string[]>(["Living Room"]);
  const [selectedVibes, setSelectedVibes] = useState<string[]>(["Warm Minimalist"]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  // Payment & Scheduling State
  const [paymentStatus, setPaymentStatus] = useState<"PENDING" | "PAID">("PENDING");
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0]
  );
  const [selectedSlot, setSelectedSlot] = useState<string>("11:30 AM");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Auto-sync Lead on Step 1 submission
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      const data = await res.json();
      if (data.lead) {
        setLeadId(data.lead.id);

        // Also initialize Consultation Draft
        const cRes = await fetch("/api/consultations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leadId: data.lead.id,
            homeType: selectedHomeType,
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
      console.error("Lead sync failed:", err);
      setStep(2); // proceed smoothly anyway
    } finally {
      setLoading(false);
    }
  };

  // Sync Consultation draft when step updates
  const updateConsultationDraft = async (updates: any = {}) => {
    if (!consultationId) return;
    try {
      await fetch("/api/consultations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: consultationId,
          homeType: selectedHomeType,
          spaces: selectedSpaces,
          vibes: selectedVibes,
          photos,
          notes,
          ...updates,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Photo uploader handling
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotos((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  // Fetch available slots when date changes
  useEffect(() => {
    if (step === 7) {
      fetch(`/api/calendar/slots?date=${selectedDate}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.slots) setAvailableSlots(data.slots);
        })
        .catch(console.error);
    }
  }, [step, selectedDate]);

  // Payment Handler
  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Create order
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consultationId, amount: 1999 }),
      });
      const orderData = await orderRes.json();

      // 2. Verify payment (simulated or real signature)
      const verifyRes = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consultationId,
          paymentId: `pay_sim_${Math.random().toString(36).substring(2, 9)}`,
          razorpayOrderId: orderData.orderId,
        }),
      });
      const verifyData = await verifyRes.json();

      if (verifyData.success) {
        setPaymentStatus("PAID");
        setPaymentId(verifyData.consultation.paymentId);
      }
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Final Slot Booking Handler
  const handleFinalBooking = async () => {
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
      }
    } catch (err) {
      console.error(err);
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
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-primary">
            <Sparkles className="w-4 h-4" />
            <span>Consultation Intake • Step {step} of 7</span>
          </div>
          <span className="text-xs text-charcoal-muted font-medium">
            {step === 1 && "Contact Information"}
            {step === 2 && "Home Layout"}
            {step === 3 && "Spaces to Style"}
            {step === 4 && "Decor Aesthetic"}
            {step === 5 && "Photo Upload"}
            {step === 6 && "Summary & Review"}
            {step === 7 && "Payment & Calendar Slot"}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-surface h-2 rounded-full overflow-hidden border border-earth/10">
          <div
            className="bg-primary h-full transition-all duration-500 rounded-full"
            style={{ width: `${(step / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Multi-Step Container */}
      <div className="bg-white rounded-3xl border border-earth/10 p-6 sm:p-10 shadow-elevated">
        {/* STEP 1: Contact Details */}
        {step === 1 && (
          <form onSubmit={handleLeadSubmit} className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-medium text-earth">Welcome. Let's start with your details</h2>
              <p className="text-sm text-charcoal-muted font-light">
                Your contact details are saved in the background so your responses are never lost.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-earth uppercase tracking-wider">Your Full Name *</label>
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
                <span>{loading ? "Saving..." : "Continue to Home Details"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Home Type */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-medium text-earth">What type of residence are we styling?</h2>
              <p className="text-sm text-charcoal-muted font-light">
                Select your home configuration so we can tailor layout proportions.
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
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 text-earth hover:text-primary text-sm font-medium px-4 py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => {
                  updateConsultationDraft({ homeType: selectedHomeType });
                  setStep(3);
                }}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all shadow-md"
              >
                <span>Continue to Spaces</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Space Selection */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-medium text-earth">Which spaces need styling attention?</h2>
              <p className="text-sm text-charcoal-muted font-light">
                Select one or multiple rooms you wish to transform during the consultation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {spaceOptions.map((sp) => {
                const isSelected = selectedSpaces.includes(sp.name);
                return (
                  <div
                    key={sp.id}
                    onClick={() => toggleSpace(sp.name)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 relative ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-soft"
                        : "border-earth/10 bg-white hover:border-earth/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{sp.icon}</span>
                      {isSelected && <Check className="w-5 h-5 text-primary font-bold" />}
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-medium text-earth">{sp.name}</h3>
                      <p className="text-[11px] text-primary/80 font-medium pt-1">💡 {sp.hint}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 text-earth hover:text-primary text-sm font-medium px-4 py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => {
                  updateConsultationDraft({ spaces: selectedSpaces });
                  setStep(4);
                }}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all shadow-md"
              >
                <span>Continue to Aesthetics</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Decor Vibe */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-medium text-earth">Select your preferred interior vibe</h2>
              <p className="text-sm text-charcoal-muted font-light">
                Choose the visual direction that resonates most with your taste.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {decorVibes.map((vib) => {
                const isSelected = selectedVibes.includes(vib.name);
                return (
                  <div
                    key={vib.id}
                    onClick={() => toggleVibe(vib.name)}
                    className={`rounded-2xl border cursor-pointer overflow-hidden transition-all ${
                      isSelected
                        ? "border-primary ring-2 ring-primary/20 shadow-elevated"
                        : "border-earth/10 hover:border-earth/30"
                    }`}
                  >
                    <div className="h-40 relative overflow-hidden">
                      <img src={vib.image} alt={vib.name} className="w-full h-full object-cover" />
                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-primary text-white p-1.5 rounded-full shadow">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-1 bg-white">
                      <h3 className="font-serif text-lg font-medium text-earth">{vib.name}</h3>
                      <p className="text-xs text-charcoal-muted font-light leading-relaxed">{vib.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 text-earth hover:text-primary text-sm font-medium px-4 py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => {
                  updateConsultationDraft({ vibes: selectedVibes });
                  setStep(5);
                }}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all shadow-md"
              >
                <span>Continue to Photo Upload</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Photo Upload UI */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-medium text-earth">Upload photos of your space</h2>
              <p className="text-sm text-charcoal-muted font-light">
                Add current room shots from multiple angles (Max 10MB each). Our intake AI & stylists analyze lighting & proportions.
              </p>
            </div>

            {/* Drag & Drop Box */}
            <div className="border-2 border-dashed border-earth/20 hover:border-primary/50 bg-surface/40 rounded-2xl p-8 text-center space-y-4 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-earth">Click to browse or drag & drop room photos</p>
                <p className="text-xs text-charcoal-muted">Supports JPG, PNG up to 10 photos</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
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

            {/* Photo Previews */}
            {photos.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-earth">
                  Uploaded Photos ({photos.length})
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {photos.map((src, idx) => (
                    <div key={idx} className="relative h-32 rounded-xl overflow-hidden group border border-earth/10">
                      <img src={src} alt="Uploaded Room" className="w-full h-full object-cover" />
                      <button
                        onClick={() => removePhoto(idx)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Notes */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-earth uppercase tracking-wider">
                Special Requests or Notes for Stylist
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Please suggest child-friendly rounded teak furniture and warm floor lamps..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-earth/20 bg-surface/50 text-sm focus:outline-none focus:border-primary resize-none"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-2 text-earth hover:text-primary text-sm font-medium px-4 py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => {
                  updateConsultationDraft({ photos, notes });
                  setStep(6);
                }}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all shadow-md"
              >
                <span>Review Summary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Summary & Review Card */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-medium text-earth">Review your consultation intake</h2>
              <p className="text-sm text-charcoal-muted font-light">
                Verify your details before locking payment and scheduling your video session.
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-earth/10 space-y-6">
              {/* Lead info */}
              <div className="flex items-center justify-between pb-4 border-b border-earth/10">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-primary">Lead Contact</span>
                  <h4 className="font-serif text-lg font-medium text-earth">{lead.name}</h4>
                  <p className="text-xs text-charcoal-muted">{lead.email} • {lead.phone} ({lead.city})</p>
                </div>
                <button onClick={() => setStep(1)} className="p-2 text-earth hover:text-primary">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              {/* Home & Spaces */}
              <div className="flex items-center justify-between pb-4 border-b border-earth/10">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-primary">Residence & Spaces</span>
                  <h4 className="font-serif text-lg font-medium text-earth">{selectedHomeType}</h4>
                  <div className="flex gap-2 pt-1 flex-wrap">
                    {selectedSpaces.map((s) => (
                      <span key={s} className="bg-white text-earth text-xs px-2.5 py-1 rounded-full font-medium border border-earth/10">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="p-2 text-earth hover:text-primary">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              {/* Aesthetic */}
              <div className="flex items-center justify-between pb-4 border-b border-earth/10">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-primary">Chosen Vibe</span>
                  <h4 className="font-serif text-lg font-medium text-earth">{selectedVibes.join(", ")}</h4>
                </div>
                <button onClick={() => setStep(4)} className="p-2 text-earth hover:text-primary">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              {/* Photos count */}
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-primary">Uploaded Photos</span>
                <p className="text-sm font-medium text-earth">{photos.length} Room photos attached</p>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(5)}
                className="inline-flex items-center gap-2 text-earth hover:text-primary text-sm font-medium px-4 py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(7)}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all shadow-md"
              >
                <span>Proceed to Checkout & Booking</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: Payment & Scheduling */}
        {step === 7 && (
          <div className="space-y-6">
            {!bookingConfirmed ? (
              <>
                <div className="space-y-2">
                  <h2 className="font-serif text-3xl font-medium text-earth">Lock Payment & Select Calendar Slot</h2>
                  <p className="text-sm text-charcoal-muted font-light">
                    Complete secure checkout via Razorpay followed by choosing your live 1-on-1 video call slot.
                  </p>
                </div>

                {/* Payment Card */}
                <div className="bg-surface p-6 rounded-2xl border border-earth/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-medium text-earth">1-on-1 Consultation Fee</h4>
                      <p className="text-xs text-charcoal-muted">Includes 45-min live session, layout deck & shopping links</p>
                    </div>
                    <div className="text-2xl font-serif font-bold text-earth">₹1,999</div>
                  </div>

                  {paymentStatus === "PAID" ? (
                    <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl flex items-center gap-2 text-sm font-semibold">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Payment Verified • Transaction Ref: {paymentId}</span>
                    </div>
                  ) : (
                    <button
                      onClick={handlePayment}
                      disabled={loading}
                      className="w-full inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary-dark text-white py-3.5 rounded-xl font-medium text-sm transition-colors shadow-sm"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>{loading ? "Processing..." : "Pay ₹1,999 via Razorpay Checkout"}</span>
                    </button>
                  )}
                </div>

                {/* Calendar Slot Selector */}
                {paymentStatus === "PAID" && (
                  <div className="space-y-6 pt-4 border-t border-earth/10">
                    <h3 className="font-serif text-xl font-medium text-earth flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>Select Appointment Date & Time</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-earth uppercase tracking-wider">Select Date</label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full px-4 py-3 rounded-xl border border-earth/20 bg-surface/50 text-sm focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-earth uppercase tracking-wider">Available Slots</label>
                        <div className="grid grid-cols-2 gap-2">
                          {(availableSlots.length > 0
                            ? availableSlots
                            : ["10:00 AM", "11:30 AM", "02:00 PM", "04:00 PM", "05:30 PM"]
                          ).map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                                selectedSlot === slot
                                  ? "bg-earth text-white border-earth shadow-sm"
                                  : "bg-white text-earth border-earth/15 hover:border-earth/40"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleFinalBooking}
                      disabled={loading}
                      className="w-full inline-flex justify-center items-center gap-2 bg-earth hover:bg-earth/90 text-white py-4 rounded-full font-medium text-base transition-all shadow-elevated"
                    >
                      <span>{loading ? "Confirming..." : "Confirm & Reserve Slot"}</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Booking Confirmation */
              <div className="text-center py-8 space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">Booking Confirmed</span>
                  <h2 className="font-serif text-3xl font-medium text-earth">You're All Set, {lead.name}!</h2>
                  <p className="text-sm text-charcoal-muted max-w-md mx-auto font-light">
                    Your 1-on-1 video consultation is locked for <strong className="text-earth">{selectedDate}</strong> at <strong className="text-earth">{selectedSlot}</strong>.
                  </p>
                </div>

                <div className="bg-surface p-6 rounded-2xl max-w-md mx-auto text-left space-y-3 border border-earth/10 text-xs text-earth">
                  <div className="flex justify-between border-b border-earth/10 pb-2">
                    <span className="text-charcoal-muted">Consultation ID</span>
                    <span className="font-mono font-medium">{consultationId}</span>
                  </div>
                  <div className="flex justify-between border-b border-earth/10 pb-2">
                    <span className="text-charcoal-muted">Payment Ref</span>
                    <span className="font-mono font-medium">{paymentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted">Google Meet Link</span>
                    <span className="text-primary font-medium">Sent via Email & WhatsApp</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center gap-4">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all"
                  >
                    <span>Return to Home Studio</span>
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
