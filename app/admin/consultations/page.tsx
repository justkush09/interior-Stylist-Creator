"use client";

import { useEffect, useState } from "react";
import { Search, Calendar, Image as ImageIcon, CheckCircle2, User, Home, Sparkles, X, MapPin } from "lucide-react";

export default function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsultation, setSelectedConsultation] = useState<any | null>(null);

  useEffect(() => {
    fetch("/api/admin/metrics")
      .then((r) => r.json())
      .then((data) => {
        if (data.paidConsultations) setConsultations(data.paidConsultations);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-medium text-earth">Paid Consultations & Intake Submissions</h1>
        <p className="text-sm text-charcoal-muted font-light">
          Review questionnaire answers, photo attachments, and payment details for booked consultations.
        </p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-sm text-charcoal-muted animate-pulse">
          Loading paid consultations...
        </div>
      ) : consultations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {consultations.map((c) => {
            const spacesList = c.spaces ? JSON.parse(c.spaces) : [];
            const vibesList = c.vibes ? JSON.parse(c.vibes) : [];
            const photosList = c.photos ? JSON.parse(c.photos) : [];

            return (
              <div
                key={c.id}
                onClick={() => setSelectedConsultation({ ...c, spacesList, vibesList, photosList })}
                className="bg-white p-6 rounded-3xl border border-earth/10 shadow-soft hover:shadow-elevated transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {c.paymentStatus} (₹{c.amount})
                    </span>
                    <span className="text-xs text-charcoal-muted font-mono">{c.appointmentDate || "Date Pending"}</span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-earth">{c.lead?.name}</h3>
                  <div className="text-xs text-charcoal-muted">{c.lead?.email} • {c.lead?.city}</div>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    <span className="bg-surface text-earth text-xs px-2.5 py-1 rounded-full font-medium border border-earth/10">
                      🏠 {c.homeType}
                    </span>
                    {spacesList.map((s: string) => (
                      <span key={s} className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-earth/10 flex items-center justify-between text-xs text-charcoal-muted">
                  <span className="flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5 text-primary" />
                    <span>{photosList.length} Photos</span>
                  </span>
                  <span className="text-primary font-medium">View Detail Deck →</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 bg-white rounded-3xl border border-earth/10 text-center text-sm text-charcoal-muted">
          No paid consultations submitted yet. Test submissions via the `/book` page will display here instantly.
        </div>
      )}

      {/* Consultation Intake Detail Modal */}
      {selectedConsultation && (
        <div className="fixed inset-0 z-50 bg-earth/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-elevated relative max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="p-6 bg-earth text-white flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-primary-light font-semibold">Consultation Intake</span>
                <h2 className="font-serif text-2xl font-medium text-surface">{selectedConsultation.lead?.name}</h2>
              </div>
              <button
                onClick={() => setSelectedConsultation(null)}
                className="w-9 h-9 rounded-full bg-earth-muted/40 hover:bg-earth-muted text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto flex-1 text-earth">
              {/* Client Info */}
              <div className="bg-surface/50 p-4 rounded-2xl border border-earth/10 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-charcoal-muted font-light">Client Email:</span>
                  <div className="font-medium text-sm">{selectedConsultation.lead?.email}</div>
                </div>
                <div>
                  <span className="text-charcoal-muted font-light">Phone / WhatsApp:</span>
                  <div className="font-medium text-sm">{selectedConsultation.lead?.phone}</div>
                </div>
                <div>
                  <span className="text-charcoal-muted font-light">City:</span>
                  <div className="font-medium text-sm">{selectedConsultation.lead?.city}</div>
                </div>
                <div>
                  <span className="text-charcoal-muted font-light">Slot:</span>
                  <div className="font-medium text-sm">{selectedConsultation.appointmentDate} at {selectedConsultation.appointmentTimeSlot}</div>
                </div>
              </div>

              {/* Questionnaire Details */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-medium border-b border-earth/10 pb-2">Questionnaire Intake Summary</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold">Home Type:</span> {selectedConsultation.homeType}
                  </div>
                  <div>
                    <span className="font-semibold">Target Spaces:</span> {selectedConsultation.spacesList?.join(", ")}
                  </div>
                  <div>
                    <span className="font-semibold">Decor Vibes:</span> {selectedConsultation.vibesList?.join(", ")}
                  </div>
                  {selectedConsultation.notes && (
                    <div className="bg-amber-50 p-4 rounded-xl text-xs text-amber-900 border border-amber-200">
                      <span className="font-semibold">Stylist Notes:</span> {selectedConsultation.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Photos Lightbox */}
              {selectedConsultation.photosList?.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-serif text-lg font-medium border-b border-earth/10 pb-2">Client Room Photos</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {selectedConsultation.photosList.map((photo: string, i: number) => (
                      <div key={i} className="h-40 rounded-xl overflow-hidden border border-earth/10">
                        <img src={photo} alt="Room Photo" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
