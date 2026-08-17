"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface FloatingProductTagProps {
  title?: string;
  category?: string;
  price?: string;
  image?: string;
  link?: string;
  positionClass?: string;
}

export default function FloatingProductTag({
  title = "Hand-Carved Teakwood Coffee Table",
  category = "Living Room",
  price = "₹35,000",
  image = "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=400&q=80",
  link = "/services",
  positionClass = "bottom-8 left-8 sm:bottom-12 sm:left-12",
}: FloatingProductTagProps) {
  return (
    <div
      className={`absolute z-30 ${positionClass} floating-tag p-3 sm:p-4 rounded-2xl flex items-center gap-3.5 max-w-xs sm:max-w-sm hover:scale-105 transition-all duration-500`}
    >
      {/* Product Image Thumbnail */}
      <img
        src={image}
        alt={title}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-white/20 shrink-0"
      />

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-semibold block">
          {category}
        </span>
        <h4 className="font-serif text-xs sm:text-sm font-medium text-white truncate">
          {title}
        </h4>
        <div className="text-xs font-semibold text-ivory/90 mt-0.5">{price}</div>
      </div>

      {/* Action Arrow Button */}
      <Link
        href={link}
        className="w-8 h-8 rounded-full bg-copper/20 border border-copper/40 hover:bg-copper flex items-center justify-center text-ivory shrink-0 transition-colors"
      >
        <ArrowUpRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
