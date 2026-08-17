"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, X, Sparkles, MapPin } from "lucide-react";

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
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest/5 border border-forest/10 text-copper text-xs font-semibold uppercase tracking-[0.2em]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Architectural Portfolio</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-forest tracking-tight">
          Selected Realized Spaces
        </h1>
        <p className="text-base sm:text-lg text-charcoal-muted font-light leading-relaxed">
          Browse authentic Indian minimalist interiors styled across Bengaluru, Mumbai, and Hyderabad.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-forest text-ivory shadow-md"
                : "bg-surface text-charcoal-muted hover:bg-forest/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedModalItem(item)}
            className="group cursor-pointer rounded-3xl overflow-hidden bg-card border border-forest/10 shadow-soft hover:shadow-elevated transition-all duration-500 flex flex-col justify-between"
          >
            <div className="relative h-72 overflow-hidden bg-surface">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                {item.tags.map((tag) => (
                  <span key={tag} className="bg-charcoal/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-ivory font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs text-copper font-medium">
                <MapPin className="w-3.5 h-3.5" />
                <span>{item.location}</span>
              </div>
              <h3 className="font-serif text-xl font-medium text-forest group-hover:text-copper transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-charcoal-muted font-light line-clamp-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedModalItem && (
        <div className="fixed inset-0 z-50 bg-forest/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-ivory rounded-3xl overflow-hidden max-w-3xl w-full shadow-elevated relative border border-ivory/20">
            <button
              onClick={() => setSelectedModalItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-forest/80 hover:bg-forest text-ivory flex items-center justify-center transition-colors shadow-md"
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
              <div className="flex items-center gap-3">
                <span className="bg-copper/10 text-copper px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {selectedModalItem.category}
                </span>
                <span className="text-xs text-charcoal-muted font-medium">{selectedModalItem.location}</span>
              </div>

              <h2 className="font-serif text-3xl font-medium text-forest">{selectedModalItem.title}</h2>
              <p className="text-sm text-charcoal-muted leading-relaxed font-light">{selectedModalItem.description}</p>

              <div className="pt-4 border-t border-forest/10 flex items-center justify-between">
                <div className="flex gap-2">
                  {selectedModalItem.tags.map((t) => (
                    <span key={t} className="text-xs bg-surface text-forest px-3 py-1 rounded-full font-medium">
                      #{t}
                    </span>
                  ))}
                </div>

                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 bg-forest hover:bg-forest-rich text-ivory px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold transition-colors"
                >
                  <span>Style Similar Space</span>
                  <ArrowUpRight className="w-4 h-4 text-copper-soft" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
