import React, { useState } from 'react';
import { X, Download, ShieldCheck, Terminal, FileCheck, Check } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDashboard: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  onOpenDashboard,
}) => {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  if (!isOpen) return null;

  const sha256 = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

  const triggerDownload = (type: 'exe' | 'zip') => {
    setDownloadStarted(true);
    // Create an authentic helper text script to simulate real download
    const filename = type === 'exe' ? 'RoninTweaks_Ultimate_v4.2_Setup.bat' : 'RoninTweaks_Ultimate_v4.2_Portable.txt';
    const content = `@echo off
echo ============================================================
echo           RONINTWEAKS ULTIMATE v4.2 INSTALLER
echo           Ultra-Low Latency & System Optimization Engine
echo ============================================================
echo [OK] Checking Windows 10/11 64-Bit Compatibility...
echo [OK] Verifying Administrative Privileges...
echo [OK] Detected Hardware: High-Performance Gaming Rig
echo [OK] Preparing Safe Windows System Restore Point...
echo [OK] Launching RoninTweaks Real-time Dashboard...
echo ============================================================
pause
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyHash = () => {
    navigator.clipboard?.writeText(sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-[#0c0d12] border border-neutral-800 rounded-xl p-6 sm:p-8 text-left shadow-[0_0_60px_rgba(0,0,0,0.9)] red-glow-card">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded bg-[#FF1E27]/15 border border-[#FF1E27]/40 flex items-center justify-center text-[#FF1E27]">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-black text-xl text-white tracking-wider uppercase">
              DOWNLOAD <span className="text-[#FF1E27]">RONINTWEAKS ULTIMATE</span>
            </h3>
            <p className="text-xs text-neutral-400 font-sans">
              Version 4.2.0 • 64-bit Native Windows Application • Digitally Signed
            </p>
          </div>
        </div>

        {/* Download Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Option 1: Installer */}
          <div className="bg-[#070709] border border-neutral-800 hover:border-[#FF1E27]/50 rounded-xl p-5 flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                  Windows Installer (.exe)
                </span>
                <span className="text-[10px] font-mono-code bg-[#FF1E27]/20 text-[#FF1E27] px-1.5 py-0.5 rounded">
                  RECOMMENDED
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans mb-4">
                Automatic auto-tuner integration, desktop shortcut, and background timer daemon.
              </p>
              <div className="text-[11px] font-mono-code text-neutral-500 mb-4">
                Size: 18.4 MB • Win 10/11 64-bit
              </div>
            </div>
            <button
              onClick={() => triggerDownload('exe')}
              className="w-full py-2.5 px-3 rounded-lg font-heading font-bold text-xs uppercase tracking-wider text-white bg-[#FF1E27] hover:bg-[#E01720] red-glow-btn transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD SETUP.EXE</span>
            </button>
          </div>

          {/* Option 2: Portable Zip */}
          <div className="bg-[#070709] border border-neutral-800 hover:border-neutral-700 rounded-xl p-5 flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                  Portable Package (.zip)
                </span>
                <span className="text-[10px] font-mono-code bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">
                  NO INSTALL
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans mb-4">
                Zero installation required. Extract anywhere or run from a USB drive directly.
              </p>
              <div className="text-[11px] font-mono-code text-neutral-500 mb-4">
                Size: 16.2 MB • Standalone binary
              </div>
            </div>
            <button
              onClick={() => triggerDownload('zip')}
              className="w-full py-2.5 px-3 rounded-lg font-heading font-bold text-xs uppercase tracking-wider text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD PORTABLE (.ZIP)</span>
            </button>
          </div>
        </div>

        {/* SHA-256 Verification */}
        <div className="bg-[#070709] border border-neutral-800/80 rounded-lg p-3.5 mb-6 text-xs font-mono-code">
          <div className="flex items-center justify-between text-neutral-400 mb-1">
            <span className="flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-neutral-400" />
              SHA-256 CHECKSUM HASH
            </span>
            <button
              onClick={copyHash}
              className="text-[#FF1E27] hover:underline flex items-center gap-1"
            >
              {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : null}
              <span>{copiedHash ? 'COPIED' : 'COPY HASH'}</span>
            </button>
          </div>
          <div className="text-neutral-500 truncate text-[11px]">{sha256}</div>
        </div>

        {downloadStarted && (
          <div className="p-3 mb-6 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-300 font-sans">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Download initiated! Run as Administrator to apply tweaks.</span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenDashboard();
              }}
              className="text-xs font-heading font-bold uppercase tracking-wider text-[#FF1E27] hover:underline"
            >
              Open Web Utility &rarr;
            </button>
          </div>
        )}

        {/* Bottom alternative */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-900 text-xs">
          <span className="text-neutral-500">Want to preview the controls first?</span>
          <button
            onClick={() => {
              onClose();
              onOpenDashboard();
            }}
            className="text-white hover:text-[#FF1E27] font-heading font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-[#FF1E27]" />
            <span>Launch Web Dashboard Simulator</span>
          </button>
        </div>
      </div>
    </div>
  );
};
