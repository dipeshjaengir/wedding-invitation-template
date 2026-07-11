import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiOutlinePhone } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

export const ContactWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[999] select-none pointer-events-auto">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          /* COLLAPSED STATE (Elegant golden pill) */
          <motion.button
            key="collapsed"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            onClick={() => setIsExpanded(true)}
            className="flex items-center space-x-2 py-2.5 px-4 rounded-full border border-theme-primary/30 text-theme-primary bg-theme-card/90 backdrop-blur-md cursor-pointer hover:border-theme-primary hover:text-theme-accent shadow-lg transition-all duration-300 relative group"
            aria-label="Need a Wedding Website?"
          >
            <div className="absolute inset-0 rounded-full bg-theme-primary/5 group-hover:scale-105 transition-transform" />
            <span className="text-xs">✨</span>
            <span className="font-heading text-[9px] tracking-[0.2em] uppercase font-bold">
              Need a Wedding Website?
            </span>
          </motion.button>
        ) : (
          /* EXPANDED STATE (Glassmorphic Contact Card) */
          <motion.div
            key="expanded"
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            className="stationery-card w-[280px] rounded-xl p-5 shadow-2xl relative border border-theme-border/40 bg-theme-card/95 backdrop-blur-md"
          >
            {/* Inner frame */}
            <div className="absolute inset-0 border border-theme-primary/10 m-1.5 rounded-lg pointer-events-none" />

            {/* Header / Dismiss buttons */}
            <div className="flex justify-between items-center pb-2 border-b border-theme-border/20">
              <span className="font-heading text-[8px] tracking-widest text-theme-accent uppercase font-bold">
                Designed by
              </span>
              <div className="flex items-center space-x-1 z-10">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-theme-text-muted hover:text-theme-primary cursor-pointer p-0.5"
                  title="Collapse"
                >
                  <span className="text-[10px] font-heading tracking-wider uppercase font-semibold">Hide</span>
                </button>
                <span className="text-theme-border/40">|</span>
                <button
                  onClick={() => setIsDismissed(true)}
                  className="text-theme-text-muted hover:text-theme-primary cursor-pointer p-0.5"
                  aria-label="Close permanently"
                >
                  <HiX size={12} />
                </button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="py-4 text-center space-y-1">
              <h4 className="font-heading text-base font-bold text-theme-text tracking-widest uppercase">
                DIPESH
              </h4>
              <p className="font-body text-[9px] text-theme-text-muted leading-relaxed uppercase tracking-wider">
                Luxury Wedding Invitation Designer
              </p>
              <a
                href="tel:+917742111581"
                className="font-body text-[10px] text-theme-primary hover:text-theme-accent font-semibold block pt-1 select-all"
              >
                📞 +91 7742111581
              </a>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href="https://wa.me/917742111581"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded font-heading text-[8px] tracking-widest uppercase border border-theme-primary/30 text-theme-primary bg-transparent cursor-pointer hover:bg-theme-primary hover:text-theme-bg shadow-sm transition-all duration-300"
              >
                <FaWhatsapp size={10} />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+917742111581"
                className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded font-heading text-[8px] tracking-widest uppercase bg-theme-primary text-theme-bg cursor-pointer hover:bg-theme-accent shadow-sm transition-all duration-300"
              >
                <HiOutlinePhone size={10} />
                <span>Call Now</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactWidget;
