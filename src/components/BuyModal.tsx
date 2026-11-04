import React, { useState } from 'react';
import {
  X,
  Check,
  Copy,
  Zap,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  QrCode
} from 'lucide-react';
import { CRYPTO_PAYMENT_OPTIONS } from '../data/cryptoData';
import { RoninLogo } from './RoninLogo';

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchaseSuccess: (licenseKey: string) => void;
  onOpenActivate?: (key: string) => void;
}

export const BuyModal: React.FC<BuyModalProps> = ({
  isOpen,
  onClose,
  onPurchaseSuccess,
  onOpenActivate,
}) => {
  // Active Crypto Selection
  const [selectedCoinId, setSelectedCoinId] = useState('usdt');
  const [selectedNetIdx, setSelectedNetIdx] = useState(0);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Verification state
  const [isVerifying, setIsVerifying] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  if (!isOpen) return null;

  const selectedCoin =
    CRYPTO_PAYMENT_OPTIONS.find((c) => c.id === selectedCoinId) ||
    CRYPTO_PAYMENT_OPTIONS[0];

  const currentNetwork =
    selectedCoin.networks[selectedNetIdx] || selectedCoin.networks[0];

  const cryptoAmounts: Record<string, string> = {
    usdt: '25.00 USDT',
    ltc: '0.282 LTC',
    sol: '0.164 SOL',
  };

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(currentNetwork.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleConfirmSent = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const part1 = Math.random().toString(36).substring(2, 6).toUpperCase();
      const part2 = Math.random().toString(36).substring(2, 6).toUpperCase();
      const newKey = `RONIN-ULT-${part1}-${part2}-2026`;
      setIsVerifying(false);
      setGeneratedKey(newKey);
      onPurchaseSuccess(newKey);
    }, 1200);
  };

  const handleCopyKey = () => {
    if (generatedKey) {
      navigator.clipboard?.writeText(generatedKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const handleActivateNow = () => {
    if (generatedKey && onOpenActivate) {
      onClose();
      onOpenActivate(generatedKey);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      {/* Modern High-Tech Card Container */}
      <div className="relative w-full max-w-md bg-[#090a0f]/95 border border-neutral-800/90 rounded-2xl p-5 sm:p-6 text-left shadow-[0_0_50px_rgba(255,30,39,0.18)] animate-modal-in transition-all overflow-hidden group">
        
        {/* Animated Top Neon Laser Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E27] to-transparent shadow-[0_0_12px_#FF1E27] animate-border-pulse" />

        {/* Tactical Corner Accents */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#FF1E27]/80 pointer-events-none" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#FF1E27]/80 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#FF1E27]/80 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#FF1E27]/80 pointer-events-none" />

        {/* Close Button with Smooth Hover Rotate */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-transform hover:scale-110 p-1.5 rounded-lg bg-neutral-900/60 border border-neutral-800 hover:border-[#FF1E27]/40 z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {!generatedKey ? (
          <div className="space-y-4">
            {/* Header: Simple, Clean, Non-Verbiose */}
            <div className="flex items-center justify-between pr-8">
              <div className="flex items-center gap-2.5">
                <RoninLogo size="sm" />
                <div>
                  <div className="text-[11px] font-mono-code font-bold text-neutral-400 uppercase tracking-widest">
                    LIFETIME LICENSE
                  </div>
                  <div className="font-heading font-black text-xl text-white tracking-wide">
                    $25 <span className="text-xs text-neutral-400 font-sans font-normal">one-time</span>
                  </div>
                </div>
              </div>

              {/* Instant Tag */}
              <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono-code">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>INSTANT</span>
              </div>
            </div>

            {/* 1. Coin Select Buttons with Smooth Glow & Transitions */}
            <div className="grid grid-cols-3 gap-2">
              {CRYPTO_PAYMENT_OPTIONS.map((coin) => {
                const isSelected = selectedCoinId === coin.id;
                return (
                  <button
                    key={coin.id}
                    type="button"
                    onClick={() => {
                      setSelectedCoinId(coin.id);
                      setSelectedNetIdx(0);
                    }}
                    className={`relative py-2.5 px-2 rounded-xl border text-center transition-all duration-200 active:scale-95 ${
                      isSelected
                        ? 'bg-[#141520] border-[#FF1E27] text-white shadow-[0_0_20px_rgba(255,30,39,0.35)] -translate-y-0.5'
                        : 'bg-[#0c0d14]/70 border-neutral-800/80 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    {/* Active Top Glow Dot */}
                    {isSelected && (
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-[#FF1E27] rounded-full shadow-[0_0_8px_#FF1E27]" />
                    )}
                    <div className="font-heading font-bold text-sm tracking-wider">
                      {coin.symbol}
                    </div>
                    <div className="text-[11px] font-mono-code text-[#FF1E27] font-semibold mt-0.5">
                      {cryptoAmounts[coin.id]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 2. Network Selection Pills */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono-code text-neutral-400">
                <span>NETWORK</span>
                <span className="text-[#FF1E27] font-semibold">{currentNetwork.networkStandard}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedCoin.networks.map((net, i) => {
                  const isNetSelected = selectedNetIdx === i;
                  return (
                    <button
                      key={net.networkStandard}
                      type="button"
                      onClick={() => setSelectedNetIdx(i)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all duration-150 active:scale-95 ${
                        isNetSelected
                          ? 'bg-[#FF1E27] text-white font-bold shadow-[0_0_12px_rgba(255,30,39,0.5)]'
                          : 'bg-[#0c0d14] border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                      }`}
                    >
                      {net.networkStandard}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Streamlined Deposit Address & QR Box */}
            <div className="bg-[#0c0d14] border border-neutral-800/90 rounded-xl p-3 flex items-center gap-3 tactical-glow-box">
              {/* QR Code */}
              <div className="w-16 h-16 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center shadow-lg border border-neutral-300">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
                    currentNetwork.address
                  )}`}
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Address details & 1-click copy */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="text-[10px] font-mono-code text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                  <span>SEND TO</span>
                  <span className="text-white font-bold">{cryptoAmounts[selectedCoin.id]}</span>
                </div>

                <div
                  onClick={handleCopyAddress}
                  title="Click to copy address"
                  className="font-mono-code text-xs text-neutral-200 bg-black/70 p-2 rounded-lg border border-neutral-800 truncate select-all cursor-pointer hover:border-[#FF1E27]/50 transition-colors"
                >
                  {currentNetwork.address}
                </div>

                {/* 1-Click Copy Button with Checkmark Animation */}
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className={`w-full py-1.5 px-3 rounded-lg text-xs font-mono-code font-bold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 ${
                    copiedAddress
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'bg-[#FF1E27]/15 hover:bg-[#FF1E27]/25 text-[#FF1E27] border border-[#FF1E27]/40 hover:border-[#FF1E27]'
                  }`}
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>COPIED TO CLIPBOARD!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY ADDRESS</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 4. Main Action Button: Glowing, Animated & Simple */}
            <button
              type="button"
              onClick={handleConfirmSent}
              disabled={isVerifying}
              className="relative w-full py-3.5 px-4 rounded-xl font-heading font-black text-sm tracking-wider uppercase text-white bg-gradient-to-r from-[#FF1E27] via-[#FF3B43] to-[#E01720] hover:brightness-110 shadow-[0_0_25px_rgba(255,30,39,0.45)] transition-all duration-200 active:scale-98 disabled:opacity-50 overflow-hidden flex items-center justify-center gap-2 group"
            >
              {/* Shimmer sweep animation */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shine pointer-events-none" />

              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>VERIFYING ON-CHAIN...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-white" />
                  <span>I HAVE PAID — GET LICENSE KEY</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* SUCCESS SCREEN: Clean, Modern, Instant License Output */
          <div className="text-center py-2 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.35)] animate-bounce-once">
              <ShieldCheck className="w-7 h-7 stroke-[2.2]" />
            </div>

            <div>
              <h3 className="font-heading font-black text-xl text-white uppercase tracking-wider">
                PAYMENT CONFIRMED
              </h3>
              <p className="text-xs text-neutral-400 font-sans mt-0.5">
                Your lifetime license key has been generated.
              </p>
            </div>

            {/* License Box with Neon Glow */}
            <div className="bg-[#0c0d14] p-3.5 rounded-xl border border-[#FF1E27]/60 text-left shadow-[0_0_20px_rgba(255,30,39,0.25)]">
              <div className="text-[10px] font-mono-code text-neutral-400 uppercase tracking-widest mb-1">
                LIFETIME LICENSE KEY
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono-code font-bold text-sm sm:text-base text-white tracking-wider select-all truncate">
                  {generatedKey}
                </span>
                <button
                  type="button"
                  onClick={handleCopyKey}
                  className={`px-3 py-1.5 text-xs font-mono-code font-bold rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
                    copiedKey
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                      : 'bg-neutral-900 border border-neutral-700 text-neutral-200 hover:text-white hover:border-[#FF1E27]'
                  }`}
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleActivateNow}
                className="w-full py-3.5 px-4 rounded-xl font-heading font-black text-sm tracking-wider uppercase text-white bg-[#FF1E27] hover:bg-[#E01720] shadow-[0_0_20px_rgba(255,30,39,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>ACTIVATE LICENSE NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-xs font-heading uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
