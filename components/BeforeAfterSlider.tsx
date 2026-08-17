"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Sparkles, SlidersHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
}

export default function BeforeAfterSlider({
  beforeImage = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80",
  afterImage = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80",
  beforeLabel = "Original Unstyled Room",
  afterLabel = "Indian Minimalist Transformation",
  title = "SEE YOUR SPACE REIMAGINED",
  subtitle = "Drag the slider to compare raw architecture against curated warm teakwood, terracotta, and linen styling.",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    },
    [isDragging, handleMove]
  );

  return (
    <section className="py-28 sm:py-36 bg-forest text-ivory relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-forest-light/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Editorial Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ivory/10 border border-ivory/15 text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Interactive Transformation</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-ivory tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-ivory/70 text-base sm:text-lg font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[420px] sm:h-[580px] lg:h-[680px] rounded-3xl overflow-hidden shadow-elevated border border-ivory/20 select-none cursor-ew-resize group"
        >
          {/* AFTER Image (Full Layer) */}
          <img
            src={afterImage}
            alt={afterLabel}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* BEFORE Image (Clipped Layer) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={beforeImage}
              alt={beforeLabel}
              className="absolute inset-0 h-full object-cover max-w-none"
              style={{ width: containerWidth ? `${containerWidth}px` : "100%" }}
            />
          </div>

          {/* Label Badges */}
          <div className="absolute top-6 left-6 z-20 bg-charcoal/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-ivory border border-ivory/20 shadow-md">
            BEFORE: {beforeLabel}
          </div>
          <div className="absolute top-6 right-6 z-20 bg-forest/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-gold border border-gold/30 shadow-md">
            AFTER: {afterLabel}
          </div>

          {/* Vertical Slider Line & Handle */}
          <div
            className="absolute top-0 bottom-0 z-30 w-1 bg-copper cursor-ew-resize"
            style={{ left: `calc(${sliderPosition}% - 2px)` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-12 h-12 rounded-full bg-forest border-2 border-gold flex items-center justify-center text-ivory shadow-glow-gold group-hover:scale-110 transition-transform">
              <SlidersHorizontal className="w-5 h-5 text-gold" />
            </div>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="flex justify-between items-center text-[10px] sm:text-xs uppercase tracking-widest text-ivory/50 font-light max-w-xl mx-auto">
          <span>← Drag Left for Before</span>
          <span>Drag Right for Styled After →</span>
        </div>
      </div>
    </section>
  );
}
