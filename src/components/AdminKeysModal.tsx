import React, { useState } from 'react';
import { X, KeyRound, Copy, Check, Send } from 'lucide-react';
import { createKeyForCustomer } from '../lib/firebase';

interface AdminKeysModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminKeysModal: React.FC<AdminKeysModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerateAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newKey = `RONIN-ULT-${randomSuffix}-${randomCode}-2026`;
    setGeneratedKey(newKey);
    setSaving(true);
    setStatusMessage(null);

    try {
      await createKeyForCustomer(newKey, recipientEmail || 'Customer');
      setSaving(false);
      setStatusMessage('Key saved to Firebase! You can now send this key to your customer.');
    } catch (err: any) {
      setSaving(false);
      setStatusMessage('Key generated locally. You can copy and send it to your customer.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-black text-xl text-white tracking-wider uppercase">
              ADMIN <span className="text-[#FF1E27] drop-shadow-[0_0_10px_rgba(255,30,39,0.8)]">KEY ISSUER</span>
            </h3>
            <p className="text-xs text-neutral-400 font-sans">
              Generate authorized license keys in Firebase to send to buyers
            </p>
          </div>
        </div>

        <form onSubmit={handleGenerateAndSave} className="space-y-4">
          <div>
            <label className="block text-xs font-mono-code text-neutral-300 uppercase tracking-wider mb-1.5">
              CUSTOMER EMAIL (OPTIONAL)
            </label>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="buyer@gmail.com"
              className="w-full bg-[#070709] border border-neutral-800 rounded-xl px-4 py-2.5 text-sm font-sans text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF1E27] focus:ring-1 focus:ring-[#FF1E27] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 px-4 rounded-xl font-heading font-bold text-sm tracking-wider uppercase text-white bg-[#FF1E27] hover:bg-[#E01720] red-glow-btn transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{saving ? 'STORING IN FIREBASE...' : 'GENERATE & REGISTER KEY IN FIREBASE'}</span>
          </button>
        </form>

        {generatedKey && (
          <div className="mt-5 p-4 rounded-xl bg-[#070709] border border-[#FF1E27]/50 space-y-3 red-glow-subtle">
            <div className="text-[11px] font-mono-code text-neutral-400 uppercase">
              GENERATED KEY TO SEND TO CUSTOMER:
            </div>
            <div className="flex items-center justify-between gap-2 bg-black/60 p-2.5 rounded-lg border border-neutral-800">
              <span className="font-mono-code font-bold text-base text-[#FF1E27] tracking-wider select-all">
                {generatedKey}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1 rounded text-xs font-mono-code bg-neutral-900 border border-neutral-700 text-neutral-200 hover:text-white transition-colors flex items-center gap-1 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
            {statusMessage && (
              <p className="text-xs text-emerald-400 font-sans">{statusMessage}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
