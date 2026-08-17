"use client";

import Link from "next/link";
import { ArrowUpRight, Compass, ShieldCheck } from "lucide-react";
import FloatingProductTag from "./FloatingProductTag";

export default function DarkLuxurySection() {
  return (
    <section className="relative py-28 bg-forest text-ivory overflow-hidden">
      {/* Decorative Gold Glowing Arch Backdrop */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px] pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-forest-light/20 rounded-full blur-[100px] pointer-events-none -ml-28 -mb-28" />

      {/* Subtle Arch Line Graphic */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
        <div className="w-[1000px] h-[1000px] border border-gold rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text & Editorial CTA */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="inline-flex items-center gap-2.5 bg-ivory/10 border border-ivory/15 px-4 py-1.5 rounded-full text-gold text-xs font-semibold uppercase tracking-[0.25em]">
              <Compass className="w-3.5 h-3.5" />
              <span>Tailored Architectural Styling</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-ivory tracking-tight leading-[1.1]">
              The Luxury Lifestyle. <br />
              <span className="italic text-copper-soft font-light">Warm Indian Sanctuary.</span>
            </h2>

            <p className="text-ivory/70 text-base sm:text-lg font-light leading-relaxed max-w-xl">
              We translate raw floorplans into serene, light-filled sanctuaries. Experience curated teakwood furniture, hand-loomed textiles, and natural terracotta designed around your daily life.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                href="/book"
                className="inline-flex justify-center items-center gap-2.5 bg-copper hover:bg-copper-dark text-ivory px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold transition-all shadow-elevated hover:shadow-glow-gold hover:-translate-y-0.5"
              >
                <span>Book Consultation Now</span>
                <ArrowUpRight className="w-4 h-4 text-ivory" />
              </Link>
              
              <Link
                href="/portfolio"
                className="inline-flex justify-center items-center gap-2.5 bg-forest-rich border border-ivory/20 hover:border-gold text-ivory px-6 py-4 rounded-full text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                <span>Explore Portfolios</span>
              </Link>
            </div>

            {/* Micro Feature Badges */}
            <div className="pt-8 border-t border-ivory/10 grid grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-2xl font-serif font-bold text-gold">250+</div>
                <div className="text-xs text-ivory/60 uppercase tracking-wider font-light mt-1">Homes Styled</div>
              </div>
              <div>
                <div className="text-2xl font-serif font-bold text-gold">4.9 ★</div>
                <div className="text-xs text-ivory/60 uppercase tracking-wider font-light mt-1">Client Rating</div>
              </div>
              <div>
                <div className="text-2xl font-serif font-bold text-gold">100%</div>
                <div className="text-xs text-ivory/60 uppercase tracking-wider font-light mt-1">Customized</div>
              </div>
            </div>
          </div>

          {/* Right Cinematic Room Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-ivory/20 group">
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Indian Minimalist Bedroom Sanctuary"
                className="w-full h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-rich/80 via-transparent to-transparent flex flex-col justify-end p-8 text-ivory">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">Master Sanctuary</span>
                <h3 className="font-serif text-2xl font-medium text-ivory mt-1">Worli Penthouse Residence</h3>
              </div>
            </div>

            {/* Floating Product Tag (Reference Image 1 style) */}
            <FloatingProductTag
              title="Serene Teak & Cane Bedframe"
              category="Bedroom Sanctuary"
              price="₹68,000"
              image="https://images.unsplash.com/photo-1540518614846-7ede433c5172?auto=format&fit=crop&w=400&q=80"
              positionClass="-bottom-6 -left-6"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
