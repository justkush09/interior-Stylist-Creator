"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Bengaluru",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save lead to database
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Get In Touch</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium text-earth">We'd Love to Hear From You</h1>
        <p className="text-base sm:text-lg text-charcoal-muted font-light leading-relaxed">
          Have a question about our consultation process or custom home styling? Send us a message or visit our studios.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-8 bg-earth text-white p-8 sm:p-12 rounded-3xl shadow-elevated">
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-light">Studio Locations</span>
            <h2 className="font-serif text-2xl font-medium text-surface">Indian Minimalist HQ</h2>
          </div>

          <div className="space-y-6 text-sm text-surface/80">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-primary-light shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-white">Bengaluru Studio</div>
                <div className="font-light">100 Feet Road, Indiranagar, Bengaluru - 560038</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-primary-light shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-white">Mumbai Experience Centre</div>
                <div className="font-light">Dr E Moses Road, Worli, Mumbai - 400018</div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-earth-muted/40">
              <Mail className="w-5 h-5 text-primary-light shrink-0" />
              <div>
                <div className="font-semibold text-white">Email Us</div>
                <div className="font-light">hello@indianminimalist.in</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-primary-light shrink-0" />
              <div>
                <div className="font-semibold text-white">Direct Line</div>
                <div className="font-light">+91 98765 43210</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-earth/10 shadow-soft">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-earth">Message Sent Successfully!</h3>
              <p className="text-sm text-charcoal-muted max-w-md mx-auto">
                Thank you for reaching out. Our interior stylist team will get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-semibold text-primary border-b border-primary pt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="font-serif text-2xl font-medium text-earth">Send Inquiry</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-earth uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-earth/20 bg-surface/50 text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-earth uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="radhika@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-earth/20 bg-surface/50 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-earth uppercase tracking-wider">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-earth/20 bg-surface/50 text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-earth uppercase tracking-wider">City *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-earth/20 bg-surface/50 text-sm focus:outline-none focus:border-primary"
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

              <div className="space-y-2">
                <label className="text-xs font-semibold text-earth uppercase tracking-wider">Your Message / Project Details</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your home type, room styling goals, or general questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-earth/20 bg-surface/50 text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary-dark text-white py-4 rounded-full text-base font-medium transition-all shadow-md"
              >
                <span>{loading ? "Sending..." : "Submit Inquiry"}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
