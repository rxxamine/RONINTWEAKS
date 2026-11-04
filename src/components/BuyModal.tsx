import React, { useState } from 'react';
import {
  X,
  Lock,
  Check,
  ShieldCheck,
  CreditCard,
  Copy,
  Coins,
  ArrowRight,
  Sparkles,
  QrCode
} from 'lucide-react';
import { CRYPTO_PAYMENT_OPTIONS } from '../data/cryptoData';

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchaseSuccess: (licenseKey: string) => void;
}

export const BuyModal: React.FC<BuyModalProps> = ({
  isOpen,
  onClose,
  onPurchaseSuccess,
}) => {
  const [method, setMethod] = useState<'crypto' | 'card'>('crypto');
  const [includeBiosTuner, setIncludeBiosTuner] = useState(false);
  const [email, setEmail] = useState('');

  // Crypto state
  const [selectedCoinId, setSelectedCoinId] = useState('usdt');
  const [selectedNetIdx, setSelectedNetIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  // Card state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');

  // Loading & Result
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchasedKey, setPurchasedKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  if (!isOpen) return null;

  const totalUsd = 25 + (includeBiosTuner ? 15 : 0);

  const selectedCoin =
    CRYPTO_PAYMENT_OPTIONS.find((c) => c.id === selectedCoinId) ||
    CRYPTO_PAYMENT_OPTIONS[0];

  const currentNetwork =
    selectedCoin.networks[selectedNetIdx] || selectedCoin.networks[0];

  const cryptoAmounts: Record<string, string> = {
    usdt: `${totalUsd}.00 USDT`,
    ltc: `${(totalUsd / 88.5).toFixed(3)} LTC`,
    sol: `${(totalUsd / 152.0).toFixed(3)} SOL`,
  };

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(currentNetwork.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
      const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
      const key = `RONIN-ULT-${randomSuffix}-${randomCode}-2026`;
      setIsProcessing(false);
      setPurchasedKey(key);
    }, 1200);
  };

  const handleCopyKey = () => {
    if (purchasedKey) {
      navigator.clipboard?.writeText(purchasedKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const handleActivateAndLaunch = () => {
    if (purchasedKey) {
      onPurchaseSuccess(purchasedKey);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0c0d12] border border-[#FF1E27]/50 rounded-2xl p-5 sm:p-7 text-left shadow-[0_0_60px_rgba(255,30,39,0.25)] animate-modal-in transition-all">
        {/* Corner Accents */}
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

        {!purchasedKey ? (
          <div>
            {/* Header with Title and Price */}
            <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-4">
              <div>
                <h3 className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-wider">
                  RONINTWEAKS <span className="text-[#FF1E27] drop-shadow-[0_0_10px_rgba(255,30,39,0.8)]">ULTIMATE</span>
                </h3>
                <p className="text-xs text-neutral-400 font-sans">
                  Lifetime access • Instant key delivery
                </p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black font-heading text-[#FF1E27] tabular-nums drop-shadow-[0_0_10px_rgba(255,30,39,0.5)]">
                  ${totalUsd}.00
                </div>
                <div className="text-[10px] font-mono-code text-neutral-400">ONE-TIME</div>
              </div>
            </div>

            {/* Quick Add-on Toggle */}
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#070709] border border-neutral-800 hover:border-[#FF1E27]/40 mb-4 cursor-pointer transition-all group">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={includeBiosTuner}
                  onChange={(e) => setIncludeBiosTuner(e.target.checked)}
                  className="accent-[#FF1E27] w-4 h-4 rounded cursor-pointer"
                />
                <span className="text-xs font-heading font-bold text-white uppercase tracking-wide group-hover:text-neutral-100">
                  BIOS Tuner Add-on (+ $15)
                </span>
              </div>
              <span className="text-[11px] font-mono-code text-[#FF1E27] font-bold">
                OPTIONAL
              </span>
            </label>

            {/* Simple Method Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#070709] rounded-xl border border-neutral-800 mb-4">
              <button
                type="button"
                onClick={() => setMethod('crypto')}
                className={`py-2 px-3 rounded-lg text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  method === 'crypto'
                    ? 'bg-[#FF1E27] text-white red-glow-subtle'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Coins className="w-3.5 h-3.5" />
                <span>PAY WITH CRYPTO</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`py-2 px-3 rounded-lg text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  method === 'card'
                    ? 'bg-[#FF1E27] text-white red-glow-subtle'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>CREDIT / DEBIT CARD</span>
              </button>
            </div>

            {/* PAYMENT CONTENT */}
            {method === 'crypto' ? (
              <form onSubmit={handleProcessPayment} className="space-y-3.5">
                {/* 1. Coin Select */}
                <div className="grid grid-cols-3 gap-2">
                  {CRYPTO_PAYMENT_OPTIONS.map((coin) => (
                    <button
                      key={coin.id}
                      type="button"
                      onClick={() => {
                        setSelectedCoinId(coin.id);
                        setSelectedNetIdx(0);
                      }}
                      className={`py-2.5 px-2.5 rounded-xl border text-center transition-all ${
                        selectedCoinId === coin.id
                          ? 'bg-[#12141c] border-[#FF1E27] text-white shadow-[0_0_15px_rgba(255,30,39,0.3)] scale-[1.02]'
                          : 'bg-[#070709] border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                      }`}
                    >
                      <div className="font-heading font-bold text-sm tracking-wide">
                        {coin.symbol}
                      </div>
                      <div className="text-[11px] font-mono-code font-bold text-[#FF1E27] mt-0.5">
                        {cryptoAmounts[coin.id]}
                      </div>
                    </button>
                  ))}
                </div>

                {/* 2. Network Select Chips */}
                <div>
                  <div className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider mb-1.5 flex justify-between">
                    <span>SELECT NETWORK:</span>
                    <span className="text-neutral-200 font-bold">{currentNetwork.networkName} ({currentNetwork.networkStandard})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCoin.networks.map((net, i) => (
                      <button
                        key={net.networkStandard}
                        type="button"
                        onClick={() => setSelectedNetIdx(i)}
                        className={`px-2.5 py-1 rounded-md text-xs font-mono-code transition-all ${
                          selectedNetIdx === i
                            ? 'bg-[#FF1E27] text-white font-bold red-glow-subtle'
                            : 'bg-[#070709] border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                        }`}
                      >
                        {net.networkStandard}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Address & QR Box */}
                <div className="bg-[#070709] border border-neutral-800 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-16 h-16 bg-white p-1 rounded-md shrink-0 flex items-center justify-center shadow-md">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
                        currentNetwork.address
                      )}`}
                      alt="QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-mono-code text-neutral-400 uppercase mb-0.5">
                      DEPOSIT ADDRESS ({currentNetwork.networkStandard})
                    </div>
                    <div className="font-mono-code text-xs text-neutral-200 bg-black/60 p-1.5 rounded-lg border border-neutral-800 truncate select-all">
                      {currentNetwork.address}
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="mt-1.5 px-3 py-1 rounded text-xs font-mono-code bg-[#FF1E27]/20 hover:bg-[#FF1E27]/30 border border-[#FF1E27]/50 text-white flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">COPIED!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#FF1E27]" />
                          <span>COPY ADDRESS</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 4. Email input */}
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email to receive license backup..."
                    className="w-full bg-[#070709] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF1E27] focus:ring-1 focus:ring-[#FF1E27] transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 px-4 rounded-xl font-heading font-bold text-sm tracking-wider uppercase text-white bg-[#FF1E27] hover:bg-[#E01720] red-glow-btn transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>VERIFYING PAYMENT...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>I HAVE SENT {cryptoAmounts[selectedCoin.id]} — GET KEY</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* CARD PAYMENT (STRIPE) */
              <form onSubmit={handleProcessPayment} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-mono-code text-neutral-400 uppercase mb-1">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="gamer@domain.com"
                    className="w-full bg-[#070709] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF1E27] focus:ring-1 focus:ring-[#FF1E27]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-code text-neutral-400 uppercase mb-1">
                    CARD NUMBER
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#070709] border border-neutral-800 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm font-mono-code text-white focus:outline-none focus:border-[#FF1E27] focus:ring-1 focus:ring-[#FF1E27]"
                    />
                    <CreditCard className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-mono-code text-neutral-400 uppercase mb-1">
                      EXPIRES
                    </label>
                    <input
                      type="text"
                      defaultValue="12 / 28"
                      className="w-full bg-[#070709] border border-neutral-800 rounded-xl px-3 py-2 text-xs font-mono-code text-white focus:outline-none focus:border-[#FF1E27]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono-code text-neutral-400 uppercase mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      defaultValue="884"
                      className="w-full bg-[#070709] border border-neutral-800 rounded-xl px-3 py-2 text-xs font-mono-code text-white focus:outline-none focus:border-[#FF1E27]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 px-4 rounded-xl font-heading font-bold text-sm tracking-wider uppercase text-white bg-[#FF1E27] hover:bg-[#E01720] red-glow-btn transition-all active:scale-95 disabled:opacity-50"
                >
                  {isProcessing ? 'AUTHORIZING CARD...' : `PAY $${totalUsd}.00 & GET KEY`}
                </button>
              </form>
            )}

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 pt-3 border-t border-neutral-900 mt-3 font-sans">
              <Lock className="w-3 h-3 text-neutral-500" />
              <span>Encrypted 256-bit instant checkout</span>
            </div>
          </div>
        ) : (
          /* SUCCESS STATE */
          <div className="text-center py-2 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <ShieldCheck className="w-8 h-8 stroke-[2]" />
            </div>

            <div>
              <h3 className="font-heading font-black text-2xl text-white uppercase tracking-wider">
                PAYMENT CONFIRMED!
              </h3>
              <p className="text-xs text-neutral-400 font-sans mt-0.5">
                Your lifetime license key is generated and activated.
              </p>
            </div>

            {/* License Box with Glow */}
            <div className="bg-[#070709] p-3.5 rounded-xl border border-[#FF1E27]/60 text-left red-glow-subtle">
              <div className="text-[10px] font-mono-code text-neutral-400 uppercase mb-1">
                YOUR LIFETIME LICENSE KEY
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono-code font-bold text-sm sm:text-base text-[#FF1E27] tracking-wider select-all truncate">
                  {purchasedKey}
                </span>
                <button
                  type="button"
                  onClick={handleCopyKey}
                  className="px-2.5 py-1 text-xs font-mono-code rounded bg-neutral-900 border border-neutral-700 text-neutral-200 hover:text-white transition-colors flex items-center gap-1 shrink-0"
                >
                  {copiedKey ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleActivateAndLaunch}
                className="w-full py-3 px-4 rounded-xl font-heading font-bold text-sm tracking-wider uppercase text-white bg-[#FF1E27] hover:bg-[#E01720] red-glow-btn transition-all active:scale-95"
              >
                OPEN DASHBOARD & UNLOCK NOW
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-1.5 text-xs font-heading uppercase text-neutral-400 hover:text-white transition-colors"
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
