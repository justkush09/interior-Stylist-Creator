import Link from "next/link";
import { ArrowRight, Sparkles, Heart, Compass, Feather } from "lucide-react";

export const metadata = {
  title: "About Us & Design Philosophy | Indian Minimalist",
  description: "Learn about the Indian Minimalist studio, our principles of natural materials, organic textures, and intentional home styling.",
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Our Story</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-earth leading-tight">
            Honoring Indian Heritage in Modern Minimalist Homes
          </h1>
          <p className="text-base sm:text-lg text-charcoal-muted font-light leading-relaxed">
            Indian Minimalist was founded with a single mission: to replace cluttered, synthetic interior trends with calm, warm, and natural living spaces that feel authentic to Indian homes.
          </p>
          <p className="text-sm text-charcoal-muted font-light leading-relaxed">
            We believe a home should be a quiet refuge. By combining clean architectural lines with handloom linen, raw teak, unglazed clay, and aged brass, we bring warmth and soul into modern apartments and villas.
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-3xl overflow-hidden shadow-elevated border-8 border-white">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="Indian Minimalist Studio Story"
              className="w-full h-[440px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* 3 Core Pillars */}
      <div className="bg-surface rounded-3xl p-10 sm:p-16 space-y-12 border border-earth/10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Foundational Pillars</span>
          <h2 className="font-serif text-3xl font-medium text-earth">Our Core Styling Principles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl space-y-4 shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Feather className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-earth">Natural & Honest Materials</h3>
            <p className="text-sm text-charcoal-muted font-light leading-relaxed">
              We prioritize solid reclaimed teak, terracotta, brass, cane, and handwoven cottons over plastic or veneered laminate.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl space-y-4 shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-earth">Subtle Light & Space</h3>
            <p className="text-sm text-charcoal-muted font-light leading-relaxed">
              Designing with natural sunlight, ventilation, and gentle layered evening lighting rather than harsh ceiling downlights.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl space-y-4 shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-earth">Intentional Living</h3>
            <p className="text-sm text-charcoal-muted font-light leading-relaxed">
              Curating fewer, higher quality objects that bring joy and harmony, eliminating visual stress and clutter.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl font-medium text-earth">Let's Create Your Sanctuary</h2>
        <p className="text-sm text-charcoal-muted font-light">
          Book a 1-on-1 consultation session with our design studio and receive a bespoke room layout & sourcing roadmap.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-base font-medium transition-all shadow-md"
        >
          <span>Book Consultation (₹1,999)</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
