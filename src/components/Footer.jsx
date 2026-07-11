import React from 'react';
import { FaInstagram } from 'react-icons/fa';

export const Footer = ({ brideName, groomName, contact, socialLinks, monogram }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#FFF8F5] border-t border-theme-border/20 py-20 px-4 md:px-8 select-none relative overflow-hidden text-center">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(232,200,200,0.03)_0%,transparent_75%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-12 relative z-10">
        
        {/* Soft Flower Petals/Leaves SVG Decoration */}
        <div className="w-12 h-12 text-theme-primary/30 mx-auto">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
            <path d="M50,10 C55,25 45,25 50,10 Z" />
            <path d="M50,90 C55,75 45,75 50,90 Z" />
            <path d="M10,50 C25,55 25,45 10,50 Z" />
            <path d="M90,50 C75,55 75,45 90,50 Z" />
            <path d="M22,22 C32,32 30,30 22,22 Z" />
            <path d="M78,78 C68,68 70,70 78,78 Z" />
            <path d="M22,78 C32,68 30,70 22,78 Z" />
            <path d="M78,22 C68,32 70,30 78,22 Z" />
            <circle cx="50" cy="50" r="5" className="text-theme-accent" />
          </svg>
        </div>

        {/* Beautiful Ending Wording */}
        <div className="space-y-4">
          <span className="font-heading text-[10px] tracking-[0.3em] text-theme-primary uppercase font-bold block">
            With Love
          </span>
          <h2 className="font-names text-5xl md:text-6xl text-theme-text tracking-wide my-4">
            {brideName} &amp; {groomName}
          </h2>
          <p className="font-body text-xs text-theme-text-muted">
            The Sharma &amp; Raichand Families
          </p>
        </div>

        <div className="w-24 h-[1px] bg-theme-primary/30 mx-auto" />

        {/* Thank You & See You Soon */}
        <div className="space-y-2">
          <h3 className="font-heading text-lg md:text-xl text-theme-text tracking-widest uppercase font-bold">
            Thank You
          </h3>
          <p className="font-heading text-[10px] tracking-[0.2em] text-theme-accent uppercase font-bold">
            See You Soon
          </p>
        </div>

        {/* Wedding Coordinators Contact section */}
        <div className="space-y-4 max-w-md pt-4">
          <span className="font-heading text-[9px] tracking-widest text-theme-accent uppercase font-bold block">
            Wedding Coordinators
          </span>
          <p className="font-body text-xs text-theme-text-muted leading-relaxed">
            {contact.message}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 pt-2">
            {contact.coordinators.map((coordinator, idx) => (
              <div key={idx} className="text-center font-body text-xs">
                <p className="text-theme-text font-semibold">{coordinator.name}</p>
                <a
                  href={`tel:${coordinator.phone.replace(/\s+/g, '')}`}
                  className="text-theme-primary hover:text-theme-accent hover:underline transition-colors mt-0.5 block"
                >
                  {coordinator.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Social / Instagram Hashtag block */}
        <div className="flex flex-col items-center space-y-3 pt-4">
          <span className="font-heading text-[9px] tracking-widest text-theme-accent uppercase font-bold">
            Share the Memories
          </span>
          <a
            href={socialLinks.hashtagLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-theme-primary hover:text-theme-accent transition-colors cursor-pointer group"
          >
            <FaInstagram size={16} className="group-hover:scale-110 transition-transform duration-300" />
            <span className="font-heading text-xs tracking-wider uppercase font-semibold">
              {socialLinks.instagramHashtag}
            </span>
          </a>
        </div>

        {/* Bottom copyright line */}
        <div className="w-full border-t border-theme-border/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-body text-theme-text-muted uppercase tracking-widest max-w-4xl">
          <div>
            &copy; {currentYear} {brideName} &amp; {groomName}. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1">
            Made with <span className="text-theme-primary animate-pulse">❤️</span> for future memories
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
