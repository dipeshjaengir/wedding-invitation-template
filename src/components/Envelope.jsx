import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export const Envelope = ({ monogram, onOpenComplete }) => {
  const [stage, setStage] = useState('initial'); // 'initial' | 'cracking' | 'openingFlap' | 'slidingCard' | 'unfolding' | 'complete'

  useEffect(() => {
    // Stage controller triggers
    if (stage === 'cracking') {
      // 1. Crack wax seal (GSAP animation runs on SVG paths)
      const tl = gsap.timeline();
      
      tl.to('.wax-part-1', { x: -60, y: -65, rotation: -35, opacity: 0, duration: 0.8, ease: 'power2.out' })
        .to('.wax-part-2', { x: 60, y: -65, rotation: 35, opacity: 0, duration: 0.8, ease: 'power2.out' }, 0)
        .to('.wax-part-3', { x: 0, y: 80, rotation: 15, opacity: 0, duration: 0.8, ease: 'power2.out' }, 0)
        .to('.wax-text', { opacity: 0, scale: 0.8, duration: 0.3 }, 0);

      // 2. Advance to open flap
      setTimeout(() => {
        setStage('openingFlap');
      }, 850);
    } else if (stage === 'openingFlap') {
      // Wait for flap opening animation (1s) then start sliding card
      setTimeout(() => {
        setStage('slidingCard');
      }, 1050);
    } else if (stage === 'slidingCard') {
      // Wait for card slide-up (1.2s) then pause and transition to unfold stage
      setTimeout(() => {
        setStage('unfolding');
      }, 1800);
    } else if (stage === 'unfolding') {
      // Wait for unfolding stages (1.5s) then call parent completion
      setTimeout(() => {
        setStage('complete');
        if (onOpenComplete) {
          onOpenComplete();
        }
      }, 2000);
    }
  }, [stage, onOpenComplete]);

  const handleWaxSealClick = () => {
    if (stage !== 'initial') return;
    setStage('cracking');
  };

  return (
    <div className="fixed inset-0 bg-theme-bg z-[9999] flex items-center justify-center overflow-hidden p-4 select-none perspective-1200">
      {/* Cinematic Spotlight Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,200,200,0.15)_0%,transparent_75%)] pointer-events-none" />
      <div className="spotlight-overlay" />

      {/* Main Zoom Container */}
      <motion.div
        animate={{
          scale: stage === 'initial' ? 0.93 : stage === 'complete' ? 1.05 : 0.98,
          y: stage === 'slidingCard' ? 50 : 0,
        }}
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[340px] md:max-w-[400px] aspect-[4/3] flex items-center justify-center preserve-3d"
      >
        {/* ENVELOPE CONTAINER */}
        <div className="absolute inset-0 preserve-3d">
          {/* Back of Envelope (Inside pocket backdrop) */}
          <div className="absolute inset-0 bg-[#E5D2CE] border border-theme-border/30 rounded-xl shadow-inner z-0" />

          {/* THE INVITATION CARD (Sits inside pocket, slides out) */}
          <motion.div
            initial={{ y: 0, scale: 0.95 }}
            animate={{
              y: stage === 'initial' || stage === 'cracking' ? 0 : stage === 'openingFlap' ? 0 : -180,
              scale: stage === 'unfolding' || stage === 'complete' ? 1.08 : 0.98,
              zIndex: stage === 'initial' || stage === 'openingFlap' ? 5 : 20,
            }}
            transition={{
              y: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
            }}
            className="absolute left-6 right-6 top-6 bottom-6 preserve-3d cursor-pointer"
          >
            {/* The actual stationery card body */}
            <div className="w-full h-full stationery-card rounded-xl gold-foil-border flex flex-col items-center justify-center p-4 text-center">
              {/* Card Folded State Panels overlaying */}
              <AnimatePresence>
                {(stage === 'slidingCard' || stage === 'openingFlap' || stage === 'initial') && (
                  <motion.div
                    exit={{ opacity: 0, scale: 0.95, filter: 'blur(3px)' }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-[#FFFDFB] rounded-xl flex flex-col items-center justify-center p-6 border border-theme-border/30 z-30"
                  >
                    <span className="font-heading text-[10px] tracking-[0.25em] text-theme-primary uppercase">
                      Wedding Invitation
                    </span>
                    <div className="w-8 h-[1px] bg-theme-primary/45 my-2" />
                    <h2 className="font-names text-4xl text-theme-text mt-2">Anushka &amp; Virat</h2>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Unfolded Inner Card Content (Revealed in multi-stages) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: stage === 'unfolding' || stage === 'complete' ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full flex flex-col justify-between py-6 px-4"
              >
                {/* 3D Top flap swing animation */}
                <motion.div
                  initial={{ rotateX: -90, transformOrigin: 'top' }}
                  animate={{ rotateX: stage === 'unfolding' || stage === 'complete' ? 0 : -90 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="space-y-2 backface-hidden"
                >
                  <span className="font-heading text-[8px] tracking-[0.3em] text-theme-accent uppercase font-bold block">
                    || Om Shri Ganeshaya Namah ||
                  </span>
                  <p className="font-body text-[9px] text-theme-text-muted italic">
                    With the divine blessings of Lord Ganesha, we invite you to share our joy.
                  </p>
                </motion.div>

                {/* Center Names */}
                <div className="my-3 space-y-1">
                  <h3 className="font-names text-4xl md:text-5xl text-theme-text tracking-wider">
                    Aanya
                  </h3>
                  <span className="font-names text-2xl text-theme-primary block my-1">&amp;</span>
                  <h3 className="font-names text-4xl md:text-5xl text-theme-text tracking-wider">
                    Kabir
                  </h3>
                </div>

                {/* 3D Bottom flap swing animation */}
                <motion.div
                  initial={{ rotateX: 90, transformOrigin: 'bottom' }}
                  animate={{ rotateX: stage === 'unfolding' || stage === 'complete' ? 0 : 90 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="space-y-3 backface-hidden"
                >
                  <p className="font-heading text-[10px] tracking-widest text-theme-text uppercase font-semibold">
                    Taj Palace, New Delhi
                  </p>
                  <div className="w-12 h-[1px] bg-theme-primary/30 mx-auto" />
                  <span className="font-heading text-[8px] tracking-[0.25em] text-theme-accent uppercase block font-bold animate-pulse">
                    Scroll To See Magic
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* FRONT FLAPS OF ENVELOPE (Placed on top of inside back/pocket layers) */}
          <div className="absolute inset-0 bg-[#E8D9D5] rounded-xl border border-theme-border/20 z-10 opacity-90 shadow-2xl pointer-events-none">
            {/* Left side triangle fold */}
            <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-theme-card/10 to-transparent [clip-path:polygon(0_0,100%_50%,0_100%)] border-r border-theme-border/10" />
            {/* Right side triangle fold */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-theme-card/10 to-transparent [clip-path:polygon(100%_0,0_50%,100%_100%)] border-l border-theme-border/10" />
            {/* Bottom triangle fold */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-theme-card/15 to-transparent [clip-path:polygon(0_100%,50%_0,100%_100%)] border-t border-theme-border/15" />
          </div>

          {/* TOP HINGED FLAP (Rotates upwards to open) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{
              rotateX: stage === 'initial' || stage === 'cracking' ? 0 : -180,
              zIndex: stage === 'initial' || stage === 'cracking' ? 30 : 2,
            }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute left-0 right-0 top-0 h-1/2 bg-[#EADED9] origin-top-hinge preserve-3d rounded-t-xl [clip-path:polygon(0_0,100%_0,50%_100%)] border-b border-[#D8C7C2] shadow-[0_4px_10px_rgba(107,74,74,0.05)] cursor-pointer"
          />

          {/* WAX SEAL (Centered absolute, breaks on tap) */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center">
            <button
              onClick={handleWaxSealClick}
              disabled={stage !== 'initial'}
              className="relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
              aria-label="Break Wax Seal"
            >
              {/* Wax Seal SVG containing separate breakable paths */}
              <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_2px_6px_rgba(107,74,74,0.3)]">
                {/* Part 1 (Left piece) */}
                <path
                  d="M50,15 C30,15 15,30 15,50 C15,58 19,65 25,70 L50,50 Z"
                  fill="#B76E79"
                  className="wax-part-1 origin-center"
                />
                {/* Part 2 (Right piece) */}
                <path
                  d="M50,15 L50,50 L75,70 C81,65 85,58 85,50 C85,30 70,15 50,15 Z"
                  fill="#B76E79"
                  className="wax-part-2 origin-center"
                />
                {/* Part 3 (Bottom piece) */}
                <path
                  d="M25,70 L50,50 L75,70 C68,80 59,85 50,85 C41,85 32,80 25,70 Z"
                  fill="#B76E79"
                  className="wax-part-3 origin-center"
                />
                {/* Monogram stamp detail on top */}
                <text
                  x="50"
                  y="58"
                  fontFamily="'Cinzel', serif"
                  fontSize="22"
                  fontWeight="bold"
                  fill="#D4AF37"
                  textAnchor="middle"
                  className="wax-text select-none font-bold"
                  opacity="0.9"
                >
                  A&amp;K
                </text>
              </svg>

              {/* Tap Indicator text */}
              {stage === 'initial' && (
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-32 text-center text-[10px] font-heading tracking-widest text-theme-primary uppercase font-bold"
                >
                  Tap To Reveal
                </motion.div>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Envelope;
