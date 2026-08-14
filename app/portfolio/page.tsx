"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, X, Sparkles, MapPin } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
  tags: string[];
  description: string;
}

const allProjects: PortfolioItem[] = [
  {
    id: 1,
    title: "Terracotta & Linen Living Suite",
    category: "Living Room",
    location: "Indiranagar, Bengaluru",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    tags: ["Japandi", "Terracotta", "Teakwood"],
    description: "A spacious 3 BHK living room styled with low-slung solid teakwood sofas, raw linen cushions, and warm terracotta floor urns.",
  },
  {
    id: 2,
    title: "Serene Teak & Rattan Master Sanctuary",
    category: "Bedroom",
    location: "Worli, Mumbai",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    tags: ["Warm Minimalist", "Natural Fiber"],
    description: "A serene master bedroom using woven rattan headboards, unbleached cotton bedding, and brass wall sconces.",
  },
  {
    id: 3,
    title: "Sun-drenched Brass & Clay Dining Studio",
    category: "Dining",
    location: "Jubilee Hills, Hyderabad",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    tags: ["Handcrafted", "Earthy"],
    description: "6-seater minimalist teak dining table framed by warm lime-wash walls, brass pendant lights, and potted fiddle-leaf figs.",
  },
  {
    id: 4,
    title: "Verdant Balcony Nook & Cane Lounger",
    category: "Balcony",
    location: "Koramangala, Bengaluru",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    tags: ["Urban Jungle", "Cane"],
    description: "Compact city apartment balcony turned into a lush green retreat with weather-resistant cane armchairs and terracotta pots.",
  },
  {
    id: 5,
    title: "Zen Minimalist Work Studio",
    category: "Home Office",
    location: "Bandra, Mumbai",
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80",
    tags: ["Minimalist", "Teak"],
    description: "A focused home office setup with floating teak desk, ergonomic mesh seating, and warm indirect strip lighting.",
  },
  {
    id: 6,
    title: "Earthy Ceramic & Brass Decor Nook",
    category: "Decor",
    location: "Sadashivanagar, Bengaluru",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
    tags: ["Ceramics", "Brass", "Styling"],
    description: "Curated display shelves showcasing hand-thrown terracotta ceramics, antique brass oil lamps, and dried botanical arrangements.",
  },
];

const categories = ["All", "Living Room", "Bedroom", "Dining", "Balcony", "Home Office", "Decor"];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedModalItem, setSelectedModalItem] = useState<PortfolioItem | null>(null);

  const filtered =
    selectedCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Inspiration Gallery</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium text-earth">Our Portfolio of Transformed Spaces</h1>
        <p className="text-base sm:text-lg text-charcoal-muted font-light leading-relaxed">
          Browse real homes across Bengaluru, Mumbai, and Hyderabad styled with Indian Minimalist principles.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              selectedCategory === cat
                ? "bg-earth text-white shadow-md"
                : "bg-surface text-charcoal-muted hover:bg-earth/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedModalItem(item)}
            className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-earth/10 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
          >
            <div className="relative h-72 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                {item.tags.map((tag) => (
                  <span key={tag} className="bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider text-earth uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 space-y-2">
              <div className="flex items-center gap-1 text-xs text-primary font-medium">
                <MapPin className="w-3.5 h-3.5" />
                <span>{item.location}</span>
              </div>
              <h3 className="font-serif text-xl font-medium text-earth group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-charcoal-muted font-light line-clamp-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedModalItem && (
        <div className="fixed inset-0 z-50 bg-earth/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-elevated relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedModalItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-earth/60 hover:bg-earth text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-96 relative">
              <img
                src={selectedModalItem.image}
                alt={selectedModalItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {selectedModalItem.category}
                </span>
                <span className="text-xs text-charcoal-muted">{selectedModalItem.location}</span>
              </div>

              <h2 className="font-serif text-2xl font-medium text-earth">{selectedModalItem.title}</h2>
              <p className="text-sm text-charcoal-muted leading-relaxed font-light">{selectedModalItem.description}</p>

              <div className="pt-4 border-t border-earth/10 flex items-center justify-between">
                <div className="flex gap-2">
                  {selectedModalItem.tags.map((t) => (
                    <span key={t} className="text-xs bg-surface text-earth px-3 py-1 rounded-full font-medium">
                      #{t}
                    </span>
                  ))}
                </div>

                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full text-xs font-medium transition-colors"
                >
                  <span>Style Similar Space</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
