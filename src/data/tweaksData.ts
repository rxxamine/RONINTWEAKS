import { TweakItem } from '../types';

export const INITIAL_TWEAKS: TweakItem[] = [
  // CPU Tweaks
  {
    id: 'cpu-core-parking',
    category: 'cpu',
    name: 'Disable CPU Core Parking',
    description: 'Forces all physical and logical cores to remain 100% active, preventing micro-stutters during core wake-up transitions.',
    safety: 'Safe',
    enabled: true,
    impact: 'High',
    latencyBenefit: '-18µs latency'
  },
  {
    id: 'cpu-hpet',
    category: 'cpu',
    name: 'Disable HPET (High Precision Event Timer)',
    description: 'Bypasses legacy motherboard timer in favor of CPU invariant TSC, significantly cutting CPU interrupt overhead.',
    safety: 'Recommended',
    enabled: true,
    impact: 'High',
    latencyBenefit: '-24µs DPC jitter'
  },
  {
    id: 'cpu-cstates',
    category: 'cpu',
    name: 'C-State Latency Optimization',
    description: 'Restricts aggressive CPU sleep states while on AC power to eliminate frequency throttling during heavy rendering.',
    safety: 'Safe',
    enabled: false,
    impact: 'Medium',
    latencyBenefit: '-12µs switch time'
  },
  {
    id: 'cpu-large-cache',
    category: 'cpu',
    name: 'Large System Cache Allocation',
    description: 'Instructs the NT kernel to maintain operating system code in memory for faster kernel trap responses.',
    safety: 'Safe',
    enabled: true,
    impact: 'Medium',
    latencyBenefit: '+4% 0.1% Lows'
  },
  {
    id: 'cpu-affinity-games',
    category: 'cpu',
    name: 'Real-Time Process Priority Routing',
    description: 'Automatically elevates foreground game threads to High priority while pushing background tasks to Efficiency cores.',
    safety: 'Recommended',
    enabled: true,
    impact: 'High',
    latencyBenefit: '+14% FPS stability'
  },

  // GPU Tweaks
  {
    id: 'gpu-msi-mode',
    category: 'gpu',
    name: 'Enable MSI (Message Signaled Interrupts)',
    description: 'Switches GPU from legacy shared IRQ line to Message Signaled Interrupts, eliminating hardware interrupt collisions.',
    safety: 'Safe',
    enabled: true,
    impact: 'High',
    latencyBenefit: '-35µs driver latency'
  },
  {
    id: 'gpu-power-perf',
    category: 'gpu',
    name: 'Force Maximum Performance State (P0)',
    description: 'Locks GPU clock frequencies during 3D fullscreen mode so voltages never downclock during intense firefights.',
    safety: 'Safe',
    enabled: true,
    impact: 'High',
    latencyBenefit: 'Zero downclock lag'
  },
  {
    id: 'gpu-nvidia-ull',
    category: 'gpu',
    name: 'NVIDIA Ultra-Low Latency Mode',
    description: 'Limits pre-rendered frames queue to exactly 0 to sync rendering immediately with monitor refresh rate.',
    safety: 'Safe',
    enabled: true,
    impact: 'High',
    latencyBenefit: '-15ms frame lag'
  },
  {
    id: 'gpu-hags',
    category: 'gpu',
    name: 'Hardware-Accelerated GPU Scheduling (HAGS)',
    description: 'Offloads high-frequency scheduling tasks directly onto GPU dedicated scheduling processor.',
    safety: 'Recommended',
    enabled: true,
    impact: 'High',
    latencyBenefit: '+8% average FPS'
  },
  {
    id: 'gpu-disable-hdcp',
    category: 'gpu',
    name: 'Bypass Display HDCP Handshake Delay',
    description: 'Disables copy-protection handshake checks for competitive monitors to eliminate video output sync delays.',
    safety: 'Safe',
    enabled: false,
    impact: 'Low',
    latencyBenefit: '-4µs render delay'
  },

  // Input & Peripherals
  {
    id: 'input-polling-stability',
    category: 'input',
    name: 'USB 1000Hz / 8000Hz Polling Stability',
    description: 'Patches USB xHCI controller interrupt moderation to ensure true 0.125ms packet timing without packet loss.',
    safety: 'Safe',
    enabled: true,
    impact: 'High',
    latencyBenefit: 'True 0.125ms delivery'
  },
  {
    id: 'input-markc-fix',
    category: 'input',
    name: 'MarkC 1:1 Raw Mouse Acceleration Fix',
    description: 'Completely eliminates Windows hidden pointer curve for mathematically perfect 1:1 mouse movement.',
    safety: 'Safe',
    enabled: true,
    impact: 'High',
    latencyBenefit: 'Pure 1:1 raw input'
  },
  {
    id: 'input-keyboard-repeat',
    category: 'input',
    name: 'Keyboard Response Buffer Tuning',
    description: 'Minimizes key repeat delay to 120ms and maximizes repeat rate to eliminate initial keystroke latency.',
    safety: 'Safe',
    enabled: true,
    impact: 'Medium',
    latencyBenefit: '-20ms keystroke lag'
  },
  {
    id: 'input-selective-suspend',
    category: 'input',
    name: 'Disable USB Selective Suspend',
    description: 'Prevents Windows from idling peripheral ports, eliminating first-millisecond mouse stutter after pauses.',
    safety: 'Safe',
    enabled: true,
    impact: 'Medium',
    latencyBenefit: 'Zero wake-up delay'
  },

  // Network
  {
    id: 'net-nagle-disable',
    category: 'net-nagle-disable' as any,
    name: 'Disable Nagle Algorithm (TCP_NODELAY)',
    description: 'Instructs TCP stack to send gaming packets immediately without waiting for transmission buffer to fill.',
    safety: 'Safe',
    enabled: true,
    impact: 'High',
    latencyBenefit: '-15ms ping jitter'
  },
  {
    id: 'net-throttle-index',
    category: 'network',
    name: 'Disable Network Throttling Index',
    description: 'Removes Windows default multimedia network bandwidth limiter, allocating 100% bandwidth to active gaming packets.',
    safety: 'Safe',
    enabled: true,
    impact: 'High',
    latencyBenefit: '-22% packet loss'
  },
  {
    id: 'net-dscp-qos',
    category: 'network',
    name: 'DSCP Gaming Packet QoS Tagging',
    description: 'Tags game network packets with DSCP Expedited Forwarding (46) for priority treatment on modern gaming routers.',
    safety: 'Recommended',
    enabled: false,
    impact: 'Medium',
    latencyBenefit: '-8ms bufferbloat'
  },

  // Debloat
  {
    id: 'debloat-telemetry',
    category: 'debloat',
    name: 'Purge Windows Diagnostic Telemetry',
    description: 'Disables Diagnostic Tracking Service (DiagTrack), CEIP, and background error reporting daemons.',
    safety: 'Safe',
    enabled: true,
    impact: 'High',
    latencyBenefit: '-120MB RAM, zero disk spikes'
  },
  {
    id: 'debloat-xbox-dvr',
    category: 'debloat',
    name: 'Disable Background Game DVR Recording',
    description: 'Stops continuous background gameplay encoding and Xbox Game Bar overlay telemetry.',
    safety: 'Safe',
    enabled: true,
    impact: 'High',
    latencyBenefit: '+15 FPS in heavy titles'
  },
  {
    id: 'debloat-cortana-edge',
    category: 'debloat',
    name: 'Silence Copilot & Edge Pre-Launch Agents',
    description: 'Stops background Edge webview processes, push notification brokers, and Bing discovery services.',
    safety: 'Safe',
    enabled: true,
    impact: 'Medium',
    latencyBenefit: '-45 background processes'
  },

  // Power & Timers
  {
    id: 'power-plan-ronin',
    category: 'power',
    name: 'Ronin Ultimate Custom Power Plan',
    description: 'Custom ACPI plan with 0% unpark latency, active cooling policy, and disabled PCIe ASPM energy savings.',
    safety: 'Recommended',
    enabled: true,
    impact: 'High',
    latencyBenefit: 'Locked peak clock speeds'
  },
  {
    id: 'power-timer-resolution',
    category: 'power',
    name: '0.500ms High-Resolution System Timer',
    description: 'Locks global Windows timer resolution to 0.500ms (5000 units), doubling system responsiveness over default 15.6ms.',
    safety: 'Recommended',
    enabled: true,
    impact: 'High',
    latencyBenefit: '0.500ms guaranteed resolution'
  },

  // BIOS Tuner (Addon)
  {
    id: 'bios-rebar-force',
    category: 'bios',
    name: 'Force Full Resizable BAR (Above 4G)',
    description: 'Allows CPU full memory aperture access to entire GPU VRAM simultaneously instead of 256MB chunks.',
    safety: 'Safe',
    enabled: true,
    impact: 'High',
    latencyBenefit: '+12% framerate pacing'
  },
  {
    id: 'bios-spread-spectrum',
    category: 'bios',
    name: 'Disable BCLK Spread Spectrum',
    description: 'Locks base clock frequency precisely to 100.00 MHz without EMI frequency dithering.',
    safety: 'Expert',
    enabled: false,
    impact: 'Medium',
    latencyBenefit: 'Exact 100.00MHz timing'
  },
  {
    id: 'bios-hidden-pstates',
    category: 'bios',
    name: 'Unlock Hidden Voltage Frequency Curves',
    description: 'Exposes advanced AMD Curve Optimizer and Intel Adaptive Voltage VF points for negative voltage offset tuning.',
    safety: 'Expert',
    enabled: false,
    impact: 'High',
    latencyBenefit: '-8°C temps, +150MHz boost'
  }
];

