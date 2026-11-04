import React from 'react';
import { Layers, RefreshCw, Sparkles, Headphones, CheckCircle2, Trophy } from 'lucide-react';
import { TESTIMONIALS } from '../data/tweaksData';

export const LandingWhyUs: React.FC = () => {
  const pillars = [
    {
      title: 'All-in-One Solution',
      desc: 'Everything you need in one comprehensive utility',
      icon: Layers,
    },
    {
      title: 'Regular Updates',
      desc: 'Lifetime access to all future updates and features',
      icon: RefreshCw,
    },
    {
      title: 'Easy to Use',
      desc: 'Intuitive interface with one-click optimizations',
      icon: Sparkles,
    },
    {
      title: 'Customer Support',
      desc: 'Premium support via Discord and email',
      icon: Headphones,
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-900 bg-[#070709]/80">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-wider uppercase mb-3 text-white text-balance">
            Why Choose <span className="text-[#FF1E27] drop-shadow-[0_0_20px_rgba(255,30,39,0.7)]">Ultimate Edition?</span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg font-sans">
            Engineered by competitive esports engineers for measurable hardware performance.
          </p>
        </div>

        {/* 4 Pillars with Elevated Cyber Borders & Hover Glow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-2xl bg-[#0c0d12]/95 border border-neutral-800/90 p-6 flex flex-col items-center text-center hover:border-[#FF1E27]/50 hover:shadow-[0_0_25px_rgba(255,30,39,0.2)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FF1E27]/10 text-[#FF1E27] flex items-center justify-center mb-4 border border-[#FF1E27]/20 group-hover:scale-110 group-hover:bg-[#FF1E27]/20 transition-all duration-300">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-neutral-100">
                  {pillar.title}
                </h3>
                <p className="text-sm text-neutral-400 font-sans leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Real Benchmark & Proof Section with Glowing Hairline Borders */}
        <div className="rounded-2xl bg-[#0c0d12]/95 border border-[#FF1E27]/30 p-8 lg:p-10 mb-20 relative overflow-hidden red-glow-card transition-all duration-300 hover:border-[#FF1E27]/60">
          {/* Subtle top indicator beam */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF1E27] to-transparent shadow-[0_0_12px_#FF1E27]" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#FF1E27] mb-3">
                <Trophy className="w-4 h-4 animate-bounce" />
                <span className="font-bold tracking-wider">LABORATORY VERIFIED BENCHMARK</span>
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-wide mb-4">
                Measured Latency & Frame Pacing
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-sans">
                Tested across CS2, Apex Legends, and Warzone on AMD Ryzen 7 7800X3D + RTX 4080 running Windows 11 24H2. Interrupt latency measured via LatencyMon kernel trace.
              </p>

              <div className="grid grid-cols-3 gap-4 border-t border-neutral-800/80 pt-6">
                <div>
                  <div className="font-heading font-black text-2xl text-emerald-400 tabular-nums">
                    -58.4%
                  </div>
                  <div className="text-xs text-neutral-400 font-sans">Average DPC Latency</div>
                </div>
                <div>
                  <div className="font-heading font-black text-2xl text-emerald-400 tabular-nums">
                    +36 FPS
                  </div>
                  <div className="text-xs text-neutral-400 font-sans">0.1% Framerate Lows</div>
                </div>
                <div>
                  <div className="font-heading font-black text-2xl text-[#FF1E27] tabular-nums">
                    0.500ms
                  </div>
                  <div className="text-xs text-neutral-400 font-sans">Locked Global Timer</div>
                </div>
              </div>
            </div>

            {/* Visual comparison bars */}
            <div className="w-full lg:w-96 space-y-5 bg-[#070709] p-6 rounded-xl border border-neutral-800 font-mono-code text-xs shadow-inner">
              <div className="text-neutral-400 font-bold uppercase tracking-wider mb-2">
                DPC Interrupt Execution Time (Lower is better)
              </div>

              <div>
                <div className="flex justify-between text-neutral-400 mb-1">
                  <span>Stock Windows 11</span>
                  <span className="text-neutral-300">142 µs</span>
                </div>
                <div className="w-full h-3 bg-neutral-900 rounded-full overflow-hidden p-0.5 border border-neutral-800">
                  <div className="h-full bg-neutral-600 rounded-full w-[90%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#FF1E27] mb-1 font-semibold">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    RoninTweaks Ultimate
                  </span>
                  <span className="text-emerald-400 font-bold">59 µs</span>
                </div>
                <div className="w-full h-3 bg-neutral-900 rounded-full overflow-hidden p-0.5 border border-[#FF1E27]/40 shadow-[0_0_10px_rgba(255,30,39,0.3)]">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-[#FF1E27] rounded-full w-[38%] animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Testimonials with Glowing Hairline Borders */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="font-heading font-bold text-xl uppercase tracking-wider text-white">
            Trusted by Competitive Players & Overclockers
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-[#0c0d12]/95 border border-neutral-800/90 p-6 flex flex-col justify-between hover:border-[#FF1E27]/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.8)]"
            >
              <div className="mb-4">
                <div className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono-code bg-[#FF1E27]/10 text-[#FF1E27] border border-[#FF1E27]/30 mb-3 shadow-[0_0_8px_rgba(255,30,39,0.15)]">
                  {t.gain}
                </div>
                <p className="text-neutral-300 text-sm italic leading-relaxed font-sans">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="border-t border-neutral-900 pt-3">
                <div className="font-heading font-bold text-sm text-white">{t.name}</div>
                <div className="text-xs text-neutral-400 font-sans">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
