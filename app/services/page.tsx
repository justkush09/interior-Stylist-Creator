import Link from "next/link";
import { CheckCircle2, ArrowRight, Sparkles, Shield, Clock, PhoneCall } from "lucide-react";

export const metadata = {
  title: "Interior Design Services & Packages | Indian Minimalist",
  description: "Explore our personalized home styling packages: 1-on-1 video consultations, room makeovers, and full residence styling.",
};

export default function ServicesPage() {
  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Tailored Offerings</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium text-earth">Our Interior Styling Services</h1>
        <p className="text-base sm:text-lg text-charcoal-muted font-light leading-relaxed">
          From quick color & lighting fixes to complete end-to-end residential styling direction.
        </p>
      </div>

      {/* Main Services Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Service 1 */}
        <div className="bg-white p-8 rounded-3xl border border-earth/10 shadow-soft flex flex-col justify-between space-y-6 hover:shadow-elevated transition-shadow">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-medium text-earth">1-on-1 Video Consultation</h2>
            <p className="text-sm text-charcoal-muted font-light">
              Ideal for single room layout tune-ups, furniture selection advice, wall paint palettes, and lighting placement.
            </p>
            <div className="text-2xl font-bold font-serif text-earth pt-2">₹1,999 <span className="text-xs text-charcoal-muted font-sans font-normal">/ 45-min session</span></div>
            <ul className="space-y-3 pt-4 border-t border-earth/10 text-sm text-earth">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Live video discussion with Senior Stylist</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Custom Warm Palette Color Swatches</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>5 Key Product Sourcing Links</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Post-session action plan PDF</span>
              </li>
            </ul>
          </div>
          <Link
            href="/book"
            className="w-full inline-flex justify-center items-center gap-2 bg-primary text-white py-3.5 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Service 2 */}
        <div className="bg-white p-8 rounded-3xl border-2 border-primary shadow-elevated flex flex-col justify-between space-y-6 relative">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-medium text-earth">Full Room Makeover</h2>
            <p className="text-sm text-charcoal-muted font-light">
              Complete layout planning, decor moodboards, lighting map, and comprehensive product shopping list for one dedicated space.
            </p>
            <div className="text-2xl font-bold font-serif text-earth pt-2">₹14,999 <span className="text-xs text-charcoal-muted font-sans font-normal">/ room</span></div>
            <ul className="space-y-3 pt-4 border-t border-earth/10 text-sm text-earth">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Includes initial 1-on-1 Video Session</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>2D Floor Plan & Furniture Arrangement</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Curated Moodboard & Material Samples</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Direct Vendor Links (Pepperfry, Jaypore, Artisan Crafts)</span>
              </li>
            </ul>
          </div>
          <Link
            href="/book"
            className="w-full inline-flex justify-center items-center gap-2 bg-earth hover:bg-earth/90 text-white py-3.5 rounded-full text-sm font-medium transition-colors"
          >
            <span>Start Intake</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Service 3 */}
        <div className="bg-white p-8 rounded-3xl border border-earth/10 shadow-soft flex flex-col justify-between space-y-6 hover:shadow-elevated transition-shadow">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-medium text-earth">Full Residence Styling</h2>
            <p className="text-sm text-charcoal-muted font-light">
              Holistic interior styling for entire 2 BHK, 3 BHK, 4 BHK, or Villa properties with cohesive material stories.
            </p>
            <div className="text-2xl font-bold font-serif text-earth pt-2">₹39,999 <span className="text-xs text-charcoal-muted font-sans font-normal">/ full home</span></div>
            <ul className="space-y-3 pt-4 border-t border-earth/10 text-sm text-earth">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Multi-room cohesive design language</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Artisan custom woodwork & brass sourcing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Priority WhatsApp Stylist Support</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>On-site placement guidance (BLR/BOM)</span>
              </li>
            </ul>
          </div>
          <Link
            href="/book"
            className="w-full inline-flex justify-center items-center gap-2 bg-primary text-white py-3.5 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
