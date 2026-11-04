import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/tweaksData';

export const LandingFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-900 bg-[#070709]">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono-code text-[#FF1E27] uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>CLARITY & ASSURANCE</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-wider uppercase text-white">
            FREQUENTLY ASKED <span className="text-[#FF1E27] drop-shadow-[0_0_20px_rgba(255,30,39,0.7)]">QUESTIONS</span>
          </h2>
        </div>

        {/* Accordions with Animated Cyber Borders */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0c0d12] border-[#FF1E27]/60 shadow-[0_0_25px_rgba(255,30,39,0.18)]'
                    : 'bg-[#0a0b10]/90 border-neutral-800/80 hover:border-neutral-700 hover:bg-[#0c0d14]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className={`font-heading font-bold text-base sm:text-lg tracking-wide pr-4 transition-colors ${
                    isOpen ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                  }`}>
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#FF1E27] text-white border-[#FF1E27] rotate-180 red-glow-subtle'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-700 group-hover:text-white group-hover:border-neutral-500'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-neutral-300 font-sans leading-relaxed border-t border-neutral-900/80 animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
