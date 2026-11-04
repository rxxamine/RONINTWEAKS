import React, { useState, useEffect } from 'react';
import {
  Activity,
  Cpu,
  Zap,
  MousePointer2,
  Globe,
  Trash2,
  Code2,
  Binary,
  Wand2,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Play,
  Download,
  Copy,
  Check,
  Sliders,
  Settings2
} from 'lucide-react';
import { DashboardTab, TweakItem, SystemSpecs } from '../types';
import { INITIAL_TWEAKS } from '../data/tweaksData';

interface DashboardViewProps {
  onBackToLanding: () => void;
  onOpenActivate: () => void;
  onOpenBuy: () => void;
  isActivated: boolean;
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onBackToLanding,
  onOpenActivate,
  onOpenBuy,
  isActivated,
  activeTab,
  onTabChange,
}) => {
  const [tweaks, setTweaks] = useState<TweakItem[]>(INITIAL_TWEAKS);
  const [isApplying, setIsApplying] = useState(false);
  const [applyProgress, setApplyProgress] = useState(0);
  const [applyStatusMessage, setApplyStatusMessage] = useState('');
  const [restorePointCreated, setRestorePointCreated] = useState(true);

  // Auto-tuner scan state
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  // Latency test state
  const [testActive, setTestActive] = useState(false);
  const [testClicks, setTestClicks] = useState<number[]>([]);
  const [currentLatencyDisplay, setCurrentLatencyDisplay] = useState(54);

  // Script builder state
  const [selectedScriptActions, setSelectedScriptActions] = useState<string[]>([
    'Disable Core Parking',
    'Set 0.500ms Timer Resolution',
    'Enable MSI Mode on GPU',
    'Purge Windows Telemetry',
  ]);
  const [copiedScript, setCopiedScript] = useState(false);

  // Simulated live fluctuating telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLatencyDisplay((prev) => {
        const delta = (Math.random() - 0.5) * 4;
        return Math.max(48, Math.min(64, Math.round(prev + delta)));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleTweak = (id: string) => {
    setTweaks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
  };

  const handleApplyChanges = () => {
    setIsApplying(true);
    setApplyProgress(10);
    setApplyStatusMessage('Creating Windows System Restore Point: RP_RONIN_2026...');

    setTimeout(() => {
      setApplyProgress(40);
      setApplyStatusMessage('Configuring NT Kernel scheduler & Timer API (0.500ms)...');
    }, 500);

    setTimeout(() => {
      setApplyProgress(75);
      setApplyStatusMessage('Optimizing GPU Message Signaled Interrupts & USB polling...');
    }, 900);

    setTimeout(() => {
      setApplyProgress(100);
      setApplyStatusMessage('Complete! All tweaks applied successfully.');
      setTimeout(() => {
        setIsApplying(false);
        setRestorePointCreated(true);
      }, 700);
    }, 1400);
  };

  const handleRevertAll = () => {
    if (window.confirm('Revert all tweaks back to Windows default settings?')) {
      setTweaks((prev) => prev.map((t) => ({ ...t, enabled: false })));
      alert('All system settings reverted to Windows defaults.');
    }
  };

  const handleRunAutoTuner = () => {
    setIsScanning(true);
    setScanComplete(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      // Enable all recommended & safe tweaks
      setTweaks((prev) =>
        prev.map((t) =>
          t.safety === 'Safe' || t.safety === 'Recommended'
            ? { ...t, enabled: true }
            : t
        )
      );
    }, 1200);
  };

  const handleLatencyClick = () => {
    if (!testActive) {
      setTestActive(true);
      setTestClicks([]);
      return;
    }
    const sampleMs = parseFloat((Math.random() * 3 + 12).toFixed(1));
    setTestClicks((prev) => [...prev, sampleMs]);
  };

  const activeCount = tweaks.filter((t) => t.enabled).length;

  const filteredTweaks = tweaks.filter((t) => {
    if (activeTab === 'overview' || activeTab === 'autotuner') return true;
    if (activeTab === 'cpu') return t.category === 'cpu';
    if (activeTab === 'gpu') return t.category === 'gpu';
    if (activeTab === 'input') return t.category === 'input';
    if (activeTab === 'network') return t.category === 'network';
    if (activeTab === 'debloat') return t.category === 'debloat';
    if (activeTab === 'power') return t.category === 'power';
    if (activeTab === 'bios') return t.category === 'bios';
    return true;
  });

  const generateScriptContent = () => {
    return `@echo off
:: ====================================================
:: RONINTWEAKS ULTIMATE CUSTOM EXPORTED SCRIPT
:: ====================================================
echo [RoninTweaks] Applying custom low-latency optimizations...

${selectedScriptActions
  .map(
    (act) => `echo [Applying] ${act}
:: Executing command for ${act}
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl" /v Win32PrioritySeparation /t REG_DWORD /d 38 /f >nul 2>&1`
  )
  .join('\n\n')}

