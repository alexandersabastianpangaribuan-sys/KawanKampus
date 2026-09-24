import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showTagline = false 
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* 
        Logo Concept: 
        Graduation Cap (Toga) + Letter K + Connection Ring/Network
        Colors: Navy (#0B3D91), Blue (#2563EB), Purple (#7C3AED)
      */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0B3D91] via-[#2563EB] to-[#7C3AED] shadow-sm text-white ${iconSizes[size]}`}>
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-4/5 h-4/5"
          aria-hidden="true"
        >
          {/* Graduation Cap Top (Toga) */}
          <path 
            d="M24 8L39 15L24 22L9 15L24 8Z" 
            fill="#FFFFFF" 
          />
          {/* Tassel */}
          <path 
            d="M36 17V26C36 27.1 35.1 28 34 28" 
            stroke="#93C5FD" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
          {/* Letter K & Connection Bridge */}
          <path 
            d="M17 21V39M17 30L29 20M21 26L31 39" 
            stroke="#FFFFFF" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          {/* Connection Nodes */}
          <circle cx="29" cy="20" r="2.5" fill="#38BDF8" />
          <circle cx="31" cy="39" r="2.5" fill="#C084FC" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center">
          <span className={`font-bold tracking-tight text-[#0B3D91] ${textSizes[size]}`}>
            Kawan<span className="text-[#2563EB]">Kampus</span>
          </span>
          <span className="text-xs font-semibold text-[#7C3AED] ml-0.5 self-start px-1.5 py-0.5 rounded bg-purple-50">
            .id
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] text-gray-500 font-medium -mt-1 tracking-wide">
            Lebih dari Sekadar Marketplace
          </span>
        )}
      </div>
    </div>
  );
};
