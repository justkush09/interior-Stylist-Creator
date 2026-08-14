"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide main nav header on admin panel pages if desired, or keep simplified
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-earth">
              Indian Minimalist
            </span>
            <span className="text-[10px] tracking-widest uppercase text-charcoal-muted font-sans font-medium">
              Home Styling Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {!isAdmin && (
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-earth/80 hover:text-primary"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/admin"
            className="text-xs uppercase tracking-wider font-semibold text-charcoal-muted hover:text-earth transition-colors px-3 py-2"
          >
            Admin Portal
          </Link>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-earth hover:text-primary focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-b border-earth/10 px-6 pt-4 pb-6 space-y-4">
          {!isAdmin && (
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors py-1 ${
                    pathname === link.href
                      ? "text-primary font-semibold"
                      : "text-earth hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
          <div className="pt-3 border-t border-earth/10 flex flex-col gap-3">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-charcoal-muted hover:text-earth py-1"
            >
              Admin Portal
            </Link>
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex justify-center items-center gap-2 bg-primary text-white py-3 rounded-full text-sm font-medium"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