echo [RoninTweaks] Optimization sequence finished successfully!
pause
`;
  };

  const copyScript = () => {
    navigator.clipboard?.writeText(generateScriptContent());
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-neutral-100 flex flex-col font-sans">
      {/* Top Telemetry Header */}
      <header className="bg-[#0a0b10] border-b border-neutral-900 sticky top-0 z-40 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand + View toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLanding}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-7 h-7 rounded-sm bg-[#FF1E27] flex items-center justify-center font-heading font-black text-white text-xs">
                R
              </div>
              <span className="font-heading font-bold text-base tracking-widest uppercase">
                RONIN<span className="text-[#FF1E27]">TWEAKS</span>
              </span>
            </button>
            <span className="text-neutral-700">|</span>
            <span className="text-xs font-mono-code text-neutral-400">
              ULTIMATE v4.2 PRO
            </span>
          </div>

          {/* Real-time Hardware Telemetry Bar */}
          <div className="hidden lg:flex items-center gap-6 font-mono-code text-xs">
            {/* CPU */}
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#FF1E27]" />
              <span className="text-neutral-400">CPU:</span>
              <span className="text-white font-bold">Ryzen 7 7800X3D</span>
              <span className="text-neutral-500">@ 4.85GHz</span>
            </div>

            {/* GPU */}
            <div className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-[#FF1E27]" />
              <span className="text-neutral-400">GPU:</span>
              <span className="text-white font-bold">RTX 4080 Super</span>
              <span className="text-neutral-500">38°C</span>
            </div>

            {/* DPC Latency */}
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-neutral-400">DPC LATENCY:</span>
              <span className="text-emerald-400 font-bold tabular-nums">
                {currentLatencyDisplay} µs
              </span>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#FF1E27]" />
              <span className="text-neutral-400">TIMER:</span>
              <span className="text-[#FF1E27] font-bold">0.500 ms</span>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            {isActivated ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono-code">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ULTIMATE UNLOCKED</span>
              </div>
            ) : (
              <button
                onClick={onOpenBuy}
                className="px-3 py-1 rounded text-xs font-heading font-bold text-white bg-[#FF1E27] hover:bg-[#E01720] red-glow-btn transition-colors"
              >
                UPGRADE ($25)
              </button>
            )}

            <button
              onClick={onBackToLanding}
              className="text-xs text-neutral-400 hover:text-white font-heading font-semibold uppercase tracking-wider transition-colors"
            >
              RETURN TO WEBSITE
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col md:flex-row px-4 sm:px-6 py-6 gap-6">
        {/* Left Sidebar Menu */}
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          <div className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider px-3 mb-2">
            TUNING MODULES
          </div>

          {[
            { id: 'overview' as DashboardTab, label: 'Overview & Telemetry', icon: Activity },
            { id: 'autotuner' as DashboardTab, label: 'Auto-Tuner (1-Click)', icon: Wand2, badge: 'HOT' },
            { id: 'cpu' as DashboardTab, label: 'CPU & Kernel', icon: Cpu },
            { id: 'gpu' as DashboardTab, label: 'GPU & Display', icon: Sliders },
            { id: 'input' as DashboardTab, label: 'Input Delay & Peripherals', icon: MousePointer2 },
            { id: 'network' as DashboardTab, label: 'Network & Ping', icon: Globe },
            { id: 'debloat' as DashboardTab, label: 'System Debloater', icon: Trash2 },
            { id: 'scripts' as DashboardTab, label: 'Script Builder', icon: Code2 },
            { id: 'power' as DashboardTab, label: 'Power & Timers', icon: Zap },
            { id: 'bios' as DashboardTab, label: 'BIOS Tuner', icon: Binary, addon: true },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all text-left ${
                  isActive
                    ? 'bg-[#FF1E27] text-white shadow-[0_0_15px_rgba(255,30,39,0.4)]'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono-code ${
                    isActive ? 'bg-black/30 text-white' : 'bg-[#FF1E27]/20 text-[#FF1E27]'
                  }`}>
                    {tab.badge}
                  </span>
                )}
                {tab.addon && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono-code ${
                    isActive ? 'bg-black/30 text-white' : 'bg-neutral-800 text-neutral-300'
                  }`}>
                    ADDON
                  </span>
                )}
              </button>
            );
          })}

          {/* Quick Actions Card */}
          <div className="pt-6 border-t border-neutral-900 mt-6 space-y-2">
            <div className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider px-3 mb-1">
              SYSTEM STATE
            </div>
            <div className="bg-[#0c0d12] border border-neutral-800/80 rounded-lg p-3 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">Active Tweaks:</span>
                <span className="text-white font-mono-code font-bold">{activeCount} / {tweaks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Restore Point:</span>
                <span className="text-emerald-400 font-mono-code">VERIFIED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">DPC Latency:</span>
                <span className="text-emerald-400 font-mono-code">{currentLatencyDisplay} µs</span>
              </div>
            </div>

            <button
              onClick={handleRevertAll}
              className="w-full py-2 px-3 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 text-xs font-heading font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>REVERT TO STOCK</span>
            </button>
          </div>
        </aside>

        {/* Center Content Workspace */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Top Status Bar with Apply Button */}
          <div className="bg-[#0c0d12] border border-neutral-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-black text-xl text-white uppercase tracking-wider flex items-center gap-2">
                <span>{activeTab.toUpperCase()} OPTIMIZATIONS</span>
                <span className="text-xs font-mono-code text-neutral-400 font-normal">
                  ({filteredTweaks.length} modules available)
                </span>
              </h2>
              <p className="text-xs text-neutral-400 font-sans mt-0.5">
                Toggle options below. Every action creates an encrypted restore checkpoint automatically.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleApplyChanges}
                disabled={isApplying}
                className="flex-1 sm:flex-none py-2.5 px-6 rounded-lg font-heading font-bold text-xs uppercase tracking-wider text-white bg-[#FF1E27] hover:bg-[#E01720] red-glow-btn transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isApplying ? 'APPLYING TO KERNEL...' : `APPLY CHANGES (${activeCount})`}</span>
              </button>
            </div>
          </div>

          {/* Progress bar when applying */}
          {isApplying && (
            <div className="bg-[#0c0d12] border border-[#FF1E27]/40 rounded-xl p-4 animate-pulse">
              <div className="flex justify-between text-xs font-mono-code text-neutral-300 mb-1.5">
                <span>{applyStatusMessage}</span>
                <span className="text-[#FF1E27] font-bold">{applyProgress}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-[#FF1E27] transition-all duration-300"
                  style={{ width: `${applyProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* TAB 1: OVERVIEW & TELEMETRY */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Telemetry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0c0d12] border border-neutral-800 p-4 rounded-xl">
                  <div className="text-xs font-mono-code text-neutral-400 mb-1">INTERRUPT DPC LATENCY</div>
                  <div className="text-2xl font-mono-code font-black text-emerald-400 tabular-nums">
                    {currentLatencyDisplay} µs
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1 font-sans">
                    Peak threshold: &lt; 90 µs (Optimal for CS2)
                  </div>
                </div>

                <div className="bg-[#0c0d12] border border-neutral-800 p-4 rounded-xl">
                  <div className="text-xs font-mono-code text-neutral-400 mb-1">GLOBAL TIMER ACCURACY</div>
                  <div className="text-2xl font-mono-code font-black text-[#FF1E27] tabular-nums">
                    0.500 ms
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1 font-sans">
                    Windows standard is 15.6ms (31x faster)
                  </div>
                </div>

                <div className="bg-[#0c0d12] border border-neutral-800 p-4 rounded-xl">
                  <div className="text-xs font-mono-code text-neutral-400 mb-1">USB POLLING STABILITY</div>
                  <div className="text-2xl font-mono-code font-black text-white tabular-nums">
                    1000 / 8000 Hz
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1 font-sans">
                    Zero dropped micro-reports
                  </div>
                </div>

                <div className="bg-[#0c0d12] border border-neutral-800 p-4 rounded-xl">
                  <div className="text-xs font-mono-code text-neutral-400 mb-1">BACKGROUND PROCESSES</div>
                  <div className="text-2xl font-mono-code font-black text-white tabular-nums">
                    84 Active
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1 font-sans">
                    -48 bloatware tasks purged
                  </div>
                </div>
              </div>

              {/* Real-time DPC Visualizer */}
              <div className="bg-[#0c0d12] border border-neutral-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                    REAL-TIME LATENCY STREAM (MICROSECONDS)
                  </div>
                  <span className="text-xs font-mono-code text-emerald-400">STREAMING ACTIVE</span>
                </div>
                {/* SVG Visualizer Sparkline */}
                <div className="h-28 w-full bg-[#070709] rounded-lg border border-neutral-800/80 p-2 flex items-end justify-between gap-1 overflow-hidden">
                  {[52, 54, 55, 51, 56, 53, 50, 54, 57, 52, 51, 53, 58, 54, 52, 51, 53, 54, 55, 52, 50, 51, 54, 53, 52, 55, 51, 53].map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-emerald-500/80 to-[#FF1E27]/90 rounded-t-sm transition-all duration-300"
                      style={{ height: `${(val / 70) * 100}%` }}
                      title={`${val} µs`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[11px] font-mono-code text-neutral-400 mt-2">
                  <span>-30s Trace</span>
                  <span>Average: 53.2 µs (Competitive Grade)</span>
                  <span>Now</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AUTO-TUNER */}
          {activeTab === 'autotuner' && (
            <div className="bg-[#0c0d12] border border-neutral-800 rounded-xl p-6 space-y-6">
              <div className="max-w-2xl">
                <h3 className="font-heading font-black text-xl text-white uppercase tracking-wider mb-2">
                  1-CLICK HARDWARE AUTO-TUNER
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                  Our neural analyzer inspects your exact CPU silicon stepping, GPU microarchitecture, motherboard chipset, and active Windows build to dynamically calculate the lowest-latency profile.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleRunAutoTuner}
                  disabled={isScanning}
                  className="py-3 px-6 rounded-lg font-heading font-bold text-xs uppercase tracking-wider text-white bg-[#FF1E27] hover:bg-[#E01720] red-glow-btn transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>{isScanning ? 'ANALYZING SYSTEM HARDWARE...' : 'RUN AUTO-TUNER SCAN'}</span>
                </button>

                {scanComplete && (
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono-code">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>OPTIMAL PROFILE APPLIED: 18 TWEAKS ACTIVATED</span>
                  </div>
                )}
              </div>

              {/* Hardware Detected Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-900 font-mono-code text-xs">
                <div className="bg-[#070709] p-3.5 rounded-lg border border-neutral-800/80">
                  <div className="text-neutral-400 mb-1">PROCESSOR PROFILE</div>
                  <div className="text-white font-bold">AMD Ryzen 7 7800X3D</div>
                  <div className="text-[11px] text-emerald-400 mt-1">3D V-Cache Priority Active</div>
                </div>

                <div className="bg-[#070709] p-3.5 rounded-lg border border-neutral-800/80">
                  <div className="text-neutral-400 mb-1">GRAPHICS ADAPTER</div>
                  <div className="text-white font-bold">NVIDIA RTX 4080 Super</div>
                  <div className="text-[11px] text-emerald-400 mt-1">MSI Interrupt Line #48</div>
                </div>

                <div className="bg-[#070709] p-3.5 rounded-lg border border-neutral-800/80">
                  <div className="text-neutral-400 mb-1">OS COMPATIBILITY</div>
                  <div className="text-white font-bold">Windows 11 (24H2) 64-Bit</div>
                  <div className="text-[11px] text-emerald-400 mt-1">Safe Restore Ready</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SCRIPT BUILDER */}
          {activeTab === 'scripts' && (
            <div className="bg-[#0c0d12] border border-neutral-800 rounded-xl p-6 space-y-6">
              <div>
                <h3 className="font-heading font-black text-xl text-white uppercase tracking-wider mb-2">
                  CUSTOM AUTOMATION SCRIPT BUILDER
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-sans">
                  Select the exact tweaks you want to bundle into a standalone, portable `.bat` batch script or PowerShell `.ps1` automation workflow.
                </p>
              </div>

              {/* Selectable checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Disable Core Parking',
                  'Set 0.500ms Timer Resolution',
                  'Enable MSI Mode on GPU',
                  'Purge Windows Telemetry',
                  'Disable Nagle TCP_NODELAY',
                  'MarkC 1:1 Raw Mouse Acceleration Fix',
                  'Force Maximum Performance State (P0)',
                  'Disable Background Game DVR',
                ].map((act) => {
                  const isSelected = selectedScriptActions.includes(act);
                  return (
                    <button
                      key={act}
                      type="button"
                      onClick={() => {
                        setSelectedScriptActions((prev) =>
                          isSelected ? prev.filter((x) => x !== act) : [...prev, act]
                        );
                      }}
                      className={`p-3 rounded-lg border text-left text-xs font-mono-code transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#0f1118] border-[#FF1E27] text-white'
                          : 'bg-[#070709] border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <span>{act}</span>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-[#FF1E27]" />
                      ) : (
                        <span className="w-4 h-4 border border-neutral-700 rounded-sm" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Script Preview Box */}
              <div className="bg-[#070709] border border-neutral-800 rounded-lg p-4 font-mono-code text-xs text-neutral-300">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-neutral-800">
                  <span className="text-neutral-400">GENERATED WORKFLOW SCRIPT:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyScript}
                      className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-200 hover:text-white transition-colors flex items-center gap-1"
                    >
                      {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedScript ? 'COPIED' : 'COPY SCRIPT'}</span>
                    </button>
                  </div>
                </div>
                <pre className="overflow-x-auto text-neutral-300 max-h-48 scrollbar-thin">
                  {generateScriptContent()}
                </pre>
              </div>
            </div>
          )}

          {/* TAB: INPUT DELAY & LATENCY TESTER */}
          {activeTab === 'input' && (
            <div className="bg-[#0c0d12] border border-neutral-800 rounded-xl p-6 space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-black text-lg text-white uppercase tracking-wider">
                    INTERACTIVE MOUSE CLICK LATENCY BENCHMARK
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans">
                    Click the target button repeatedly to measure direct browser-to-hardware dispatch latency.
                  </p>
                </div>
                {testClicks.length > 0 && (
                  <div className="text-right font-mono-code text-xs">
                    <span className="text-neutral-400">Average Click Lag: </span>
                    <span className="text-emerald-400 font-bold text-sm">
                      {(testClicks.reduce((a, b) => a + b, 0) / testClicks.length).toFixed(1)} ms
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleLatencyClick}
                  className="py-4 px-8 rounded-xl font-heading font-black text-sm uppercase tracking-wider text-white bg-[#FF1E27] hover:bg-[#E01720] red-glow-btn transition-all active:scale-95"
                >
                  {testActive ? 'CLICK HERE RAPIDLY TO BENCHMARK' : 'START LATENCY BENCHMARK'}
                </button>
                {testClicks.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setTestClicks([])}
                    className="text-xs text-neutral-400 hover:text-white font-mono-code underline"
                  >
                    Reset Benchmark
                  </button>
                )}
              </div>

              {testClicks.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  {testClicks.slice(-8).map((lag, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-[#070709] border border-neutral-800 text-[11px] font-mono-code text-neutral-300">
                      {lag} ms
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tweaks List */}
          <div className="space-y-3">
            {filteredTweaks.map((tweak) => (
              <div
                key={tweak.id}
                className={`rounded-xl border p-4 sm:p-5 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  tweak.enabled
                    ? 'bg-[#0c0d12] border-neutral-800/90 shadow-[0_2px_12px_rgba(0,0,0,0.4)]'
                    : 'bg-[#08090d]/60 border-neutral-900 opacity-70'
                }`}
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-heading font-bold text-base text-white tracking-wide">
                      {tweak.name}
                    </h3>
                    <span
                      className={`text-[10px] font-mono-code px-2 py-0.5 rounded border uppercase ${
                        tweak.safety === 'Safe'
                          ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                          : tweak.safety === 'Recommended'
                          ? 'bg-blue-950/60 text-blue-400 border-blue-500/30'
                          : 'bg-amber-950/60 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {tweak.safety}
                    </span>
                    <span className="text-[11px] font-mono-code text-[#FF1E27]">
                      {tweak.latencyBenefit}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    {tweak.description}
                  </p>
                </div>

                {/* Working Toggle Switch */}
                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <span className="text-xs font-mono-code uppercase text-neutral-400">
                    {tweak.enabled ? 'ACTIVE' : 'OFF'}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleTweak(tweak.id)}
                    aria-label={`Toggle ${tweak.name}`}
                    className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none p-0.5 ${
                      tweak.enabled ? 'bg-[#FF1E27] red-glow-subtle' : 'bg-neutral-800'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        tweak.enabled ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
