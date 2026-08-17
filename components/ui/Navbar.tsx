"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 pointer-events-none transition-all duration-500 ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="pointer-events-auto mx-auto flex min-h-[52px] max-w-[920px] items-center justify-between rounded-full border border-ivory/10 bg-[#0c1512]/75 px-3 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:px-4">
        <Link href="/" className="flex items-center gap-2 pl-2">
          <span className="font-serif text-xl font-semibold leading-none tracking-normal text-ivory">
            IM
          </span>
          <span className="hidden text-[8px] font-bold uppercase tracking-[0.42em] text-ivory/55 sm:block">
            Studio
          </span>
        </Link>

        {!isAdmin && (
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                    isActive ? "text-ivory" : "text-ivory/62 hover:text-ivory"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-px w-full rounded-full bg-[#00b8ac]" />
                  )}
                </Link>
              );
            })}
          </nav>
        )}

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/admin"
            className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory/50 transition-colors hover:text-ivory"
          >
            Admin
          </Link>
          <Link
            href="/book"
            className="inline-flex min-h-[34px] items-center rounded-full bg-[#007d75] px-5 text-[11px] font-semibold uppercase tracking-widest text-ivory transition-colors hover:bg-[#00978d]"
          >
            Book
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="p-2 text-ivory md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="pointer-events-auto mx-3 mt-3 rounded-3xl border border-ivory/10 bg-[#0c1512]/95 px-6 pb-8 pt-6 shadow-elevated backdrop-blur-xl md:hidden">
          {!isAdmin && (
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1 text-sm uppercase tracking-widest transition-colors ${
                    pathname === link.href
                      ? "font-bold text-ivory"
                      : "text-ivory/65 hover:text-ivory"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
          <div className="mt-6 flex flex-col gap-4 border-t border-ivory/10 pt-5">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-medium uppercase tracking-widest text-ivory/55"
            >
              Admin Portal
            </Link>
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#007d75] py-3.5 text-xs font-semibold uppercase tracking-widest text-ivory"
            >
              Book Styling Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
