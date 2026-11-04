import React, { useRef, useState, useEffect } from 'react';
import { ShoppingCart, Lock, Check, Key, Zap } from 'lucide-react';

interface LandingHeroProps {
  onOpenBuy: () => void;
  onOpenActivate: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onOpenBuy,
  onOpenActivate,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const featuresList = [
    'All Premium Features Included',
    'BIOS Tuner (Addon)',
    'Clean & Intuitive Interface',
    'Ultra-Low Latency Optimization',
    'Premium Support & Updates',
    'Script Builder',
    'Power Plans',
    'Nvidia Profiles',
    'Auto-Tuner',
    'Quick Actions',
    'System Tweaks',
    'Gaming Tweaks',
    'Input-Delay Tweaks',
    'CPU Tweaks',
    'GPU Tweaks',
    'Peripheral Tweaks',
    'Network Tweaks',
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll > 0) {
        setScrollProgress((scrollTop / maxScroll) * 100);
      }
    }
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-14 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-tactical-grid">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-radial-vignette pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Main Headline */}
        <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl tracking-wider uppercase mb-4 text-balance">
          <span className="text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]">ULTIMATE</span>{' '}
          <span className="text-[#FF1E27] drop-shadow-[0_0_24px_rgba(255,30,39,0.8)]">EDITION</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-neutral-400 font-sans-clean max-w-2xl mb-8 tracking-wide">
          Unlock your system&apos;s full potential with our ultimate tweaking utility
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={scrollToPricing}
            className="px-8 py-3.5 rounded-xl text-sm sm:text-base font-heading font-bold uppercase tracking-wider text-white bg-[#FF1E27] hover:bg-[#E01720] red-glow-btn transition-all active:scale-95 flex items-center gap-2"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>GET ULTIMATE LICENSE</span>
          </button>

          <button
            onClick={onOpenActivate}
            className="px-7 py-3.5 rounded-xl text-sm sm:text-base font-heading font-semibold uppercase tracking-wider text-neutral-300 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-[#FF1E27]/50 hover:text-white transition-all flex items-center gap-2"
          >
            <Key className="w-4 h-4 text-[#FF1E27]" />
            <span>ENTER SENT KEY</span>
          </button>
        </div>

        {/* Pricing Card with Clean Custom Red Scrollbar (Matches Original Design) */}
        <div
          id="pricing"
          className="w-full max-w-md mx-auto rounded-2xl bg-[#0c0d12]/95 border border-[#FF1E27]/40 p-6 sm:p-8 text-left relative red-glow-card backdrop-blur-xl transition-colors hover:border-[#FF1E27]"
        >
          {/* Top indicator line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E27] to-transparent shadow-[0_0_12px_#FF1E27] animate-border-pulse" />

          {/* Corner accents */}
          <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2 border-[#FF1E27]" />
          <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t-2 border-r-2 border-[#FF1E27]" />
          <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b-2 border-l-2 border-[#FF1E27]" />
          <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2 border-[#FF1E27]" />

          {/* Card Header (Clean, no clutter) */}
          <div className="mb-5">
            <h2 className="font-heading font-bold text-xl uppercase tracking-wider text-white mb-1">
              ULTIMATE
            </h2>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-black text-4xl text-[#FF1E27] drop-shadow-[0_0_12px_rgba(255,30,39,0.5)]">
                $25
              </span>
              <span className="text-neutral-400 text-sm font-sans">/ lifetime</span>
            </div>
            <p className="text-xs text-neutral-400 font-sans mt-0.5">
              One-time payment
            </p>
          </div>

          {/* Features Scrollable Area */}
          <div className="relative mb-6">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="space-y-2.5 max-h-[340px] overflow-y-auto pr-4 no-scrollbar scroll-smooth"
            >
              {featuresList.map((feat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-sm text-neutral-200 p-1.5 rounded-lg hover:bg-neutral-900/60 transition-colors"
                >
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />
                  <span className="font-sans font-medium">{feat}</span>
                </div>
              ))}
            </div>

            {/* Clean Custom Red Scroll Indicator Track (Replaces ugly browser white scrollbar) */}
            <div className="absolute right-0 top-1 bottom-1 w-[3px] bg-neutral-900/90 rounded-full overflow-hidden">
              <div
                className="w-full bg-[#FF1E27] rounded-full shadow-[0_0_8px_rgba(255,30,39,0.9)] transition-all duration-75"
                style={{
                  height: '35%',
                  transform: `translateY(${scrollProgress * 1.85}%)`
                }}
              />
            </div>
          </div>

          {/* Buy Now Button */}
          <button
            onClick={onOpenBuy}
            className="w-full py-3.5 px-4 rounded-xl font-heading font-bold text-sm tracking-wider uppercase text-white bg-[#FF1E27] hover:bg-[#E01720] red-glow-btn transition-all duration-200 flex items-center justify-center gap-2 mb-3 active:scale-[0.98]"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>BUY NOW</span>
          </button>

          {/* Secure checkout notice */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-400">
            <Lock className="w-3.5 h-3.5 text-neutral-400" />
            <span>Secure checkout via Stripe & Crypto</span>
          </div>
        </div>
      </div>
    </section>
  );
};
