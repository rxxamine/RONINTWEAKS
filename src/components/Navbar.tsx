import React from 'react';
import { ShieldCheck, Key, LogOut, KeyRound } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface NavbarProps {
  onOpenActivate: () => void;
  onOpenBuy: () => void;
  onOpenAdminKeys?: () => void;
  isActivated: boolean;
  currentUser: FirebaseUser | null;
  onGoogleLogin: () => void;
  onGoogleLogout: () => void;
  isAdmin: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenActivate,
  onOpenBuy,
  onOpenAdminKeys,
  isActivated,
  currentUser,
  onGoogleLogin,
  onGoogleLogout,
  isAdmin,
}) => {
  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070709]/90 backdrop-blur-md border-b border-neutral-900/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-left group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#FF1E27] to-[#B91C1C] flex items-center justify-center shadow-[0_0_15px_rgba(255,30,39,0.5)]">
            <span className="font-heading font-black text-white text-lg tracking-wider">R</span>
          </div>
          <div className="flex items-baseline tracking-widest uppercase font-heading font-bold text-xl select-none">
            <span className="text-white group-hover:text-neutral-200 transition-colors">RONIN</span>
            <span className="text-[#FF1E27] drop-shadow-[0_0_8px_rgba(255,30,39,0.8)]">TWEAKS</span>
          </div>
        </button>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-heading text-sm font-semibold tracking-wider uppercase text-neutral-300">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="transition-colors hover:text-white text-white"
          >
            HOME
          </button>

          <button
            onClick={scrollToPricing}
            className="transition-colors hover:text-white text-neutral-400"
          >
            ULTIMATE
          </button>

          <button
            onClick={scrollToPricing}
            className="transition-colors hover:text-white text-neutral-400"
          >
            PRICING
          </button>
        </nav>

        {/* Action Zone: Google User Profile & ACTIVATE Button */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Admin Keys Management Button (visible to admin) */}
          {isAdmin && onOpenAdminKeys && (
            <button
              onClick={onOpenAdminKeys}
              className="px-3 py-1.5 rounded bg-neutral-900 border border-[#FF1E27]/40 text-[#FF1E27] text-xs font-mono-code hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ISSUE KEYS</span>
            </button>
          )}

          {/* User Profile if signed in */}
          {currentUser ? (
            <div className="flex items-center gap-2 bg-[#0c0d12] border border-neutral-800 rounded-lg p-1 pr-2.5">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'User'}
                  className="w-7 h-7 rounded-full object-cover border border-neutral-700"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-white">
                  {(currentUser.email?.[0] || 'U').toUpperCase()}
                </div>
              )}
              <div className="hidden sm:block text-left text-[11px] leading-tight">
                <div className="text-white font-medium truncate max-w-[120px]">
                  {currentUser.displayName || currentUser.email?.split('@')[0]}
                </div>
                <div className="text-neutral-500 text-[10px] truncate max-w-[120px]">
                  {currentUser.email}
                </div>
              </div>
              <button
                onClick={onGoogleLogout}
                title="Sign out of Firebase"
                className="text-neutral-400 hover:text-white p-1 ml-1 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : null}

          {/* Unified ACTIVATE Button */}
          <button
            onClick={onOpenActivate}
            className="px-5 py-2 rounded text-sm font-heading font-bold uppercase tracking-wider text-white bg-[#FF1E27] hover:bg-[#E01720] red-glow-btn transition-all duration-200 active:scale-95 flex items-center gap-2"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{isActivated ? 'ACTIVATED' : 'ACTIVATE'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
