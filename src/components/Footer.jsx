import React from 'react';
import { FaInstagram, FaLinkedinIn, FaGithub, FaGlobe, FaWhatsapp } from 'react-icons/fa';
import { HiOutlinePhone } from 'react-icons/hi';

export const Footer = ({ brideName, groomName, contact, socialLinks, monogram }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#FFF8F5] border-t border-theme-border/20 py-24 px-4 md:px-8 select-none relative overflow-hidden text-center">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(232,200,200,0.03)_0%,transparent_75%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-16 relative z-10">
        
        {/* SECTION 1: INVITATION WRAP-UP */}
        <div className="space-y-6">
          {monogram && (
            <div className="w-16 h-16 opacity-40 hover:opacity-80 transition-opacity duration-300 mx-auto">
              <img src={monogram} alt="Monogram" className="w-full h-full object-contain" />
            </div>
          )}
          <div className="space-y-3">
            <span className="font-heading text-[10px] tracking-[0.3em] text-theme-primary uppercase font-bold block">
              With Love
            </span>
            <h2 className="font-names text-4xl md:text-5xl text-theme-text tracking-wide">
              {brideName} &amp; {groomName}
            </h2>
            <p className="font-body text-[10px] text-theme-text-muted">
              The Sharma &amp; Raichand Families
            </p>
          </div>
          <div className="pt-2">
            <h3 className="font-heading text-lg text-theme-text tracking-widest uppercase font-bold">
              Thank You
            </h3>
            <p className="font-heading text-[9px] tracking-[0.2em] text-theme-accent uppercase font-bold mt-1">
              See You Soon
            </p>
          </div>
        </div>

        {/* SECTION 2: PREMIUM DESIGNER CARD (VISITING CARD LOOK) */}
        <div className="w-full max-w-sm px-4">
          <div className="stationery-card rounded-2xl p-6 md:p-8 shadow-2xl relative border border-theme-border bg-theme-card/90 backdrop-blur-md flex flex-col items-center justify-between text-left space-y-6">
            {/* Inner frame */}
            <div className="absolute inset-0 border border-theme-primary/15 m-2.5 rounded-xl pointer-events-none" />

            <div className="w-full text-center space-y-1 border-b border-theme-border/20 pb-4">
              <span className="font-heading text-[8px] tracking-[0.3em] text-theme-accent uppercase font-bold block">
                ✨ Crafted with Love by
              </span>
              <h3 className="font-heading text-2xl font-bold text-theme-text tracking-widest uppercase mt-2">
                DIPESH
              </h3>
              <p className="font-body text-[9px] text-theme-text-muted leading-relaxed uppercase tracking-wider">
                Luxury Wedding Invitation Designer &amp; Developer
              </p>
            </div>

            {/* Middle part: Contact info & QR Code grid */}
            <div className="flex w-full items-center justify-between gap-6 py-2">
              <div className="space-y-4 font-body text-xs text-theme-text">
                <div className="space-y-0.5">
                  <span className="font-heading text-[8px] text-theme-accent tracking-widest uppercase font-bold block">
                    Phone
                  </span>
                  <a href="tel:+917742111581" className="font-semibold text-theme-text hover:text-theme-primary block select-all">
                    📞 +91 7742111581
                  </a>
                </div>

                <div className="space-y-0.5">
                  <span className="font-heading text-[8px] text-theme-accent tracking-widest uppercase font-bold block">
                    WhatsApp
                  </span>
                  <a href="https://wa.me/917742111581" target="_blank" rel="noopener noreferrer" className="font-semibold text-theme-text hover:text-theme-primary block select-all">
                    💬 +91 7742111581
                  </a>
                </div>
              </div>

              {/* Mini WhatsApp QR Code SVG */}
              <div className="relative w-24 h-24 p-2 bg-[#FFF8F5] border border-theme-border/40 rounded-lg flex items-center justify-center shadow-md">
                <svg viewBox="0 0 100 100" className="w-full h-full text-theme-primary opacity-80" fill="currentColor">
                  {/* Fake QR blocks matching gold style */}
                  <rect x="5" y="5" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" />
                  <rect x="10" y="10" width="12" height="12" />
                  <rect x="73" y="5" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" />
                  <rect x="78" y="10" width="12" height="12" />
                  <rect x="5" y="73" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" />
                  <rect x="10" y="78" width="12" height="12" />
                  <rect x="36" y="8" width="6" height="12" />
                  <rect x="48" y="5" width="12" height="6" />
                  <rect x="36" y="24" width="24" height="6" />
                  <rect x="5" y="38" width="12" height="24" />
                  <rect x="25" y="44" width="16" height="6" />
                  <rect x="73" y="36" width="12" height="12" />
                  <rect x="90" y="36" width="5" height="24" />
                  <rect x="42" y="42" width="16" height="16" />
                  <rect x="36" y="73" width="6" height="22" />
                  <rect x="48" y="78" width="12" height="12" />
                  <rect x="73" y="73" width="22" height="6" />
                  <rect x="78" y="84" width="12" height="11" />
                </svg>
              </div>
            </div>

            <div className="w-full border-t border-theme-border/20 pt-4 text-center font-body text-[9px] text-theme-text-muted uppercase tracking-wider">
              Scan QR to discuss your wedding invitation
            </div>
          </div>
        </div>

        {/* SECTION 3: CALL TO ACTION */}
        <div className="space-y-6 max-w-lg px-4">
          <div className="space-y-2">
            <h4 className="font-heading text-sm text-theme-accent uppercase tracking-widest font-bold">
              Love this invitation experience?
            </h4>
            <p className="font-body text-xs text-theme-text-muted leading-relaxed max-w-sm mx-auto">
              If you'd like a personalized luxury wedding invitation website for your wedding, I'd be happy to create one.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <a
              href="https://wa.me/917742111581"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 py-3 px-8 rounded font-heading text-[9px] tracking-widest uppercase border border-theme-primary/30 text-theme-primary bg-transparent cursor-pointer hover:border-theme-primary hover:bg-theme-primary hover:text-theme-bg shadow-sm transition-all duration-300"
            >
              <FaWhatsapp size={12} />
              <span>Contact on WhatsApp</span>
            </a>
            <a
              href="tel:+917742111581"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 py-3 px-8 rounded font-heading text-[9px] tracking-widest uppercase bg-theme-primary text-theme-bg cursor-pointer hover:bg-theme-accent shadow-md transition-all duration-300"
            >
              <HiOutlinePhone size={12} />
              <span>Call Now</span>
            </a>
          </div>
        </div>

        {/* SECTION 4: PREMIUM SOCIAL ICONS ONLY */}
        <div className="flex items-center justify-center space-x-8 pt-4">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-theme-text-muted hover:text-theme-primary hover:scale-115 transition-all duration-300"
            aria-label="Instagram"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-theme-text-muted hover:text-theme-primary hover:scale-115 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={18} />
          </a>
          <a
            href="https://github.com/dipeshjaengir"
            target="_blank"
            rel="noopener noreferrer"
            className="text-theme-text-muted hover:text-theme-primary hover:scale-115 transition-all duration-300"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://github.com/dipeshjaengir"
            target="_blank"
            rel="noopener noreferrer"
            className="text-theme-text-muted hover:text-theme-primary hover:scale-115 transition-all duration-300"
            aria-label="Portfolio"
          >
            <FaGlobe size={18} />
          </a>
        </div>

        {/* SECTION 5: MINIMALIST DESIGNER FOOTER */}
        <div className="w-full border-t border-theme-border/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-body text-theme-text-muted uppercase tracking-widest max-w-4xl">
          <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:space-x-1.5">
            <span>Crafted with ❤️ by</span>
            <span className="text-theme-text font-bold">DIPESH</span>
            <span className="hidden sm:inline">|</span>
            <span>Luxury Wedding Invitation Designer</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
            <a href="tel:+917742111581" className="hover:text-theme-primary">
              📞 +91 7742111581
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="https://wa.me/917742111581" target="_blank" rel="noopener noreferrer" className="hover:text-theme-primary">
              WhatsApp: +91 7742111581
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
