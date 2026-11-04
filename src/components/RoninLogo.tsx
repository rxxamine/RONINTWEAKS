import React from 'react';

interface RoninLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export const RoninLogo: React.FC<RoninLogoProps> = ({
  className = '',
  size = 'lg',
  onClick,
}) => {
  // Dimensions for emblem
  const dimensions = {
    sm: { width: 36, height: 36 },
    md: { width: 44, height: 44 },
    lg: { width: 52, height: 52 },
    xl: { width: 68, height: 68 },
  };

  const { width, height } = dimensions[size];

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      aria-label="Ronin Logo"
      className={`relative inline-flex items-center justify-center cursor-pointer select-none group transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none ${className}`}
    >
      {/* Ambient Red Glow Halo behind Logo */}
      <div
        className="absolute inset-0 rounded-full bg-[#FF1E27]/30 blur-xl opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 pointer-events-none"
        aria-hidden="true"
      />

      {/* Bespoke Vector Ronin Cyber-Samurai Crest (No typed text) */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-[0_0_15px_rgba(255,30,39,0.7)]"
      >
        <defs>
          {/* Intense Crimson Gradient */}
          <linearGradient id="roninRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF4D54" />
            <stop offset="50%" stopColor="#FF1E27" />
            <stop offset="100%" stopColor="#9E0C12" />
          </linearGradient>

          {/* Dark Metallic Armor Gradient */}
          <linearGradient id="armorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#222430" />
            <stop offset="50%" stopColor="#14151D" />
            <stop offset="100%" stopColor="#0A0B0F" />
          </linearGradient>

          {/* Silver Blade Edge Gradient */}
          <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagonal Tactical Shield Frame */}
        <polygon
          points="50,4 88,24 88,72 50,96 12,72 12,24"
          fill="url(#armorGrad)"
          stroke="#FF1E27"
          strokeWidth="2.5"
          className="transition-all duration-300 group-hover:stroke-[#FF4D54]"
        />

        {/* Inner Shield Border Inset */}
        <polygon
          points="50,9 83,27 83,69 50,90 17,69 17,27"
          fill="none"
          stroke="#FF1E27"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Symmetrical Cyber Horns / Katana Crest (Maedate) */}
        {/* Left Horn */}
        <path
          d="M 50 28 L 38 12 L 24 16 L 36 28 L 26 38 L 42 35 Z"
          fill="url(#roninRedGrad)"
        />
        {/* Right Horn */}
        <path
          d="M 50 28 L 62 12 L 76 16 L 64 28 L 74 38 L 58 35 Z"
          fill="url(#roninRedGrad)"
        />

        {/* Horn Inner Silver Blade Edges */}
        <path
          d="M 38 12 L 24 16 L 36 28 Z"
          fill="url(#bladeGrad)"
          opacity="0.8"
        />
        <path
          d="M 62 12 L 76 16 L 64 28 Z"
          fill="url(#bladeGrad)"
          opacity="0.8"
        />

        {/* Central Forehead Armor Plate with Stylized Ronin 'R' Cut */}
        <path
          d="M 44 26 L 56 26 L 60 48 L 40 48 Z"
          fill="#0D0E14"
          stroke="#FF1E27"
          strokeWidth="1.5"
        />

        {/* Stylized Red 'R' Laser Symbol in Forehead */}
        <path
          d="M 47 31 L 53 31 C 55 31 56 32 56 34 C 56 36 55 37 53 37 L 47 37 Z M 47 31 L 47 43 M 51 37 L 55 43"
          stroke="#FF1E27"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#laserGlow)"
        />

        {/* Cyber Visor Eye Slits (Piercing Neon Red) */}
        <g filter="url(#laserGlow)">
          {/* Left Eye Slit */}
          <polygon
            points="29,52 45,52 42,56 32,56"
            fill="#FF1E27"
            className="animate-pulse"
          />
          {/* Right Eye Slit */}
          <polygon
            points="55,52 71,52 68,56 58,56"
            fill="#FF1E27"
            className="animate-pulse"
          />
          {/* Visor Glare Highlights */}
          <polygon points="34,53 43,53 41,55 36,55" fill="#FFFFFF" opacity="0.9" />
          <polygon points="57,53 66,53 64,55 59,55" fill="#FFFFFF" opacity="0.9" />
        </g>

        {/* Lower Samurai Mempo Faceplate & Breath Grill */}
        <polygon
          points="35,62 65,62 59,84 41,84"
          fill="url(#armorGrad)"
          stroke="#FF1E27"
          strokeWidth="1.5"
        />

        {/* Symmetrical Vents / Katana Slash Slits */}
        <line x1="43" y1="67" x2="57" y2="67" stroke="#FF1E27" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="44" y1="72" x2="56" y2="72" stroke="#FF1E27" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="46" y1="77" x2="54" y2="77" stroke="#FF1E27" strokeWidth="1.5" strokeOpacity="0.8" />

        {/* Jaw Fang / Chin Tip */}
        <polygon
          points="46,84 54,84 50,91"
          fill="url(#roninRedGrad)"
        />

        {/* Left & Right Cheek Armor Guards */}
        <polygon
          points="20,44 28,40 31,64 22,68"
          fill="#161822"
          stroke="#FF1E27"
          strokeWidth="1"
        />
        <polygon
          points="80,44 72,40 69,64 78,68"
          fill="#161822"
          stroke="#FF1E27"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};
