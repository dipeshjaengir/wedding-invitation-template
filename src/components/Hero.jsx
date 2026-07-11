import React from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariants, blurInVariants } from '../utils/animations';

export const Hero = ({ bride, groom, date, mandapBg }) => {
  return (
    <div
      id="hero"
      className="relative w-screen min-h-screen flex flex-col items-center justify-center bg-theme-bg overflow-hidden py-24 select-none"
    >
      {/* Background Radial Glow Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,200,200,0.1)_0%,transparent_70%)] pointer-events-none" />

      {/* Repeating Mandap Silhouette in background */}
      {mandapBg && (
        <div className="absolute inset-0 z-0 opacity-[0.03] flex items-center justify-center">
          <img
            src={mandapBg}
            alt="Royal Mandap Backdrop"
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </div>
      )}

      {/* Fully Unfolded Main Stationery Card */}
      <div className="relative z-10 w-full max-w-[345px] md:max-w-[460px] px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={blurInVariants}
          className="stationery-card rounded-2xl gold-foil-border p-8 md:p-12 shadow-2xl flex flex-col items-center text-center space-y-6 relative overflow-hidden"
        >
          {/* Inner frame foil border */}
          <div className="absolute inset-0 border border-theme-primary/10 m-2 rounded-xl pointer-events-none" />

          {/* 1. Ganesha Ji Line Art Illustration */}
          <div className="w-14 h-14 md:w-16 md:h-16 text-theme-accent opacity-90">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Crown (Mukut) */}
              <path d="M42,20 L50,8 L58,20 Z" />
              <path d="M45,20 L50,13 L55,20" />
              <line x1="50" y1="8" x2="50" y2="5" strokeWidth="2" />
              
              {/* Head & Ears */}
              <path d="M35,32 Q25,28 35,40 Q40,46 42,32" /> {/* Left ear */}
              <path d="M65,32 Q75,28 65,40 Q60,46 58,32" /> {/* Right ear */}
              <path d="M42,32 Q50,26 58,32" /> {/* Forehead */}
              
              {/* Tilak */}
              <path d="M48,22 L52,22 L50,30 Z" fill="currentColor" stroke="none" />

              {/* Trunk (Sondh) */}
              <path d="M50,32 Q46,45 42,55 Q38,65 42,70 Q45,72 48,68 Q50,65 46,58" />
              
              {/* Tusks */}
              <line x1="43" y1="42" x2="38" y2="44" strokeWidth="2" /> {/* Left broken tusk */}
              <line x1="57" y1="42" x2="62" y2="44" /> {/* Right whole tusk */}
              
              {/* Modak (Sweets) symbol inside Trunk bend */}
              <circle cx="48" cy="65" r="2" fill="currentColor" stroke="none" />
            </svg>
          </div>

          {/* Mantras */}
          <span className="font-heading text-[9px] md:text-[10px] tracking-[0.35em] text-theme-accent uppercase font-bold">
            || Om Shri Ganeshaya Namah ||
          </span>

          <div className="w-8 h-[1px] bg-theme-primary/30 mx-auto" />

          {/* Blessing Message */}
          <p className="font-body text-[10px] md:text-xs text-theme-text-muted italic max-w-xs leading-relaxed">
            "With the grace of God and blessings of our elders, we request the honor of your presence to celebrate the union of love and togetherness."
          </p>

          {/* Bride & Groom names */}
          <div className="space-y-2 py-3">
            <h1 className="font-names text-5xl md:text-6xl text-theme-text tracking-wide drop-shadow-[0_1px_5px_var(--theme-glow)]">
              {bride.name}
            </h1>
            <span className="font-names text-2xl md:text-3xl text-theme-primary block my-1">&amp;</span>
            <h1 className="font-names text-5xl md:text-6xl text-theme-text tracking-wide drop-shadow-[0_1px_5px_var(--theme-glow)]">
              {groom.name}
            </h1>
          </div>

          {/* Family Names */}
          <div className="space-y-1">
            <span className="font-heading text-[8px] tracking-[0.25em] text-theme-accent uppercase block font-bold">
              With Love From
            </span>
            <p className="font-body text-[11px] text-theme-text-muted">
              The Sharma &amp; Raichand Families
            </p>
          </div>

          <div className="w-16 h-[1px] bg-theme-primary/30 mx-auto my-1" />

          {/* Wedding Date Details */}
          <div className="space-y-1 pt-2">
            <p className="font-heading text-xs md:text-sm tracking-[0.2em] text-theme-text uppercase font-semibold">
              {date}
            </p>
            <p className="font-body text-[10px] text-theme-text-muted uppercase tracking-widest mt-1">
              Taj Palace, New Delhi
            </p>
          </div>

          {/* Subtle scroll trigger instruction */}
          <div className="pt-4 animate-pulse">
            <span className="font-heading text-[8px] tracking-[0.3em] text-theme-primary uppercase font-bold block">
              Scroll To See Magic
            </span>
          </div>
        </motion.div>
      </div>

      {/* Floating scroll indicator lines */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 opacity-40">
        <div className="w-[1px] h-10 bg-gradient-to-b from-theme-primary to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 40, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-1/2 bg-theme-accent"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