export const FAQ_ITEMS = [
  {
    question: 'How much does Ronin Tweaks Ultimate cost?',
    answer: 'RoninTweaks Ultimate is a single one-time payment of $25 with no subscriptions, monthly fees, or hidden renewals. You receive lifetime access, all future feature updates, automated cloud profiles, and priority support.'
  },
  {
    question: 'Do you offer HWID Resets?',
    answer: 'Yes! We know gamers upgrade parts. You receive 1 free automated hardware ID (HWID) reset every 30 days directly inside your dashboard. Need an emergency reset after a sudden motherboard or motherboard BIOS flash? Our Discord support team handles emergency re-binds 24/7.'
  },
  {
    question: 'Is Ronin Tweaks safe to use?',
    answer: '100% safe. Before applying any tweak or profile, RoninTweaks automatically creates a native Windows System Restore Point and an encrypted registry backup. Every single tweak includes safe defaults and a 1-click "Revert All" feature. We never install third-party driver hacks or rootkits.'
  },
  {
    question: 'Will this work on my system?',
    answer: 'RoninTweaks Ultimate supports Windows 10 (21H2, 22H2) and Windows 11 (22H2, 23H2, 24H2) 64-bit editions. It is optimized for all Intel (Core i3/i5/i7/i9) and AMD Ryzen processors, along with NVIDIA GeForce (GTX/RTX), AMD Radeon (RX 5000/6000/7000), and Intel Arc graphics cards.'
  },
  {
    question: 'How do I get support if I need help?',
    answer: 'Customers receive private access to our VIP Discord server with dedicated system optimization engineers, as well as 24/7 ticket support at support@ronintweaks.com. We also provide step-by-step video guides and pre-tested game profiles.'
  },
  {
    question: 'Do I get lifetime updates?',
    answer: 'Yes. Once purchased, your license key is valid forever. You will receive all version upgrades, new Windows build optimizations (including Windows 11 updates), new game profiles, and newly released tweak modules without paying another cent.'
  },
  {
    question: 'Will I get a Performance Boost?',
    answer: 'Our average user experiences a 30% to 55% reduction in system DPC latency, elimination of micro-stuttering, +15% to +30% higher 0.1% and 1% low FPS, and noticeable mouse click-to-photon responsiveness. Competitive titles like CS2, Valorant, Apex Legends, Warzone, and Fortnite see immediate smoothness gains.'
  },
  {
    question: 'What happens after purchase?',
    answer: 'Immediately upon checkout completion via Stripe, your unique RoninTweaks Ultimate License Key is displayed on screen and sent to your email with instant download links for both the automated installer and portable zero-install package.'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Alex "Viper" Chen',
    role: 'Competitive Apex Legends Predator',
    quote: 'The input delay reduction in RoninTweaks is night and day. My tracking in close-range 1v1s feels glued to the crosshair. My DPC latency dropped from 160µs to 68µs.',
    gain: '-58% Input Latency'
  },
  {
    name: 'Marcus Vance',
    role: 'CS2 Faceit Level 10 / Streamer',
    quote: 'No more 1% low frame drops during smoke grenades. The Auto-Tuner analyzed my 7800X3D + 4090 rig in 10 seconds and applied the optimal MSI mode and power plan.',
    gain: '+34 FPS in 1% Lows'
  },
  {
    name: 'David Kowalski',
    role: 'Custom PC Builder & Overclocker',
    quote: 'Unlike sketchy batch files floating on forums, RoninTweaks is clean, modern, safe with restore points, and genuinely well-engineered. The BIOS Tuner addon alone is worth twice the price.',
    gain: '5.2GHz Stable Clocks'
  }
];
