import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export const Envelope = ({ monogram, onOpenComplete }) => {
  const [stage, setStage] = useState('initial'); // 'initial' | 'cracking' | 'openingFlap' | 'slidingCard' | 'unfolding' | 'complete'
  
  // Parallax 3D tilt coordinates
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (stage === 'cracking') {
      const tl = gsap.timeline();
      
      tl.to('.wax-part-1', { x: -80, y: -75, rotation: -45, opacity: 0, duration: 1.2, ease: 'power3.out' })
        .to('.wax-part-2', { x: 80, y: -75, rotation: 45, opacity: 0, duration: 1.2, ease: 'power3.out' }, 0)
        .to('.wax-part-3', { x: 0, y: 105, rotation: 25, opacity: 0, duration: 1.2, ease: 'power3.out' }, 0)
        .to('.wax-text', { opacity: 0, scale: 0.6, duration: 0.5 }, 0)
        .to('.wax-glare', { opacity: 0, duration: 0.4 }, 0)
        .to('.wax-droplet', { opacity: 0, scale: 0, y: 30, stagger: 0.05, duration: 0.6 }, 0);

      setTimeout(() => {
        setStage('openingFlap');
      }, 950);
    } else if (stage === 'openingFlap') {
      setTimeout(() => {
        setStage('slidingCard');
      }, 1000);
    } else if (stage === 'slidingCard') {
      setTimeout(() => {
        setStage('unfolding');
      }, 1900);
    } else if (stage === 'unfolding') {
      setTimeout(() => {
        setStage('complete');
        if (onOpenComplete) {
          onOpenComplete();
        }
      }, 2100);
    }
  }, [stage, onOpenComplete]);

  const handleWaxSealClick = () => {
    if (stage !== 'initial') return;
    
    // Wobble/Vibrate seal before cracking
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

  const handleMouseMove = (e) => {
    if (stage !== 'initial') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: x * 7, y: -y * 7 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="fixed inset-0 bg-[#FFFDFB] z-[99999] flex flex-col items-center justify-center overflow-hidden p-4 select-none perspective-1200">
      
      {/* 1. BACKGROUND LIGHTING & Spotlights */}
      {/* Soft spotlight radial lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,200,200,0.15)_0%,rgba(107,74,74,0.05)_100%)] pointer-events-none z-0" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] z-0 pointer-events-none" />

      {/* Warm diagonal light from top-right */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/40 pointer-events-none z-1" />

      {/* 2. CORNER FLORAL COMPOSITIONS (Inspired by reference photo) */}
      {/* Top Left corner: Blush pink roses, baby's breath, green leaves */}
      <div className="absolute top-0 left-0 w-44 h-44 md:w-56 md:h-56 filter blur-[2.5px] opacity-85 z-0 pointer-events-none select-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-theme-primary">
          {/* Green leaf shapes */}
          <path d="M40,40 Q80,20 60,80 Q20,60 40,40 Z" fill="#607A66" opacity="0.35" />
          <path d="M10,80 Q40,60 30,100 Q0,90 10,80 Z" fill="#607A66" opacity="0.25" />
          {/* Baby's breath little white dots */}
          <circle cx="85" cy="55" r="4" fill="#FFFFFF" opacity="0.9" />
          <circle cx="95" cy="65" r="3.5" fill="#FFFFFF" opacity="0.8" />
          <circle cx="105" cy="45" r="3" fill="#FFFFFF" opacity="0.75" />
          {/* Blush pink roses (nested circles with organic curves) */}
          <circle cx="45" cy="45" r="32" fill="#F4D2D2" />
          <circle cx="40" cy="50" r="24" fill="#E9C4C4" />
          <circle cx="35" cy="55" r="14" fill="#D59A9A" />
          <path d="M45,45 C50,25 35,25 45,45 Z" fill="#B76E79" opacity="0.4" />
        </svg>
      </div>

      {/* Top Right corner: Roses, hanging floral branches, light bokeh */}
      <div className="absolute top-0 right-0 w-44 h-44 md:w-56 md:h-56 filter blur-[3px] opacity-80 z-0 pointer-events-none select-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-theme-primary">
          {/* Hanging leaves */}
          <path d="M160,30 Q120,40 140,90" stroke="#607A66" strokeWidth="2" fill="none" opacity="0.3" />
          <path d="M140,60 Q110,65 125,80 Q140,80 140,60 Z" fill="#607A66" opacity="0.3" />
          {/* Blush Rose */}
          <circle cx="160" cy="45" r="28" fill="#F4D2D2" />
          <circle cx="165" cy="40" r="20" fill="#E9C4C4" />
          <circle cx="170" cy="35" r="12" fill="#D59A9A" />
          {/* Bokeh lights */}
          <circle cx="100" cy="80" r="10" fill="#FFEAEB" opacity="0.4" />
          <circle cx="120" cy="110" r="6" fill="#FFF2F3" opacity="0.5" />
        </svg>
      </div>

      {/* Bottom Left corner: Rose bouquet & petals */}
      <div className="absolute bottom-0 left-0 w-48 h-48 md:w-60 md:h-60 filter blur-[3.5px] opacity-85 z-0 pointer-events-none select-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-theme-primary">
          <path d="M30,160 Q80,180 50,130" stroke="#607A66" strokeWidth="2" fill="none" opacity="0.35" />
          {/* Large rose bouquet */}
          <circle cx="45" cy="155" r="34" fill="#F4D2D2" />
          <circle cx="50" cy="150" r="25" fill="#E9C4C4" />
          <circle cx="55" cy="145" r="15" fill="#D59A9A" />
          {/* Floating petals */}
          <path d="M90,140 Q110,130 100,150 Z" fill="#E8C8C8" opacity="0.7" />
          <path d="M115,160 Q130,170 120,180 Z" fill="#B76E79" opacity="0.6" />
        </svg>
      </div>

      {/* Bottom Right corner: Small floral arrangement & floating petals */}
      <div className="absolute bottom-0 right-0 w-44 h-44 md:w-56 md:h-56 filter blur-[2px] opacity-80 z-0 pointer-events-none select-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-theme-primary">
          {/* Small rose */}
          <circle cx="160" cy="160" r="26" fill="#F4D2D2" />
          <circle cx="155" cy="165" r="18" fill="#E9C4C4" />
          <circle cx="150" cy="170" r="10" fill="#D59A9A" />
          {/* Leaves */}
          <path d="M120,170 Q140,140 150,160" stroke="#607A66" strokeWidth="1.5" fill="none" opacity="0.3" />
        </svg>
      </div>

      {/* 3. CENTERED LUXURY ENVELOPE (Reduced size by 10% for layout breathing room) */}
      <div className="flex flex-col items-center justify-center space-y-12 relative z-10 w-full max-w-[310px] md:max-w-[370px]">
        
        {/* Above Envelope Title */}
        <div className="text-center tracking-[0.4em] text-theme-text/80 text-[10px] font-heading font-semibold uppercase pointer-events-none">
          Wedding Invitation
        </div>

        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={
            stage === 'initial'
              ? {
                  rotateY: tilt.x,
                  rotateX: tilt.y,
                  scale: [1, 1.015, 1],
                  boxShadow: '0 25px 65px -25px rgba(107, 74, 74, 0.22)',
                }
              : stage === 'complete'
              ? { scale: 1.06, rotateY: 0, rotateX: 0, opacity: 0 }
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
          className="relative w-full aspect-[4/3] flex items-center justify-center preserve-3d cursor-pointer select-none"
        >
          {/* Envelope Shell */}
          <div className="absolute inset-0 preserve-3d">
            
            {/* Backplate */}
            <div className="absolute inset-0 bg-[#E5D2CE] border border-theme-border/40 rounded-2xl shadow-[inset_0_0_20px_rgba(107,74,74,0.08)] z-0 outline outline-1 outline-white/10" />

            {/* THE FOLDED INVITATION CARD */}
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
              {/* Stationery folded Card body */}
              <div className="w-full h-full bg-[#FFFDFB] border border-theme-border/30 rounded-xl shadow-2xl p-6 relative overflow-hidden flex flex-col items-center justify-between text-center select-none gold-foil-border">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_100%)] pointer-events-none z-1" />

                {/* Embossed Card Cover */}
                <AnimatePresence>
                  {(stage === 'slidingCard' || stage === 'openingFlap' || stage === 'initial') && (
                    <motion.div
                      exit={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
                      transition={{ duration: 0.7 }}
                      className="absolute inset-0 bg-[#FFFDFB] rounded-xl flex flex-col items-center justify-center p-6 border border-theme-border/20 z-30 shadow-[inset_0_0_15px_rgba(107,74,74,0.03)]"
                    >
                      <div className="absolute top-2 left-2 w-12 h-12 text-[#6B4A4A]/5 filter drop-shadow-[0.5px_0.5px_0px_white] drop-shadow-[-0.5px_-0.5px_0px_rgba(0,0,0,0.08)] pointer-events-none">
                        <svg viewBox="0 0 100 100" fill="currentColor">
                          <path d="M10,10 Q50,0 50,50 Q0,50 10,10" />
                        </svg>
                      </div>

                      <span className="font-heading text-[9px] tracking-[0.3em] text-theme-primary uppercase font-semibold">
                        Wedding Invitation
                      </span>
                      <div className="w-6 h-[1px] bg-theme-primary/30 my-3" />
                      <h2 className="font-names text-4xl text-theme-text mt-1 select-none">Khushi &amp; Ramlal</h2>
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
                    <h3 className="font-names text-4xl text-theme-text">Khushi</h3>
                    <span className="font-names text-xl text-theme-primary block">&amp;</span>
                    <h3 className="font-names text-4xl text-theme-text">Ramlal</h3>
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

            {/* FRONT ENVELOPE COLLARS (V-folds overlays) */}
            <div className="absolute inset-0 bg-[#E8D9D5] rounded-2xl border border-theme-border/25 z-10 opacity-95 shadow-[0_5px_15px_rgba(107,74,74,0.12)] pointer-events-none">
              <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-theme-card/10 to-transparent [clip-path:polygon(0_0,100%_50%,0_100%)] border-r border-[#DEC9C4] shadow-md" />
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-theme-card/10 to-transparent [clip-path:polygon(100%_0,0_50%,100%_100%)] border-l border-[#DEC9C4] shadow-md" />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-theme-card/15 to-transparent [clip-path:polygon(0_100%,50%_0,100%_100%)] border-t border-[#DECBBF]" />
            </div>

            {/* TOP HINGED ENVELOPE FLAP */}
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
                <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_5px_10px_rgba(107,74,74,0.36)]">
                  <defs>
                    <radialGradient id="waxGlare" cx="30%" cy="30%" r="45%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
                      <stop offset="70%" stopColor="#B76E79" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#B76E79" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Organic melted outlines */}
                  <circle cx="50" cy="50" r="41" fill="#803D47" className="wax-text" opacity="0.15" />
                  <path d="M12,48 C10,40 18,35 22,40 C28,45 15,55 12,48 Z" fill="#9D545F" className="wax-droplet" />
                  <path d="M85,55 C88,48 78,42 75,48 C72,55 82,60 85,55 Z" fill="#9D545F" className="wax-droplet" />
                  <path d="M52,86 C45,88 48,78 52,78 C56,78 60,84 52,86 Z" fill="#9D545F" className="wax-droplet" />

                  {/* Wax cracks paths */}
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

                  {/* Stamp stamp lines */}
                  <circle cx="50" cy="50" r="32" fill="none" stroke="#A95E6B" strokeWidth="2.5" className="wax-text" opacity="0.5" />

                  {/* Stamped Y&R monogram inside */}
                  <text
                    x="50"
                    y="58"
                    fontFamily="'Cinzel', serif"
                    fontSize="21"
                    fontWeight="bold"
                    fill="#F5E6B3"
                    textAnchor="middle"
                    className="wax-text font-bold"
                    style={{
                      textShadow: '1.2px 1.2px 1px rgba(0,0,0,0.55), -0.6px -0.6px 0.5px rgba(255,255,255,0.45)',
                    }}
                    opacity="0.9"
                  >
                    Y&amp;R
                  </text>

                  {/* Glare reflect */}
                  <circle cx="50" cy="50" r="36" fill="url(#waxGlare)" className="wax-glare pointer-events-none" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Below Envelope Typography layout (Yogendra ♡ Ritika) */}
        {stage === 'initial' && (
          <div className="w-full text-center flex flex-col items-center space-y-6 pt-4 pointer-events-none">
            {/* Couple names calligraphy with gold foil gradient */}
            <h2 className="font-names text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5E6B3] to-[#D4AF37] drop-shadow-[0_1px_3px_rgba(107,74,74,0.18)] font-bold">
              Ramlal <span className="font-body text-xl text-theme-primary opacity-85 px-1 font-normal">♡</span>Khushi
            </h2>

            {/* Instruction prompts with elegant typography */}
            <div className="space-y-1.5 pt-2">
              <span className="font-heading text-[10px] tracking-[0.25em] text-theme-text uppercase font-bold block">
                Tap the Wax Seal
              </span>
              <span className="font-body text-[10px] text-theme-text-muted lowercase tracking-widest block">
                to open your invitation
              </span>
            </div>

            {/* Bouncing Hand pointer indicator */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className="text-theme-primary text-xl pt-2"
            >
              👆
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Envelope;
