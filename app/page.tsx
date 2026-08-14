"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Home,
  ShieldCheck,
  Star,
  Compass,
  Palette,
  Camera,
  Layers,
  ChevronRight,
} from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    title: "Terracotta & Linen Living Suite",
    category: "Living Room",
    location: "Indiranagar, Bengaluru",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    tags: ["Japandi", "Terracotta", "Teakwood"],
  },
  {
    id: 2,
    title: "Serene Teak & Rattan Master Sanctuary",
    category: "Bedroom",
    location: "Worli, Mumbai",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    tags: ["Warm Minimalist", "Natural Fiber"],
  },
  {
    id: 3,
    title: "Sun-drenched Brass & Clay Dining Studio",
    category: "Dining",
    location: "Jubilee Hills, Hyderabad",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    tags: ["Handcrafted", "Earthy"],
  },
  {
    id: 4,
    title: "Verdant Balcony Nook & Cane Lounger",
    category: "Balcony",
    location: "Koramangala, Bengaluru",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    tags: ["Urban Jungle", "Cane"],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Share Your Vision",
    desc: "Complete our 3-minute consultation intake questionnaire detailing your home layout, room preferences, and budget tier.",
    icon: Home,
  },
  {
    number: "02",
    title: "Upload Room Photos",
    desc: "Upload photos of your space with light angles. Our intake AI & stylists analyze architecture, sunlight, and proportions.",
    icon: Camera,
  },
  {
    number: "03",
    title: "1-on-1 Stylist Call",
    desc: "Lock your 45-minute video consultation with an expert Indian Minimalist lead interior stylist.",
    icon: Calendar,
  },
  {
    number: "04",
    title: "Curated Moodboard & Palette",
    desc: "Receive bespoke moodboards, curated color palettes (Warm Ivory, Clay, Sage), and custom lighting layouts.",
    icon: Palette,
  },
  {
    number: "05",
    title: "Exact Sourcing List & Links",
    desc: "Get clickable links to verified furniture pieces, artisan textiles, brass hardware, and custom decor vendors.",
    icon: Layers,
  },
  {
    number: "06",
    title: "Guided Setup & Reveal",
    desc: "Step-by-step layout placement guide to effortlessly transform your home into a calm, elevated sanctuary.",
    icon: Sparkles,
  },
];

