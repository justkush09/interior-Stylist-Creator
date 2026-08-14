"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  IndianRupee,
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";

export default function AdminOverviewPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/metrics")
      .then((r) => r.json())
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-earth text-sm font-medium animate-pulse">Loading Stylist Metrics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-medium text-earth">Dashboard Overview</h1>
          <p className="text-sm text-charcoal-muted font-light">
            Real-time consultation lead funnel, revenue tracking, and upcoming appointment calendar.
          </p>
        </div>
        <Link
          href="/admin/consultations"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
        >
          <span>View Consultations</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-earth/10 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">Total Leads</span>
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-earth">{metrics?.totalLeads || 0}</div>
          <div className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Captured via Intake Form</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-earth/10 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">Paid Consultations</span>
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-earth">{metrics?.paidCount || 0}</div>
          <div className="text-xs text-charcoal-muted font-light">Total intake submissions</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-earth/10 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">Total Revenue</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-earth">₹{(metrics?.revenue || 0).toLocaleString()}</div>
          <div className="text-xs text-emerald-600 font-medium">Razorpay Verified Payments</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-earth/10 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">Funnel Conv. Rate</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-earth">{metrics?.conversionRate || 0}%</div>
          <div className="text-xs text-charcoal-muted font-light">Lead-to-Paid Consultation</div>
        </div>
      </div>

      {/* Main Grid: Upcoming Appointments & Paid Consultations Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-earth/10 shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-medium text-earth flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Upcoming Video Consultation Sessions</span>
            </h2>
            <span className="text-xs text-primary font-medium">
              {metrics?.upcomingAppointments?.length || 0} Scheduled
            </span>
          </div>

          <div className="space-y-4">
            {metrics?.upcomingAppointments?.length > 0 ? (
              metrics.upcomingAppointments.map((app: any) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-surface/50 border border-earth/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-medium text-earth text-base">
                        {app.consultation?.lead?.name || "Client"}
                      </h3>
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                        {app.consultation?.homeType}
                      </span>
                    </div>
                    <div className="text-xs text-charcoal-muted font-light flex items-center gap-3">
                      <span>📅 {app.consultation?.appointmentDate || "Date pending"}</span>
                      <span>⏰ {app.consultation?.appointmentTimeSlot || "Slot pending"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${app.consultation?.lead?.phone?.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors text-xs flex items-center gap-1 font-medium"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={`mailto:${app.consultation?.lead?.email}`}
                      className="p-2.5 rounded-xl bg-earth text-white hover:bg-earth/90 transition-colors text-xs flex items-center gap-1 font-medium"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-charcoal-muted font-light">
                No upcoming sessions scheduled yet. New bookings will automatically sync here.
              </div>
            )}
          </div>
        </div>

        {/* Conversion Funnel Breakdown */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-earth/10 shadow-soft space-y-6">
          <h2 className="font-serif text-xl font-medium text-earth">Intake Conversion Funnel</h2>

          <div className="space-y-4 text-xs font-medium text-earth">
            <div className="p-4 rounded-2xl bg-surface/60 border border-earth/10 space-y-2">
              <div className="flex justify-between">
                <span>1. Contact Intake Leads</span>
                <span className="font-serif font-bold text-base">{metrics?.totalLeads || 0}</span>
              </div>
              <div className="w-full bg-earth/10 h-2 rounded-full overflow-hidden">
                <div className="bg-earth h-full w-full" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface/60 border border-earth/10 space-y-2">
              <div className="flex justify-between">
                <span>2. Space & Vibe Intakes</span>
                <span className="font-serif font-bold text-base">{metrics?.totalConsultations || 0}</span>
              </div>
              <div className="w-full bg-earth/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full"
                  style={{
                    width: metrics?.totalLeads ? `${(metrics.totalConsultations / metrics.totalLeads) * 100}%` : "0%",
                  }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface/60 border border-earth/10 space-y-2">
              <div className="flex justify-between">
                <span>3. Paid Consultations</span>
                <span className="font-serif font-bold text-base text-emerald-700">{metrics?.paidCount || 0}</span>
              </div>
              <div className="w-full bg-earth/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full"
                  style={{
                    width: metrics?.totalLeads ? `${(metrics.paidCount / metrics.totalLeads) * 100}%` : "0%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
