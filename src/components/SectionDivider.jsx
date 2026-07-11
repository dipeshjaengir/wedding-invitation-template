import React from 'react';

export const SectionDivider = ({ type = 'leaf', className = '' }) => {
  const dividerStyles = {
    // Elegant Traditional Leaf/Floral scroll divider
    leaf: (
      <svg
        viewBox="0 0 200 40"
        width="120"
        height="24"
        className="text-theme-primary opacity-80"
        fill="currentColor"
      >
        <path d="M100,5 C100,5 98,18 90,20 C85,21 82,18 80,18 C78,18 70,25 60,20 C50,15 48,22 40,20 C32,18 30,5 20,20 L0,20 M100,5 C100,5 102,18 110,20 C115,21 118,18 120,18 C122,18 130,25 140,20 C150,15 152,22 160,20 C168,18 170,5 180,20 L200,20" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        {/* Central Lotus Bud */}
        <path d="M100,3 C95,12 98,22 100,28 C102,22 105,12 100,3 Z" fill="currentColor"/>
        <path d="M100,8 C92,16 95,23 100,28 C105,23 108,16 100,8 Z" opacity="0.6"/>
        <circle cx="100" cy="32" r="1.5"/>
      </svg>
    ),

    // Royal Indian Arch Dome divider
    dome: (
      <svg
        viewBox="0 0 300 30"
        width="200"
        height="20"
        className="text-theme-primary opacity-60"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M0,15 L120,15 Q135,15 142,5 Q150,-2 158,5 Q165,15 180,15 L300,15"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="150" cy="18" r="2" fill="currentColor" stroke="none" />
        <circle cx="130" cy="15" r="1" fill="currentColor" stroke="none" />
        <circle cx="170" cy="15" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),

    // Clean diamond lace divider
    pattern: (
      <svg
        viewBox="0 0 100 20"
        width="80"
        height="16"
        className="text-theme-primary opacity-60"
        fill="none"
        stroke="currentColor"
      >
        <line x1="0" y1="10" x2="40" y2="10" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="60" y1="10" x2="100" y2="10" strokeWidth="0.5" strokeDasharray="2 2" />
        <polygon points="50,4 56,10 50,16 44,10" strokeWidth="1" fill="currentColor" fillOpacity="0.2" />
        <circle cx="36" cy="10" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="64" cy="10" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  };

  return (
    <div className={`flex items-center justify-center py-10 select-none ${className}`}>
      {dividerStyles[type] || dividerStyles.leaf}
    </div>
  );
};

export default SectionDivider;
