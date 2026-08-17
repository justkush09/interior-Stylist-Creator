"use client";

import Link from "next/link";
import { Compass, Mail, MapPin, Instagram, Facebook, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-forest text-ivory pt-24 pb-12 border-t border-forest-light/20 relative overflow-hidden">
      {/* Decorative Arch Graphic */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest-light/10 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-ivory/10">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-ivory/10 border border-ivory/20 flex items-center justify-center text-terracotta">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-semibold tracking-tight text-ivory lowercase">
                @indian.minimalist
              </span>
            </div>
            <p className="text-sm text-ivory/80 leading-relaxed font-light max-w-sm">
              Calm, intentional, timeless spaces. Styling warm Indian minimalist home sanctuaries with raw teakwood, terracotta, unbleached linens, and indoor greenery.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-forest-rich border border-ivory/15 hover:border-terracotta hover:text-terracotta flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-forest-rich border border-ivory/15 hover:border-terracotta hover:text-terracotta flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-terracotta-soft">Explore Studio</h4>
            <ul className="space-y-3 text-sm text-ivory/70 font-light">
              <li>
                <Link href="/" className="hover:text-ivory transition-colors">Home Studio</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-ivory transition-colors">Styling Packages</Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-ivory transition-colors">6-Step Process</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-ivory transition-colors">Realized Spaces</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-ivory transition-colors">Design Philosophy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-terracotta-soft">Locations</h4>
            <ul className="space-y-3 text-sm text-ivory/70 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <span>Indiranagar, Bengaluru</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <span>Worli, Mumbai</span>
              </li>
              <li className="flex items-center gap-2.5 pt-2">
                <Mail className="w-4 h-4 text-terracotta shrink-0" />
                <span className="text-xs">hello@indianminimalist.in</span>
              </li>
            </ul>
          </div>

          {/* Journal Subscription */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-terracotta-soft">Design Lookbook</h4>
            <p className="text-xs text-ivory/70 font-light leading-relaxed">
              Subscribe to receive seasonal Indian Minimalist lookbooks and home styling guides.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2.5">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full bg-forest-rich border border-ivory/15 rounded-lg px-4 py-3 text-xs text-ivory placeholder-ivory/40 focus:outline-none focus:border-terracotta"
              />
              <button
                type="submit"
                className="w-full bg-terracotta hover:bg-terracotta-dark text-ivory rounded-lg py-3 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-ivory/40 font-light gap-4">
          <p>© {new Date().getFullYear()} @indian.minimalist. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-ivory transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-ivory transition-colors">Terms of Service</Link>
            <Link href="/admin" className="hover:text-terracotta transition-colors">Stylist Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
