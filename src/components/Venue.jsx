import React from 'react';
import { HiOutlineMapPin } from 'react-icons/hi2';
import Section from './Section';
import SectionDivider from './SectionDivider';

export const Venue = ({ venueData }) => {
  const { name, address, description, mapLink } = venueData;

  return (
    <Section id="venue" className="select-none">
      {/* Header */}
      <div className="text-center space-y-3 mb-16">
        <span className="font-heading text-xs tracking-[0.3em] text-theme-primary uppercase">
          Location
        </span>
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-widest text-theme-text uppercase">
          The Venue
        </h2>
        <div className="w-16 h-[1.5px] bg-theme-primary mx-auto mt-4" />
      </div>

      {/* Luxury Venue Card */}
      <div className="w-full max-w-4xl px-4">
        <div className="stationery-card rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-10 md:gap-14 border border-theme-border/20 shadow-[0_0_20px_var(--theme-glow)]">
          {/* Inner frame */}
          <div className="absolute inset-0 border border-theme-primary/10 m-2 rounded-xl pointer-events-none" />

          {/* Left panel: Palace Line Art Illustration */}
          <div className="flex flex-col items-center justify-center text-center p-6 bg-theme-bg/40 border border-theme-border/40 rounded-xl w-full md:w-1/3 aspect-square max-w-[200px] relative overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-20 h-20 text-theme-primary filter drop-shadow-[0_2px_4px_var(--theme-glow)]">
              {/* Palace Dome silhouette line art */}
              <path d="M15,75 C15,50 25,45 50,45 C75,45 85,50 85,75 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M25,75 C25,55 33,52 50,52 C67,52 75,55 75,75 Z" fill="currentColor" opacity="0.15" />
              {/* Spire */}
              <line x1="50" y1="45" x2="50" y2="30" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="50" cy="27" r="3" fill="currentColor" />
              {/* Palace columns */}
              <line x1="30" y1="75" x2="30" y2="90" stroke="currentColor" strokeWidth="1.5" />
              <line x1="50" y1="75" x2="50" y2="90" stroke="currentColor" strokeWidth="1.5" />
              <line x1="70" y1="75" x2="70" y2="90" stroke="currentColor" strokeWidth="1.5" />
              <line x1="10" y1="90" x2="90" y2="90" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="font-heading text-[10px] tracking-widest text-theme-primary uppercase mt-4 block font-bold">
              Taj Palace
            </span>
          </div>

          {/* Right panel: Information */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl md:text-3xl text-theme-accent font-bold tracking-wide">
                {name}
              </h3>
              <p className="font-body text-xs text-theme-primary tracking-widest uppercase font-semibold">
                New Delhi, India
              </p>
            </div>

            <p className="font-body text-sm md:text-base leading-relaxed text-theme-text-muted">
              {description}
            </p>

            <div className="border-t border-theme-border/30 pt-6 space-y-2">
              <span className="font-heading text-[10px] tracking-widest text-theme-primary uppercase block">
                Postal Address
              </span>
              <p className="font-body text-xs md:text-sm text-theme-text/90 leading-relaxed max-w-md">
                {address}
              </p>
            </div>

            <div className="pt-4 flex justify-center md:justify-start">
              <button
                onClick={() => window.open(mapLink, '_blank')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 py-3.5 px-8 rounded font-heading text-[10px] tracking-widest uppercase bg-theme-primary text-theme-bg cursor-pointer hover:bg-theme-accent shadow-lg transition-all duration-300 relative group overflow-hidden"
              >
                <HiOutlineMapPin size={14} className="group-hover:scale-115 transition-transform" />
                <span>View On Map</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <SectionDivider type="dome" className="mt-20" />
    </Section>
  );
};

export default Venue;
