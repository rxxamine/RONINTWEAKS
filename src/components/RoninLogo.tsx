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
  const sizeClasses = {
    sm: 'text-lg tracking-wider',
    md: 'text-xl tracking-wider',
    lg: 'text-2xl tracking-wider',
    xl: 'text-3xl sm:text-4xl tracking-wider',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center select-none font-heading font-black uppercase cursor-pointer group ${sizeClasses[size]} ${className}`}
    >
      {/* "RONIN" in clean, high-contrast, pure white */}
      <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)] group-hover:text-neutral-100 transition-colors">
        RONIN
      </span>

      {/* "TWEAKS" in vivid red with the authentic red ambient glow from image.png */}
      <span className="relative text-[#FF1E27] tracking-wider transition-all duration-300">
        {/* Ambient atmospheric red glow behind TWEAKS */}
        <span
          className="absolute inset-0 text-[#FF1E27] blur-md opacity-75 pointer-events-none select-none -z-10 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        >
          TWEAKS
        </span>
        <span className="drop-shadow-[0_0_12px_rgba(255,30,39,0.9)]">
          TWEAKS
        </span>
      </span>
    </div>
  );
};
