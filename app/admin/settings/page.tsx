"use client";

import { useEffect, useState } from "react";
import { Settings, Save, CheckCircle2, DollarSign, Calendar, Mail, Phone } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({
    consultation_fee: "1999",
    business_email: "hello@indianminimalist.in",
    business_phone: "+91 98765 43210",
    available_slots: "10:00 AM,11:30 AM,02:00 PM,04:00 PM,05:30 PM",
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.settings && Object.keys(data.settings).length > 0) {
          setSettings((prev: any) => ({ ...prev, ...data.settings }));
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl font-medium text-earth">Settings & Dynamic Pricing</h1>
        <p className="text-sm text-charcoal-muted font-light">
          Configure consultation fees, business contact channels, and available video session slots.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-earth/10 shadow-soft space-y-6">
        {saved && (
          <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl flex items-center gap-2 text-sm font-semibold border border-emerald-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Settings updated successfully! Changes are live across the site.</span>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="font-serif text-xl font-medium text-earth border-b border-earth/10 pb-2">
            Pricing Configuration
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-earth uppercase tracking-wider">
                1-on-1 Consultation Fee (₹ INR)
              </label>
              <input
                type="number"
                value={settings.consultation_fee || "1999"}
                onChange={(e) => setSettings({ ...settings, consultation_fee: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-earth/20 bg-surface/50 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-earth/10">
          <h2 className="font-serif text-xl font-medium text-earth border-b border-earth/10 pb-2">
            Calendar & Booking Slots
          </h2>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-earth uppercase tracking-wider">
              Available Daily Video Call Slots (Comma Separated)
            </label>
            <input
              type="text"
              value={settings.available_slots || "10:00 AM,11:30 AM,02:00 PM,04:00 PM,05:30 PM"}
              onChange={(e) => setSettings({ ...settings, available_slots: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-earth/20 bg-surface/50 text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-earth/10">
          <h2 className="font-serif text-xl font-medium text-earth border-b border-earth/10 pb-2">
            Business Contact Channels
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-earth uppercase tracking-wider">Studio Business Email</label>
              <input
                type="email"
                value={settings.business_email || "hello@indianminimalist.in"}
                onChange={(e) => setSettings({ ...settings, business_email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-earth/20 bg-surface/50 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-earth uppercase tracking-wider">WhatsApp & Support Phone</label>
              <input
                type="text"
                value={settings.business_phone || "+91 98765 43210"}
                onChange={(e) => setSettings({ ...settings, business_phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-earth/20 bg-surface/50 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? "Saving..." : "Save Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
