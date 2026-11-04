import React from 'react';

interface LandingFooterProps {
  onOpenActivate: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onOpenActivate,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-900 bg-[#050507] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Overview */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-white mb-4">
              Overview
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-sans">
              <li>
                <button
                  onClick={() => scrollTo('pricing')}
                  className="hover:text-white transition-colors"
                >
                  Ultimate Edition
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('pricing')}
                  className="hover:text-white transition-colors"
                >
                  Pricing & License
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('faq')}
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Products */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-white mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-sans">
              <li>
                <span className="text-white font-medium">RoninTweaks Ultimate</span>
              </li>
              <li>
                <span className="text-neutral-500 hover:text-neutral-400 transition-colors cursor-pointer">
                  RoninTweaks LITE
                </span>
              </li>
              <li>
                <button onClick={onOpenActivate} className="text-[#FF1E27] hover:underline transition-colors">
                  Activate License Key
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-white mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-sans">
              <li>
                <button
                  onClick={() => scrollTo('faq')}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <a
                  href="mailto:support@ronintweaks.com"
                  className="hover:text-white transition-colors"
                >
                  Contact Email
                </a>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Discord VIP Community
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  HWID Reset Portal
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-white mb-4">
              Connect
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Engineered for esports competitors seeking zero-latency performance.
            </p>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-mono-code text-neutral-300">
                DISCORD VIP
              </span>
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-mono-code text-neutral-300">
                TWITTER / X
              </span>
            </div>
          </div>
        </div>

        {/* Bottom divider and Brand */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm bg-[#FF1E27] flex items-center justify-center font-heading font-bold text-white text-xs">
              R
            </div>
            <span className="font-heading font-bold tracking-widest text-sm text-white">
              RONIN<span className="text-[#FF1E27]">TWEAKS</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-neutral-400 font-sans">
            <span className="hover:text-neutral-300 cursor-pointer">Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-300 cursor-pointer">Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span>&copy; 2026 RoninTweaks. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
