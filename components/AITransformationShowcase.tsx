"use client";

import { Sparkles, Camera, Cpu, Palette, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

const aiSteps = [
  {
    step: "01",
    title: "Upload Room Photos",
    desc: "Snap room photos from multiple angles with natural daylight.",
    icon: Camera,
  },
  {
    step: "02",
    title: "Spatial & Light Map",
    desc: "Analyzes room proportions, window flow, and existing features.",
    icon: Cpu,
  },
  {
    step: "03",
    title: "Minimalist Palette",
    desc: "Applies warm terracotta, teakwood, and organic textures.",
    icon: Palette,
  },
  {
    step: "04",
    title: "Instant Visual Preview",
    desc: "Generates high-fidelity visual concept in seconds.",
    icon: Sparkles,
  },
  {
    step: "05",
    title: "1-on-1 Sourcing Review",
    desc: "Mukta reviews your visual concept on your consultation call.",
    icon: ShoppingBag,
  },
];

export default function AITransformationShowcase() {
  return (
    <section className="py-28 bg-surface/40 border-t border-charcoal/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta/10 border border-terracotta/20 text-terracotta text-xs font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Room Visualizer</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-charcoal tracking-tight">
            Preview Your Space Transformation
          </h2>
          <p className="text-charcoal-muted text-base sm:text-lg font-light leading-relaxed">
            Upload your room photos during consultation booking to instantly preview how warm teakwood, linen textures, and terracotta tones look in your space before your call with Mukta.
          </p>
        </div>

        {/* 5-Step De-cardified Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {aiSteps.map((s) => {
            const IconComp = s.icon;
            return (
              <div
                key={s.step}
                className="p-6 rounded-2xl bg-background border border-charcoal/10 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl font-semibold text-terracotta">{s.step}</span>
                    <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-serif text-base font-normal text-charcoal">{s.title}</h3>
                  <p className="text-xs text-charcoal-muted font-light leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Link */}
        <div className="text-center pt-2">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-ivory px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold transition-all shadow-md"
          >
            <span>Start Room Intake & Visualizer</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
