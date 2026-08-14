"use client";

import Link from "next/link";
import { Sparkles, Mail, Phone, MapPin, Instagram, Facebook, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-earth text-white pt-16 pb-12 border-t border-earth-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-earth-muted/30">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary-light">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-medium tracking-tight text-surface">
                Indian Minimalist
              </span>
            </div>
            <p className="text-sm text-surface/70 leading-relaxed font-light">
              Crafting warm, peaceful home interiors across India. Blending organic textures, natural light, and modern minimal forms tailored to your lifestyle.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-earth-muted/40 hover:bg-primary flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4 text-surface" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-earth-muted/40 hover:bg-primary flex items-center justify-center transition-colors">
                <Share2 className="w-4 h-4 text-surface" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-earth-muted/40 hover:bg-primary flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4 text-surface" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-medium text-surface mb-4">Explore Studio</h4>
            <ul className="space-y-2.5 text-sm text-surface/70">
              <li>
                <Link href="/" className="hover:text-primary-light transition-colors">Home Studio</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary-light transition-colors">Design Packages</Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-primary-light transition-colors">6-Step Process</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-primary-light transition-colors">Project Gallery</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-light transition-colors">Our Philosophy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-lg font-medium text-surface mb-4">Get In Touch</h4>
            <ul className="space-y-3 text-sm text-surface/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary-light shrink-0 mt-1" />
                <span>Indiranagar, Bengaluru & Worli, Mumbai</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-light shrink-0" />
                <span>hello@indianminimalist.in</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-light shrink-0" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-medium text-surface mb-4">Design Journal</h4>
            <p className="text-sm text-surface/70 mb-4 font-light">
              Receive seasonal interior lookbooks and Indian minimalist styling guides.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-earth-muted/30 border border-earth-muted/50 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-surface/40 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-surface/50 gap-4">
          <p>© {new Date().getFullYear()} Indian Minimalist Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-surface">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-surface">Terms of Service</Link>
            <Link href="/admin" className="hover:text-surface">Stylist Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
