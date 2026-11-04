import React, { useState } from 'react';
import { X, Key, ShieldCheck, Cpu, AlertCircle, Copy, Check, LogOut } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { redeemKeyInFirebase, loginWithGoogle, logoutUser } from '../lib/firebase';

interface ActivateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivateSuccess: (key: string) => void;
  isActivated: boolean;
  activatedKey: string;
  currentUser: FirebaseUser | null;
  onGoogleLogin: () => void;
}

export const ActivateModal: React.FC<ActivateModalProps> = ({
  isOpen,
  onClose,
  onActivateSuccess,
  isActivated,
  activatedKey,
  currentUser,
  onGoogleLogin,
}) => {
  const [inputKey, setInputKey] = useState(activatedKey || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copiedHwid, setCopiedHwid] = useState(false);

  const hwid = 'HWID-7F89-A2D4-B901-2026';

  if (!isOpen) return null;

  const handleActivateWithGoogle = async () => {
    setError(null);
    setSuccessMsg(null);
    const cleaned = inputKey.trim().toUpperCase();

    if (!cleaned) {
      setError('Please paste the license key sent to you.');
      return;
    }

    setLoading(true);
    try {
      let activeUser = currentUser;

      // If user is not signed in yet, seamlessly sign them in with Google first
      if (!activeUser) {
        activeUser = await loginWithGoogle();
      }

      if (!activeUser) {
        setLoading(false);
        setError('Google sign-in was cancelled or failed.');
        return;
      }

      // Redeem key in Firebase Firestore
      const res = await redeemKeyInFirebase(cleaned, hwid, activeUser);
      setLoading(false);

      if (res.success) {
        setSuccessMsg(res.message);
        onActivateSuccess(cleaned);
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || 'Error communicating with Google Firebase.');
    }
  };

  const fillSampleKey = () => {
    setInputKey('RONIN-ULT-8842-PRO-2026');
    setError(null);
  };

  const copyHwid = () => {
    navigator.clipboard?.writeText(hwid);
    setCopiedHwid(true);
    setTimeout(() => setCopiedHwid(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0c0d12] border border-[#FF1E27]/50 rounded-2xl p-6 sm:p-8 text-left shadow-[0_0_60px_rgba(255,30,39,0.25)] animate-modal-in transition-all">
        {/* Tactical Corner Accents */}
        <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2 border-[#FF1E27]" />
        <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t-2 border-r-2 border-[#FF1E27]" />
        <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b-2 border-l-2 border-[#FF1E27]" />
        <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2 border-[#FF1E27]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#FF1E27]/15 border border-[#FF1E27]/40 flex items-center justify-center text-[#FF1E27] shadow-[0_0_12px_rgba(255,30,39,0.3)]">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-black text-xl text-white tracking-wider uppercase">
              ACTIVATE <span className="text-[#FF1E27] drop-shadow-[0_0_10px_rgba(255,30,39,0.8)]">LICENSE KEY</span>
            </h3>
            <p className="text-xs text-neutral-400 font-sans">
              Google Account Authentication & Hardware Key Activation
            </p>
          </div>
        </div>

        {/* Google Authentication Box */}
        {currentUser ? (
          <div className="mb-4 bg-[#070709] border border-neutral-800 p-3.5 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'User'}
                  className="w-9 h-9 rounded-full border border-neutral-700 object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-neutral-800 text-xs font-bold text-white flex items-center justify-center border border-neutral-700">
                  {(currentUser.email?.[0] || 'U').toUpperCase()}
                </div>
              )}
              <div className="text-xs">
                <div className="text-white font-medium flex items-center gap-1.5">
                  <span>{currentUser.displayName || 'Google User'}</span>
                  <span className="text-[10px] font-mono-code bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 px-1.5 py-0.2 rounded">
                    AUTHENTICATED
                  </span>
                </div>
                <div className="text-neutral-400 font-mono-code text-[11px] mt-0.5">
                  {currentUser.email}
                </div>
              </div>
            </div>

            <button
              onClick={() => logoutUser()}
              title="Switch Google Account"
              className="text-neutral-500 hover:text-neutral-300 text-xs font-sans transition-colors"
            >
              Switch
            </button>
          </div>
        ) : (
          <div className="mb-4 bg-[#070709] border border-neutral-800/90 p-3.5 rounded-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white p-1.5 flex items-center justify-center shrink-0 shadow-sm">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
              <div className="text-xs">
                <div className="text-white font-medium">Google Account Link</div>
                <div className="text-neutral-400 text-[11px]">
                  Keys are bound to your verified Google identity
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onGoogleLogin}
              className="py-1.5 px-3 rounded-lg text-xs font-heading font-bold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors shrink-0 shadow-sm"
            >
              Sign In
            </button>
          </div>
        )}

        {/* HWID Display */}
        <div className="mb-4 bg-[#070709] p-3 rounded-xl border border-neutral-800/80 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono-code text-neutral-400 uppercase tracking-wider flex items-center gap-1">
              <Cpu className="w-3 h-3 text-neutral-400" />
              <span>DETECTED MACHINE HWID</span>
            </div>
            <div className="font-mono-code font-bold text-xs text-neutral-200 mt-0.5">
              {hwid}
            </div>
          </div>
          <button
            onClick={copyHwid}
            className="px-2.5 py-1 text-xs font-mono-code rounded bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white transition-colors flex items-center gap-1 active:scale-95"
          >
            {copiedHwid ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedHwid ? 'COPIED' : 'COPY'}</span>
          </button>
        </div>

        {/* Active Status Banner */}
        {isActivated ? (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-start gap-3 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-heading font-bold text-sm text-emerald-300 uppercase tracking-wider">
                ULTIMATE LICENSE ACTIVE & LINKED
              </div>
              <p className="text-xs text-emerald-400/80 font-sans mt-0.5">
                Bound to Google user {currentUser?.email || 'account'} and machine HWID.
              </p>
              <div className="text-xs font-mono-code text-neutral-400 mt-1">
                Key: {activatedKey || inputKey}
              </div>
            </div>
          </div>
        ) : null}

        {/* License Input */}
        <div className="mb-5">
          <label className="block text-xs font-mono-code text-neutral-300 uppercase tracking-wider mb-1.5">
            PASTE SENT LICENSE KEY
          </label>
          <input
            type="text"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="e.g. RONIN-ULT-XXXX-XXXX"
            className="w-full bg-[#070709] border border-neutral-800 rounded-xl px-4 py-2.5 text-sm font-mono-code text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF1E27] focus:ring-1 focus:ring-[#FF1E27] tracking-wider uppercase transition-all"
          />

          {error && (
            <div className="flex items-center gap-1.5 text-xs text-[#FF1E27] mt-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2">
              <Check className="w-3.5 h-3.5 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="flex items-center justify-between mt-2">
            <button
              onClick={fillSampleKey}
              className="text-xs text-neutral-400 hover:text-[#FF1E27] transition-colors underline underline-offset-2"
            >
              Paste sample key (Test)
            </button>
            <span className="text-[11px] text-neutral-500 font-mono-code">
              Provided by administrator
            </span>
          </div>
        </div>

        {/* Combined Google Sign In & Activate Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleActivateWithGoogle}
            disabled={loading}
            className="flex-1 py-3 px-4 rounded-xl font-heading font-bold text-sm tracking-wider uppercase text-white bg-[#FF1E27] hover:bg-[#E01720] red-glow-btn transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>AUTHENTICATING & ACTIVATING...</span>
            ) : currentUser ? (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>{isActivated ? 'RE-VERIFY KEY' : 'ACTIVATE FOR ' + (currentUser.displayName?.split(' ')[0] || 'ACCOUNT')}</span>
              </>
            ) : (
              <>
                <div className="w-4 h-4 rounded-full bg-white p-0.5 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>
                <span>SIGN IN WITH GOOGLE & ACTIVATE</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="py-3 px-4 rounded-xl font-heading font-semibold text-sm tracking-wider uppercase text-neutral-400 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
