"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Indiranagar Minimalist Villa",
    category: "Full Residence Styling",
    location: "Bengaluru",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    size: "large",
    tag: "Teak & Terracotta",
  },
  {
    id: 2,
    title: "Worli Sea-Facing Living Studio",
    category: "Living Room",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    size: "small",
    tag: "Warm Japandi",
  },
  {
    id: 3,
    title: "Koregaon Park Earthy Penthouse",
    category: "Master Sanctuary",
    location: "Pune",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    size: "small",
    tag: "Linen & Brass",
  },
  {
    id: 4,
    title: "Banjara Hills Courtyard Suite",
    category: "Full Villa",
    location: "Hyderabad",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    size: "wide",
    tag: "Artisan Wood",
  },
];

export default function MasonryPortfolio() {
  return (
    <section className="py-24 bg-background border-t border-forest/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-copper font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Architectural Showcase</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-forest tracking-tight">
              Selected Realized Projects
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-forest hover:text-copper transition-colors border-b border-forest hover:border-copper pb-1"
          >
            <span>Explore All 250+ Styled Spaces</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Asymmetric Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Large Featured Item (Col 7) */}
          <div className="md:col-span-7 group relative rounded-3xl overflow-hidden shadow-soft hover:shadow-elevated border border-forest/10 h-[480px]">
            <img
              src={projects[0].image}
              alt={projects[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent flex flex-col justify-end p-8 text-ivory">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
                {projects[0].category} • {projects[0].location}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ivory mt-1">
                {projects[0].title}
              </h3>
              <div className="pt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs uppercase tracking-widest text-copper-soft font-semibold">
                  {projects[0].tag}
                </span>
                <Link
                  href="/portfolio"
                  className="w-10 h-10 rounded-full bg-copper flex items-center justify-center text-ivory shadow-md"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* 2 Staggered Items (Col 5) */}
          <div className="md:col-span-5 flex flex-col gap-8">
            {projects.slice(1, 3).map((p) => (
              <div
                key={p.id}
                className="group relative rounded-3xl overflow-hidden shadow-soft hover:shadow-elevated border border-forest/10 h-[224px]"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-transparent to-transparent flex flex-col justify-end p-6 text-ivory">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">
                    {p.category}
                  </span>
                  <h4 className="font-serif text-lg font-medium text-ivory mt-0.5">
                    {p.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Full Wide Bottom Item (Col 12) */}
          <div className="md:col-span-12 group relative rounded-3xl overflow-hidden shadow-soft hover:shadow-elevated border border-forest/10 h-[360px]">
            <img
              src={projects[3].image}
              alt={projects[3].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent flex flex-col justify-end p-8 text-ivory">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
                {projects[3].category} • {projects[3].location}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ivory mt-1">
                {projects[3].title}
              </h3>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
