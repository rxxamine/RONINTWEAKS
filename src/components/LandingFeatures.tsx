import React from 'react';
import {
  Wand2,
  Cpu,
  Zap,
  Code2,
  Sliders,
  Trash2,
  MousePointer2,
  Binary,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { DashboardTab } from '../types';

interface LandingFeaturesProps {
  onSelectFeatureInDashboard: (tab: DashboardTab) => void;
}

export const LandingFeatures: React.FC<LandingFeaturesProps> = ({
  onSelectFeatureInDashboard,
}) => {
  const features = [
    {
      id: 'autotuner' as DashboardTab,
      title: 'Auto-Tuner',
      description:
        'Automatically analyzes your system and recommends the best optimization profile. Apply hundreds of custom tweaks in one click.',
      icon: Wand2,
      badge: '1-Click Profiling',
    },
    {
      id: 'cpu' as DashboardTab,
      title: 'Complete System Optimization',
      description:
        'Comprehensive tweaks for CPU, GPU, network adapters, power management, and input devices.',
      icon: Cpu,
      badge: 'Kernel & Core Tuning',
    },
    {
      id: 'power' as DashboardTab,
      title: 'NVIDIA & Power Plans',
      description:
        'Automatically detects your games and applies optimized NVIDIA profiles. Custom power plans for all.',
      icon: Zap,
      badge: '0.500ms Timer Active',
    },
    {
      id: 'scripts' as DashboardTab,
      title: 'Script Builder',
      description:
        'Create, save, and share custom automation workflows with drag-and-drop components.',
      icon: Code2,
      badge: 'Visual Workflow Engine',
    },
    {
      id: 'gpu' as DashboardTab,
      title: 'Hardware-Specific Tweaks',
      description:
        'Dedicated optimizations for Nvidia/Intel/AMD GPUs, Intel/AMD CPUs, and all peripherals.',
      icon: Sliders,
      badge: 'Silicon-Level Profiles',
    },
    {
      id: 'debloat' as DashboardTab,
      title: 'Deep System Debloating',
      description:
        'Remove unnecessary Windows services, bloatware, and background processes safely.',
      icon: Trash2,
      badge: 'Safe Restore Points',
    },
    {
      id: 'input' as DashboardTab,
      title: 'Ultra-Low Input Delay',
      description:
        'Optimize mouse, keyboard, and controller response times for competitive gaming advantage.',
      icon: MousePointer2,
      badge: '1000Hz - 8000Hz Polling',
    },
    {
      id: 'bios' as DashboardTab,
      title: 'BIOS Tuner (Add-on +$15)',
      description:
        'Complete BIOS optimization and hidden settings unlock for Intel and AMD systems.',
      icon: Binary,
      badge: 'Unlocked Sub-Timings',
      highlight: true,
    },
    {
      id: 'overview' as DashboardTab,
      title: 'Real-time Dashboard',
      description:
        'Clean interface with real-time system monitoring and comprehensive hardware specs.',
      icon: Activity,
      badge: 'Live Telemetry & DPC',
    },
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-900 bg-[#070709]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-wider uppercase mb-3 text-balance">
            <span className="text-white">WHAT ULTIMATE</span>{' '}
            <span className="text-[#FF1E27] drop-shadow-[0_0_20px_rgba(255,30,39,0.7)]">INCLUDES</span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg font-sans tracking-wide">
            Completely optimize your system with hundreds of tweaks
          </p>
        </div>

        {/* 3x3 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                onClick={() => onSelectFeatureInDashboard(feat.id)}
                className={`group relative rounded-xl bg-[#0c0d12]/90 border p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between ${
                  feat.highlight
                    ? 'border-[#FF1E27]/40 hover:border-[#FF1E27] red-glow-card'
                    : 'border-neutral-800/80 hover:border-neutral-700 hover:shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
                }`}
              >
                <div>
                  {/* Top row with icon & tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                        feat.highlight
                          ? 'bg-[#FF1E27]/15 text-[#FF1E27] border border-[#FF1E27]/30'
                          : 'bg-neutral-900 text-neutral-300 border border-neutral-800 group-hover:text-[#FF1E27] group-hover:border-[#FF1E27]/30'
                      }`}
                    >
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>

                    <span className="text-xs font-mono-code text-neutral-400 group-hover:text-neutral-300 transition-colors">
                      {feat.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-lg text-white mb-2 tracking-wide group-hover:text-neutral-100 flex items-center justify-between">
                    <span>{feat.title}</span>
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                    {feat.description}
                  </p>
                </div>

                {/* Bottom link affordance */}
                <div className="pt-4 mt-4 border-t border-neutral-900/80 flex items-center justify-between text-xs font-heading font-semibold tracking-wider uppercase text-neutral-400 group-hover:text-[#FF1E27] transition-colors">
                  <span>LAUNCH IN UTILITY</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
