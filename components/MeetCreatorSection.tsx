"use client";

import Link from "next/link";
import { Instagram, ArrowUpRight } from "lucide-react";

export default function MeetCreatorSection() {
  return (
    <section className="py-28 sm:py-36 bg-background border-y border-charcoal/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Imagery - High Quality Warm Living Room Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-soft border border-charcoal/10">
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80"
                alt="Mukta - Indian Minimalist Studio"
                className="w-full h-[460px] sm:h-[540px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent flex flex-col justify-end p-8 text-ivory">
                <span className="text-[10px] uppercase tracking-[0.25em] text-terracotta font-semibold">
                  Founder & Principal Stylist
                </span>
                <h4 className="font-serif text-2xl font-normal text-ivory mt-1">
                  Mukta
                </h4>
                <p className="text-xs text-ivory/80 font-light mt-0.5">
                  @indian.minimalist • Bengaluru & Pan-India
                </p>
              </div>
            </div>

            {/* Subtle Overlay Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-surface p-5 rounded-2xl border border-charcoal/10 shadow-elevated max-w-[220px] hidden sm:block">
              <p className="font-serif text-xs italic text-charcoal leading-relaxed">
                "A home should feel calm the moment you walk through the door."
              </p>
            </div>
          </div>

          {/* Right Copy - Personal Brand Story */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-terracotta font-semibold">
              <Instagram className="w-3.5 h-3.5" />
              <span>Meet The Mind Behind @indian.minimalist</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-charcoal leading-[1.1]">
              Hello, I'm Mukta. <br />
              <span className="italic font-light text-terracotta">Designing calm for Indian living.</span>
            </h2>

            <div className="space-y-5 text-charcoal-muted text-base sm:text-lg font-light leading-relaxed">
              <p>
                I started <strong className="font-normal text-charcoal">@indian.minimalist</strong> to share a more intentional approach to home styling — one rooted in raw teakwood, unbleached cottons, terracotta pots, and abundant natural light.
              </p>
              <p>
                In a world of fast furniture and overcrowded rooms, I help homeowners distill their spaces down to what truly matters. No rigid luxury rules or cookie-cutter templates — just warm, timeless homes that reflect your personality.
              </p>
            </div>

            {/* Authentic Brand Values */}
            <div className="pt-4 border-t border-charcoal/10 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <div className="font-serif text-lg font-medium text-charcoal">Authentic Materials</div>
                <div className="text-xs text-charcoal-muted font-light mt-1">Teak, Cane & Brass</div>
              </div>
              <div>
                <div className="font-serif text-lg font-medium text-charcoal">Intentional Layouts</div>
                <div className="text-xs text-charcoal-muted font-light mt-1">Daylight & Flow</div>
              </div>
              <div>
                <div className="font-serif text-lg font-medium text-charcoal">Pan-India Virtual</div>
                <div className="text-xs text-charcoal-muted font-light mt-1">1-on-1 Consultations</div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-ivory px-7 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all shadow-md"
              >
                <span>Book 1-on-1 Styling Call</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
