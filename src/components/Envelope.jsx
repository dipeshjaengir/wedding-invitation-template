import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export const Envelope = ({ monogram, onOpenComplete }) => {
  const [stage, setStage] = useState('initial'); // 'initial' | 'cracking' | 'openingFlap' | 'slidingCard' | 'unfolding' | 'complete'
  
  // Parallax 3D tilt coordinates
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (stage === 'cracking') {
      // 1. Crack wax seal (GSAP animation on SVG paths)
      const tl = gsap.timeline();
      
      tl.to('.wax-part-1', { x: -80, y: -75, rotation: -45, opacity: 0, duration: 1.2, ease: 'power3.out' })
        .to('.wax-part-2', { x: 80, y: -75, rotation: 45, opacity: 0, duration: 1.2, ease: 'power3.out' }, 0)
        .to('.wax-part-3', { x: 0, y: 105, rotation: 25, opacity: 0, duration: 1.2, ease: 'power3.out' }, 0)
        .to('.wax-text', { opacity: 0, scale: 0.6, duration: 0.5 }, 0)
        .to('.wax-glare', { opacity: 0, duration: 0.4 }, 0)
        .to('.wax-droplet', { opacity: 0, scale: 0, y: 30, stagger: 0.05, duration: 0.6 }, 0);

      // 2. Advance stages sequentially with cinematic overlap
      setTimeout(() => {
        setStage('openingFlap');
      }, 900); // 900ms overlap
    } else if (stage === 'openingFlap') {
      setTimeout(() => {
        setStage('slidingCard');
      }, 1000);
    } else if (stage === 'slidingCard') {
      setTimeout(() => {
        setStage('unfolding');
      }, 1800);
    } else if (stage === 'unfolding') {
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
    
    // Wobble/Vibrate animation before cracking to add weight
    gsap.timeline({
      onComplete: () => {
        setStage('cracking');
      }
    })
    .to('.wax-seal-btn', { x: -4, rotation: -6, duration: 0.08, ease: 'power1.inOut' })
    .to('.wax-seal-btn', { x: 4, rotation: 6, duration: 0.08, ease: 'power1.inOut' })
    .to('.wax-seal-btn', { x: -3, rotation: -4, duration: 0.08, ease: 'power1.inOut' })
    .to('.wax-seal-btn', { x: 3, rotation: 4, duration: 0.08, ease: 'power1.inOut' })
    .to('.wax-seal-btn', { x: 0, rotation: 0, duration: 0.08, ease: 'power1.inOut' });
  };

  // Parallax tracking handler
  const handleMouseMove = (e) => {
    if (stage !== 'initial') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2); // -1 to 1
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2); // -1 to 1
    setTilt({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="fixed inset-0 bg-[#FFFDFB] z-[99999] flex items-center justify-center overflow-hidden p-4 select-none perspective-1200">
      
      {/* BACKGROUND BOKEH & BLURRED FLORAL DECORATIONS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,200,200,0.18)_0%,rgba(107,74,74,0.06)_100%)] pointer-events-none z-0" />
      
      {/* Subtle paper noise texture in background */}
      <div className="absolute inset-0 opacity-[0.035] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] z-0 pointer-events-none" />

      {/* Blurred floral motifs */}
      <div className="absolute -top-16 -left-16 w-64 h-64 md:w-80 md:h-80 bg-[radial-gradient(circle,rgba(232,200,200,0.45)_0%,transparent_70%)] filter blur-2xl opacity-60 z-0 pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 md:w-80 md:h-80 bg-[radial-gradient(circle,rgba(212,175,55,0.25)_0%,transparent_70%)] filter blur-2xl opacity-50 z-0 pointer-events-none" />

      {/* THE TACTILE 3D ENVELOPE (With Parallax Tilt & Breathing) */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={
          stage === 'initial'
            ? {
                rotateY: tilt.x,
                rotateX: tilt.y,
                scale: [1, 1.015, 1], // Breathing loop
                boxShadow: '0 30px 70px -30px rgba(107, 74, 74, 0.25)',
              }
            : stage === 'complete'
            ? { scale: 1.08, rotateY: 0, rotateX: 0, opacity: 0 }
            : { scale: 0.98, rotateY: 0, rotateX: 0 }
        }
        transition={
          stage === 'initial'
            ? {
                scale: { repeat: Infinity, duration: 4.8, ease: 'easeInOut' },
                rotateY: { type: 'spring', damping: 24, stiffness: 120 },
                rotateX: { type: 'spring', damping: 24, stiffness: 120 },
              }
            : { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
        }
        className="relative w-full max-w-[340px] md:max-w-[420px] aspect-[4/3] flex items-center justify-center preserve-3d cursor-pointer select-none"
      >
        {/* Envelope Shell */}
        <div className="absolute inset-0 preserve-3d">
          
          {/* Backplate (Pocket backdrop with slight edge thickness) */}
          <div className="absolute inset-0 bg-[#E5D2CE] border border-theme-border/40 rounded-2xl shadow-[inset_0_0_20px_rgba(107,74,74,0.08)] z-0 outline outline-1 outline-white/10" />

          {/* THE FOLDED INVITATION CARD (Slides out & gatefold opens) */}
          <motion.div
            initial={{ y: 0, scale: 0.95 }}
            animate={{
              y: stage === 'initial' || stage === 'cracking' ? 0 : stage === 'openingFlap' ? 0 : -200,
              scale: stage === 'unfolding' || stage === 'complete' ? 1.08 : 0.98,
              zIndex: stage === 'initial' || stage === 'openingFlap' ? 5 : 20,
            }}
            transition={{
              y: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
            }}
            className="absolute left-6 right-6 top-6 bottom-6 preserve-3d"
          >
            {/* Stationery folded Card body with double border and shadows */}
            <div className="w-full h-full bg-[#FFFDFB] border border-theme-border/30 rounded-xl shadow-2xl p-6 relative overflow-hidden flex flex-col items-center justify-between text-center select-none gold-foil-border">
              {/* Subtle inner paper highlight */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_100%)] pointer-events-none z-1" />

              {/* Embossed Card Cover */}
              <AnimatePresence>
                {(stage === 'slidingCard' || stage === 'openingFlap' || stage === 'initial') && (
                  <motion.div
                    exit={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 bg-[#FFFDFB] rounded-xl flex flex-col items-center justify-center p-6 border border-theme-border/20 z-30 shadow-[inset_0_0_15px_rgba(107,74,74,0.03)]"
                  >
                    {/* Emboss floral graphics in corners */}
                    <div className="absolute top-2 left-2 w-12 h-12 text-[#6B4A4A]/5 filter drop-shadow-[0.5px_0.5px_0px_white] drop-shadow-[-0.5px_-0.5px_0px_rgba(0,0,0,0.1)] pointer-events-none">
                      <svg viewBox="0 0 100 100" fill="currentColor">
                        <path d="M10,10 Q50,0 50,50 Q0,50 10,10" />
                      </svg>
                    </div>

                    <span className="font-heading text-[9px] tracking-[0.3em] text-theme-primary uppercase font-semibold">
                      Wedding Invitation
                    </span>
                    <div className="w-6 h-[1px] bg-theme-primary/30 my-3" />
                    <h2 className="font-names text-4xl text-theme-text mt-1 select-none">Aanya &amp; Kabir</h2>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Unfolded Inside Content details */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: stage === 'unfolding' || stage === 'complete' ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full flex flex-col justify-between py-4 px-2"
              >
                {/* Top Flap hinge */}
                <motion.div
                  initial={{ rotateX: -90, transformOrigin: 'top' }}
                  animate={{ rotateX: stage === 'unfolding' || stage === 'complete' ? 0 : -90 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-1.5 backface-hidden"
                >
                  <span className="font-heading text-[8px] tracking-[0.3em] text-theme-accent uppercase font-bold block">
                    || Om Shri Ganeshaya Namah ||
                  </span>
                  <p className="font-body text-[9px] text-theme-text-muted italic max-w-xs mx-auto leading-relaxed">
                    With the divine blessings of Ganesha, we cordially invite you to share our joy.
                  </p>
                </motion.div>

                {/* Center Names */}
                <div className="my-2 space-y-1">
                  <h3 className="font-names text-4xl text-theme-text">Aanya</h3>
                  <span className="font-names text-xl text-theme-primary block">&amp;</span>
                  <h3 className="font-names text-4xl text-theme-text">Kabir</h3>
                </div>

                {/* Bottom Flap hinge */}
                <motion.div
                  initial={{ rotateX: 90, transformOrigin: 'bottom' }}
                  animate={{ rotateX: stage === 'unfolding' || stage === 'complete' ? 0 : 90 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="space-y-2.5 backface-hidden"
                >
                  <p className="font-heading text-[9px] tracking-widest text-theme-text uppercase font-semibold">
                    Taj Palace, New Delhi
                  </p>
                  <div className="w-10 h-[1px] bg-theme-primary/30 mx-auto" />
                  <span className="font-heading text-[8px] tracking-[0.25em] text-theme-accent uppercase block font-bold animate-pulse">
                    Opening Invitation...
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* FRONT ENVELOPE COLLARS (V-folds overlays with edge thickness shadow) */}
          <div className="absolute inset-0 bg-[#E8D9D5] rounded-2xl border border-theme-border/25 z-10 opacity-95 shadow-[0_5px_15px_rgba(107,74,74,0.12)] pointer-events-none">
            {/* Left Collar triangular */}
            <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-theme-card/10 to-transparent [clip-path:polygon(0_0,100%_50%,0_100%)] border-r border-[#DEC9C4] shadow-md" />
            {/* Right Collar triangular */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-theme-card/10 to-transparent [clip-path:polygon(100%_0,0_50%,100%_100%)] border-l border-[#DEC9C4] shadow-md" />
            {/* Bottom Collar triangular */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-theme-card/15 to-transparent [clip-path:polygon(0_100%,50%_0,100%_100%)] border-t border-[#DECBBF]" />
          </div>

          {/* TOP HINGED ENVELOPE FLAP (3D rotateX upward) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{
              rotateX: stage === 'initial' || stage === 'cracking' ? 0 : -170,
              zIndex: stage === 'initial' || stage === 'cracking' ? 30 : 2,
            }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            className="absolute left-0 right-0 top-0 h-1/2 bg-[#EADED9] origin-top-hinge preserve-3d rounded-t-2xl [clip-path:polygon(0_0,100%_0,50%_100%)] border-b border-[#D4C3BE] shadow-[0_3px_8px_rgba(107,74,74,0.06)] cursor-pointer"
          >
            {/* Embossed pattern on top flap */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-8 text-[#6B4A4A]/5 filter drop-shadow-[0.5px_0.5px_0px_white] drop-shadow-[-0.5px_-0.5px_0px_rgba(0,0,0,0.08)]">
              <svg viewBox="0 0 100 50" fill="currentColor">
                <path d="M10,0 Q50,40 90,0 Q50,10 10,0" />
              </svg>
            </div>
          </motion.div>

          {/* DETAILS WRITTEN ON ENVELOPE */}
          {stage === 'initial' && (
            <div className="absolute inset-x-0 bottom-6 z-25 text-center flex flex-col items-center space-y-2 pointer-events-none">
              <span className="font-heading text-[8px] tracking-[0.3em] text-[#8A7070] uppercase font-semibold">
                Wedding Invitation
              </span>
              <div className="flex items-center justify-center space-x-3 w-full">
                <span className="font-names text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5E6B3] to-[#D4AF37] drop-shadow-[0_1px_2px_rgba(107,74,74,0.15)] font-bold">
                  Aanya
                </span>
                <span className="font-names text-lg text-theme-primary font-bold">♡</span>
                <span className="font-names text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5E6B3] to-[#D4AF37] drop-shadow-[0_1px_2px_rgba(107,74,74,0.15)] font-bold">
                  Kabir
                </span>
              </div>
            </div>
          )}

          {/* MOVING LIGHT SWEEP */}
          {stage === 'initial' && (
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-22">
              <div className="absolute top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] sheen-light-ref animate-[shine_4.5s_infinite]" style={{
                animationName: 'goldShine',
                animationTimingFunction: 'ease-in-out'
              }} />
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes goldShine {
                  0% { left: -100%; opacity: 0; }
                  10% { opacity: 1; }
                  35% { left: 200%; opacity: 0; }
                  100% { left: 200%; opacity: 0; }
                }
              `}} />
            </div>
          )}

          {/* REALISTIC 3D WAX SEAL BUTTON */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center">
            <button
              onClick={handleWaxSealClick}
              disabled={stage !== 'initial'}
              className="wax-seal-btn relative w-18 h-18 rounded-full flex items-center justify-center cursor-pointer focus:outline-none select-none active:scale-95 transition-transform"
              aria-label="Crack Wax Seal"
            >
              {/* Organic detailed melted seal */}
              <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_5px_10px_rgba(107,74,74,0.36)]">
                <defs>
                  {/* Wax base specular shine */}
                  <radialGradient id="waxGlare" cx="30%" cy="30%" r="45%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
                    <stop offset="70%" stopColor="#B76E79" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#B76E79" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Random melted droplets backgrounds (Organic edges details) */}
                <circle cx="50" cy="50" r="41" fill="#803D47" className="wax-text" opacity="0.15" />
                <path d="M12,48 C10,40 18,35 22,40 C28,45 15,55 12,48 Z" fill="#9D545F" className="wax-droplet" />
                <path d="M85,55 C88,48 78,42 75,48 C72,55 82,60 85,55 Z" fill="#9D545F" className="wax-droplet" />
                <path d="M52,86 C45,88 48,78 52,78 C56,78 60,84 52,86 Z" fill="#9D545F" className="wax-droplet" />

                {/* Main crackable wax segments */}
                <path
                  d="M50,13 C27,13 11,29 11,50 C11,59 15,67 22,72 L50,50 Z"
                  fill="#9D545F"
                  className="wax-part-1 origin-center"
                />
                <path
                  d="M50,13 L50,50 L78,72 C85,67 89,59 89,50 C89,29 73,13 50,13 Z"
                  fill="#9D545F"
                  className="wax-part-2 origin-center"
                />
                <path
                  d="M22,72 L50,50 L78,72 C71,82 61,89 50,89 C39,89 29,82 22,72 Z"
                  fill="#8A4650"
                  className="wax-part-3 origin-center"
                />

                {/* Embossed stamp stamp lines */}
                <circle cx="50" cy="50" r="32" fill="none" stroke="#A95E6B" strokeWidth="2.5" className="wax-text" opacity="0.5" />

                {/* Monogram letters stamped inside */}
                <text
                  x="50"
                  y="58"
                  fontFamily="'Cinzel', serif"
                  fontSize="24"
                  fontWeight="bold"
                  fill="#F5E6B3"
                  textAnchor="middle"
                  className="wax-text font-bold"
                  style={{
                    textShadow: '1.2px 1.2px 1px rgba(0,0,0,0.55), -0.6px -0.6px 0.5px rgba(255,255,255,0.45)',
                  }}
                  opacity="0.9"
                >
                  A&amp;K
                </text>

                {/* Glare reflect */}
                <circle cx="50" cy="50" r="36" fill="url(#waxGlare)" className="wax-glare pointer-events-none" />
              </svg>

              {/* Bounce finger indicator */}
              {stage === 'initial' && (
                <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-1 w-40 pointer-events-none">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                    className="text-theme-primary text-lg"
                  >
                    👆
                  </motion.div>
                  <span className="font-heading text-[8px] tracking-[0.25em] text-[#8A7070] uppercase font-bold text-center">
                    Tap the Wax Seal <br />
                    <span className="text-[7px] text-theme-primary/80 lowercase">to open your invitation</span>
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Envelope;
