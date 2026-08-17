"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

const curatedProducts = [
  {
    id: 1,
    name: "Hand-Sculpted Teakwood Dining Chair",
    category: "Furniture Curation",
    price: "₹18,500",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80",
    link: "/book",
    tag: "Craft Cluster",
  },
  {
    id: 2,
    name: "Raw Terracotta Architectural Vase",
    category: "Art & Accents",
    price: "₹6,800",
    image: "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&w=600&q=80",
    link: "/book",
    tag: "Handcrafted",
  },
  {
    id: 3,
    name: "Woven Cane & Brass Pendant Light",
    category: "Warm Lighting",
    price: "₹14,200",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    link: "/book",
    tag: "Artisan Brass",
  },
  {
    id: 4,
    name: "Unbleached Organic Linen Sofa Cover",
    category: "Textiles & Rugs",
    price: "₹24,000",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    link: "/book",
    tag: "100% Linen",
  },
];

export default function ProductCurationGrid() {
  return (
    <section className="py-28 bg-background border-y border-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-terracotta font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mukta's Curated Edit</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-charcoal tracking-tight">
              Pieces Worth Bringing Home
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-terracotta transition-colors border-b border-charcoal/30 hover:border-terracotta pb-1"
          >
            <span>Explore Sourcing Stories</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-Column Editorial Photography Grid (De-cardified) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {curatedProducts.map((p) => (
            <div key={p.id} className="group space-y-4">
              <div className="relative h-80 rounded-2xl overflow-hidden bg-surface shadow-sm">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-charcoal font-semibold border border-charcoal/10">
                  {p.tag}
                </span>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase tracking-[0.18em] text-terracotta font-semibold text-[10px]">
                    {p.category}
                  </span>
                  <span className="font-serif font-semibold text-charcoal">
                    {p.price}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-normal text-charcoal group-hover:text-terracotta transition-colors line-clamp-2 leading-snug">
                  {p.name}
                </h3>

                <Link
                  href={p.link}
                  className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-semibold text-charcoal-muted group-hover:text-terracotta transition-colors pt-1"
                >
                  <span>Request Sourcing Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
