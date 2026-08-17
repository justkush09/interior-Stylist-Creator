"use client";

import { Sparkles, MessageSquare, Camera, Video, Compass, ShoppingBag, Home } from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Share Your Vision",
    desc: "Tell us about your home layout, preferred aesthetics, and daily living routines.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Upload Room Photos",
    desc: "Submit room photos from multiple angles with natural daylight.",
    icon: Camera,
  },
  {
    number: "03",
    title: "1-on-1 Stylist Call",
    desc: "45-minute video consultation with a senior interior stylist to review floorplan possibilities.",
    icon: Video,
  },
  {
    number: "04",
    title: "Curated Moodboard & Palette",
    desc: "Receive customized color codes, natural material samples, and 2D spatial layouts.",
    icon: Compass,
  },
  {
    number: "05",
    title: "Exact Sourcing List",
    desc: "Direct vendor shopping links for teakwood furniture, brass lights, and textiles.",
    icon: ShoppingBag,
  },
  {
    number: "06",
    title: "Guided Setup & Reveal",
    desc: "Final arrangement guidance to unbox, style, and enjoy your new sanctuary.",
    icon: Home,
  },
];

export default function EditorialProcess() {
  return (
    <section className="py-24 bg-background border-t border-forest/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest/5 border border-forest/10 text-forest text-xs font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-copper" />
            <span>Structured Consultation Journey</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-forest tracking-tight">
            How Your Space Transforms
          </h2>
          <p className="text-charcoal-muted text-base sm:text-lg font-light leading-relaxed">
            Our seamless 6-step styling roadmap brings calm clarity to home interior decisions.
          </p>
        </div>

        {/* 6-Step Timeline Grid with Connecting Lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {processSteps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.number}
                className="bg-card p-8 rounded-3xl border border-forest/10 shadow-soft hover:shadow-elevated transition-all duration-300 space-y-5 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-4xl font-bold text-copper group-hover:scale-105 transition-transform">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-forest/5 group-hover:bg-forest group-hover:text-ivory flex items-center justify-center text-forest transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-medium text-forest">
                    {step.title}
                  </h3>
                  <p className="text-xs text-charcoal-muted font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
