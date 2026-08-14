import Link from "next/link";
import { ArrowRight, Sparkles, Camera, Calendar, Palette, ShoppingBag, CheckCircle } from "lucide-react";

export const metadata = {
  title: "How It Works | 6-Step Consultation Journey | Indian Minimalist",
  description: "Learn how Indian Minimalist transforms your space step-by-step from initial intake quiz to bespoke moodboard and shopping links.",
};

const steps = [
  {
    step: "01",
    title: "Complete the Intake Form",
    description:
      "Tell us about your home type (1 BHK to Villa), room categories (Living Room, Bedroom, Balcony), budget preferences, and style vibes.",
    icon: Sparkles,
  },
  {
    step: "02",
    title: "Upload Photos of Your Space",
    description:
      "Drag-and-drop current room photos from multiple angles. Our system logs room dimensions, lighting orientations, and architectural accents.",
    icon: Camera,
  },
  {
    step: "03",
    title: "Reserve Your Video Session",
    description:
      "Select your preferred date and time slot for a 45-minute live 1-on-1 video call with a dedicated senior Indian Minimalist interior stylist.",
    icon: Calendar,
  },
  {
    step: "04",
    title: "Receive Custom Moodboards & Palettes",
    description:
      "Your stylist drafts a bespoke material palette featuring natural teakwood, raw linen, hand-thrown clay, and warm ivory paint codes.",
    icon: Palette,
  },
  {
    step: "05",
    title: "Direct Sourcing Links & Vendors",
    description:
      "Get a organized shopping deck containing direct purchasing links for verified furniture, lighting, brassware, and decor items.",
    icon: ShoppingBag,
  },
  {
    step: "06",
    title: "Guided Room Placement",
    description:
      "Follow our easy 2D placement guide to set up your furniture and decor seamlessly, bringing calm and serenity into your home.",
    icon: CheckCircle,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Simple & Transparent</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium text-earth">The 6-Step Transformation Process</h1>
        <p className="text-base sm:text-lg text-charcoal-muted font-light leading-relaxed">
          How we take your room from cluttered or plain to a warm, sun-drenched Indian minimalist sanctuary.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((s) => {
          const IconComp = s.icon;
          return (
            <div key={s.step} className="bg-white p-8 rounded-3xl border border-earth/10 shadow-soft flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 font-serif font-bold text-xl">
                {s.step}
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-medium text-earth flex items-center gap-2">
                  <span>{s.title}</span>
                </h3>
                <p className="text-sm text-charcoal-muted font-light leading-relaxed">{s.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-surface rounded-3xl p-10 text-center space-y-6 max-w-3xl mx-auto border border-earth/10">
        <h2 className="font-serif text-2xl font-medium text-earth">Ready to get started?</h2>
        <p className="text-sm text-charcoal-muted font-light">
          Intake takes less than 3 minutes. Background lead capture ensures your responses are never lost.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-base font-medium transition-all shadow-md"
        >
          <span>Start Consultation Intake</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
