"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

const servicesList = [
  {
    number: "01",
    title: "1-on-1 Consultation Session",
    subtitle: "Single Room Advice & Color Strategy",
    desc: "45-minute video call with a lead Indian Minimalist stylist. Custom color palette, paint codes, and 5 key furniture sourcing links.",
    price: "₹1,999",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    href: "/book",
  },
  {
    number: "02",
    title: "Complete Room Styling Package",
    subtitle: "Living Room, Master Sanctuary, or Dining Studio",
    desc: "Comprehensive 2D layout floorplan, furniture placement map, full moodboard, lighting layout, and complete vendor shopping list.",
    price: "₹14,999",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    href: "/book",
  },
  {
    number: "03",
    title: "Full Residence Transformation",
    subtitle: "End-to-End 2 BHK, 3 BHK, or Villa Design",
    desc: "Cohesive multi-room styling concept, artisan custom teakwood sourcing, priority video calls, and on-demand WhatsApp stylist support.",
    price: "₹39,999",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    href: "/book",
  },
  {
    number: "04",
    title: "Artisan Furniture Curation",
    subtitle: "Teakwood, Brass, & Hand-Loom Textiles",
    desc: "Bespoke furniture procurement directly from master woodworkers, brass casting artisans, and hand-weaving craft clusters.",
    price: "Custom Quote",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    href: "/contact",
  },
];

export default function EditorialServices() {
  const [activeService, setActiveService] = useState<number>(0);

  return (
    <section className="py-28 sm:py-36 bg-forest text-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Packages</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-ivory tracking-tight">
              Design Consultation Services
            </h2>
          </div>
          <p className="text-ivory/60 text-sm sm:text-base font-light max-w-md">
            Transparent pricing without designer commissions. Expert guidance tailored to Indian architecture and warm natural materials.
          </p>
        </div>

        {/* Numbered Service List & Image Preview Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Numbered Menu */}
          <div className="lg:col-span-7 space-y-4">
            {servicesList.map((service, idx) => {
              const isActive = activeService === idx;
              return (
                <div
                  key={service.number}
                  onClick={() => setActiveService(idx)}
                  onMouseEnter={() => setActiveService(idx)}
                  className={`p-6 sm:p-8 rounded-3xl cursor-pointer border transition-all duration-500 ${
                    isActive
                      ? "bg-forest-rich border-gold/40 shadow-glow-green"
                      : "bg-forest-rich/40 border-ivory/10 hover:border-ivory/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 sm:gap-6">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-copper shrink-0">
                        {service.number}
                      </span>
                      <div className="space-y-1">
                        <h3 className="font-serif text-xl sm:text-2xl font-medium text-ivory">
                          {service.title}
                        </h3>
                        <p className="text-xs uppercase tracking-wider text-gold font-medium">
                          {service.subtitle}
                        </p>
                        <p className={`text-xs text-ivory/70 font-light leading-relaxed pt-2 max-w-lg transition-all ${
                          isActive ? "block" : "hidden sm:block sm:opacity-60"
                        }`}>
                          {service.desc}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-serif text-xl sm:text-2xl font-bold text-ivory block">
                        {service.price}
                      </span>
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-gold hover:text-ivory font-semibold mt-2"
                      >
                        <span>Book</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Image Hover Preview */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-ivory/20 h-[520px]">
              <img
                src={servicesList[activeService].image}
                alt={servicesList[activeService].title}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-rich/90 via-transparent to-transparent flex flex-col justify-end p-8 text-ivory">
                <span className="text-[10px] uppercase tracking-[0.2em] text-copper font-semibold">
                  Service Feature
                </span>
                <h4 className="font-serif text-2xl font-medium text-ivory mt-1">
                  {servicesList[activeService].title}
                </h4>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
