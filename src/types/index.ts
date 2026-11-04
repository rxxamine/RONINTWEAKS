export interface TweakItem {
  id: string;
  category: 'cpu' | 'gpu' | 'input' | 'network' | 'debloat' | 'power' | 'bios';
  name: string;
  description: string;
  safety: 'Safe' | 'Recommended' | 'Aggressive' | 'Expert';
  enabled: boolean;
  impact: string;
  latencyBenefit: string;
}

export interface SystemSpecs {
  cpu: string;
  cpuUsage: number;
  cpuClock: string;
  gpu: string;
  gpuUsage: number;
  gpuTemp: number;
  ramUsage: number;
  ramTotal: string;
  currentLatencyUs: number;
  timerResolutionMs: number;
  hwid: string;
}

export type ViewMode = 'landing' | 'dashboard';

export type DashboardTab =
  | 'overview'
  | 'autotuner'
  | 'cpu'
  | 'gpu'
  | 'input'
  | 'network'
  | 'debloat'
  | 'scripts'
  | 'power'
  | 'bios';