const testimonials = [
  {
    name: "Dr. Radhika Nair",
    role: "Homeowner, 3 BHK Bengaluru",
    text: "Indian Minimalist transformed our noisy City apartment into a quiet, sunlit sanctuary. The terracotta accents and rattan choices felt tailor-made.",
    rating: 5,
  },
  {
    name: "Karan & Tanya Malhotra",
    role: "Villa Owners, Gurgaon",
    text: "The consultation flow was so intuitive. Within a week of our video call, we had an exact shopping list and placement guide. Exceptional experience!",
    rating: 5,
  },
  {
    name: "Priya Varma",
    role: "2 BHK Apartment, Mumbai",
    text: "Finally, interior styling that respects authentic Indian crafts while maintaining pristine minimalist aesthetics. Worth every rupee.",
    rating: 5,
  },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPortfolio =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Home Decor Consultation</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-earth leading-[1.15]">
              Serene Modern Living. <br />
              <span className="italic font-normal text-primary">Warm Indian Textures.</span>
            </h1>

            <p className="text-base sm:text-lg text-charcoal-muted font-light leading-relaxed max-w-2xl">
              We design soulful, clutter-free interior spaces that combine minimalist architecture with warm terracotta, hand-loom textiles, and natural teakwood.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                href="/book"
                className="inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-base font-medium transition-all shadow-elevated hover:shadow-xl"
              >
                <span>Book 1-on-1 Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex justify-center items-center gap-2 bg-surface hover:bg-surface/80 text-earth px-6 py-4 rounded-full text-base font-medium transition-colors border border-earth/10"
              >
                <span>Explore Portfolio</span>
                <ChevronRight className="w-4 h-4 text-primary" />
              </Link>
            </div>

            {/* Social Proof Badges */}
            <div className="pt-8 border-t border-earth/10 grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-serif font-bold text-earth">250+</div>
                <div className="text-xs text-charcoal-muted">Homes Styled</div>
              </div>
              <div>
                <div className="text-2xl font-serif font-bold text-earth">4.9 ★</div>
                <div className="text-xs text-charcoal-muted">Client Rating</div>
              </div>
              <div>
                <div className="text-2xl font-serif font-bold text-earth">100%</div>
                <div className="text-xs text-charcoal-muted">Personalized</div>
              </div>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
                alt="Indian Minimalist Living Room"
                className="w-full h-[480px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase tracking-widest text-primary-light font-semibold">Featured Space</span>
                <h3 className="font-serif text-xl font-medium">The Warm Terracotta Lounge</h3>
                <p className="text-xs text-surface/80">Bengaluru Apartment Transformation</p>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl shadow-elevated border border-white flex items-center gap-3 max-w-xs">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-earth">Consultation Guarantee</div>
                <div className="text-[11px] text-charcoal-muted">Curated sourcing links & lifetime layout plan included</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Philosophy Section */}
      <section className="bg-surface py-20 border-y border-earth/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Design Philosophy</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-earth">
              Minimalist Forms Meets Warm Indian Heritage
            </h2>
            <p className="text-charcoal-muted text-base font-light leading-relaxed">
              We reject clutter, fake synthetic finishes, and cookie-cutter designs. Every room we style honors natural light, earthy brass hardware, hand-loom cottons, and timeless solid wood.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-soft border border-earth/5 text-left space-y-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-earth">Architectural Harmony</h3>
              <p className="text-sm text-charcoal-muted font-light leading-relaxed">
                Optimizing room flow, natural illumination, and proportions before introducing decor.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-soft border border-earth/5 text-left space-y-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-earth">Warm Earthen Palette</h3>
              <p className="text-sm text-charcoal-muted font-light leading-relaxed">
                Subtle ivory, muted clay, warm sandalwood, and sage green tones tailored to Indian lighting.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-soft border border-earth/5 text-left space-y-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-earth">Artisan Sourcing</h3>
              <p className="text-sm text-charcoal-muted font-light leading-relaxed">
                Direct curation from Indian craft clusters, teak masters, clay potters, and weavers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-soft border border-earth/5 text-left space-y-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-earth">Mindful Simplicity</h3>
              <p className="text-sm text-charcoal-muted font-light leading-relaxed">
                Creating serene, clutter-free spaces that feel spacious, welcoming, and effortless to maintain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filterable Portfolio Grid Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Visual Inspiration</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-earth">Explore Transformed Spaces</h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {["All", "Living Room", "Bedroom", "Dining", "Balcony"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeCategory === category
                    ? "bg-earth text-white shadow-sm"
                    : "bg-surface text-charcoal-muted hover:bg-earth/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPortfolio.map((item) => (
            <div key={item.id} className="group rounded-3xl overflow-hidden bg-white border border-earth/10 shadow-soft hover:shadow-elevated transition-all">
              <div className="relative h-80 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider text-earth uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 space-y-2">
                <div className="text-xs text-primary font-medium">{item.location}</div>
                <h3 className="font-serif text-xl font-medium text-earth group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-earth hover:text-primary font-medium text-sm border-b border-earth hover:border-primary pb-1 transition-colors"
          >
            <span>View Complete Portfolio Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6-Step Process Walkthrough */}
      <section className="bg-earth text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-light">Seamless Process</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-surface">How Your Consultation Works</h2>
            <p className="text-surface/70 text-base font-light">
              From intake to shopping links, we make home styling delightful and stress-free in 6 structured steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step) => {
              const IconComp = step.icon;
              return (
                <div key={step.number} className="bg-earth-muted/30 border border-earth-muted/40 p-8 rounded-3xl space-y-4 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-serif font-bold text-primary-light">{step.number}</span>
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary-light">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-medium text-surface">{step.title}</h3>
                  <p className="text-sm text-surface/70 font-light leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-base font-medium transition-all shadow-lg"
            >
              <span>Start Your Intake Form</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing & Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Transparent Pricing</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-earth">Styling Consultation Packages</h2>
          <p className="text-charcoal-muted text-base font-light">
            No hidden designer commissions or inflated costs. Simple, upfront pricing for expert styling guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Package 1 */}
          <div className="bg-white p-8 rounded-3xl border border-earth/10 shadow-soft flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">Starter</span>
              <h3 className="font-serif text-2xl font-medium text-earth">1-on-1 Consultation Call</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold font-serif text-earth">₹1,999</span>
                <span className="text-xs text-charcoal-muted">/ session</span>
              </div>
              <p className="text-sm text-charcoal-muted font-light">Ideal for single room guidance, color selection, or quick layout advice.</p>
              <ul className="space-y-3 pt-4 text-sm text-earth">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>45-Minute 1-on-1 Video Session</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Color Palette & Paint Suggestions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>5 Essential Furniture Sourcing Links</span>
                </li>
              </ul>
            </div>
            <Link
              href="/book"
              className="w-full inline-flex justify-center items-center gap-2 bg-surface hover:bg-earth hover:text-white text-earth py-3 rounded-full text-sm font-medium transition-colors border border-earth/10"
            >
              <span>Book Session</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Package 2 - Popular */}
          <div className="bg-white p-8 rounded-3xl border-2 border-primary shadow-elevated flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase">
              Most Requested
            </div>
            <div className="space-y-4 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Full Room</span>
              <h3 className="font-serif text-2xl font-medium text-earth">Complete Room Styling</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold font-serif text-earth">₹14,999</span>
                <span className="text-xs text-charcoal-muted">/ room</span>
              </div>
              <p className="text-sm text-charcoal-muted font-light">Comprehensive design package for living room, master bedroom, or balcony.</p>
              <ul className="space-y-3 pt-4 text-sm text-earth">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Includes 1-on-1 Video Consultation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>2D Layout Floorplan & Furniture Map</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Full Moodboard & Lighting Concept</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Complete Shopping List with Links</span>
                </li>
              </ul>
            </div>
            <Link
              href="/book"
              className="w-full inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary-dark text-white py-3.5 rounded-full text-sm font-medium transition-colors shadow-sm"
            >
              <span>Book Room Styling</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Package 3 */}
          <div className="bg-white p-8 rounded-3xl border border-earth/10 shadow-soft flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">Full Residence</span>
              <h3 className="font-serif text-2xl font-medium text-earth">Full Home Transformation</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold font-serif text-earth">₹39,999</span>
                <span className="text-xs text-charcoal-muted">/ home</span>
              </div>
              <p className="text-sm text-charcoal-muted font-light">End-to-end styling direction for 2 BHK, 3 BHK or Villas.</p>
              <ul className="space-y-3 pt-4 text-sm text-earth">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Multi-Room Cohesive Design Theme</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Artisan Custom Sourcing & Priority Call</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>On-Demand WhatsApp Stylist Support</span>
                </li>
              </ul>
            </div>
            <Link
              href="/book"
              className="w-full inline-flex justify-center items-center gap-2 bg-surface hover:bg-earth hover:text-white text-earth py-3 rounded-full text-sm font-medium transition-colors border border-earth/10"
            >
              <span>Book Full Home</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-surface py-20 border-t border-earth/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Client Stories</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-earth">Loved by Homeowners Across India</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-soft border border-earth/5 space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-charcoal-muted text-sm italic leading-relaxed font-light">"{t.text}"</p>
                <div className="pt-2 border-t border-earth/10">
                  <div className="font-serif font-medium text-earth text-base">{t.name}</div>
                  <div className="text-xs text-primary">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-earth text-white rounded-3xl p-10 sm:p-16 text-center space-y-6 relative overflow-hidden shadow-elevated">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-serif text-3xl sm:text-5xl font-medium leading-tight">
              Ready to Transform Your Home into a Peaceful Sanctuary?
            </h2>
            <p className="text-surface/80 text-base font-light">
              Take the 3-minute intake quiz, upload your room photos, and lock your video consultation session today.
            </p>
            <div className="pt-4">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-base font-medium transition-all shadow-lg hover:scale-105"
              >
                <span>Book Consultation Now (₹1,999)</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
