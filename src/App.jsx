import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineVolumeOff, HiOutlineVolumeUp } from 'react-icons/hi';

import { weddingData } from './data/weddingData';
import { useTheme } from './hooks/useTheme';
import { useMusic } from './hooks/useMusic';

// Core Components (Non-lazy loaded for instant render)
import ErrorBoundary from './components/ErrorBoundary';
import Envelope from './components/Envelope';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Story from './components/Story';
import Countdown from './components/Countdown';
import Events from './components/Events';

// Heavier Components (Lazy loaded with Suspense fallbacks)
const Venue = React.lazy(() => import('./components/Venue'));
const RSVP = React.lazy(() => import('./components/RSVP'));
const Gift = React.lazy(() => import('./components/Gift'));
const Footer = React.lazy(() => import('./components/Footer'));

// Beautiful Luxury loading fallback for Suspense sections
const ComponentFallback = () => (
  <div className="w-full py-16 flex flex-col items-center justify-center space-y-4">
    <div className="w-6 h-6 rounded-full border-t-2 border-theme-primary animate-spin" />
    <span className="font-heading text-[9px] tracking-widest text-theme-primary/60 uppercase">
      Loading Segment...
    </span>
  </div>
);

export const App = () => {
  const [hasOpened, setHasOpened] = useState(false);
  const canvasRef = useRef(null);

  // Apply CSS theme variables dynamically
  useTheme(weddingData.theme);

  // Background Music controller hook
  const { isPlaying, isMuted, playMusic, toggleMute } = useMusic(weddingData.music.file);

  const handleEnvelopeComplete = () => {
    setHasOpened(true);
    // Play instrumental music immediately on user wax seal interaction unlock
    playMusic();
  };

  // Global Canvas Falling Petals & Sparkles Particle System
  useEffect(() => {
    if (!hasOpened || typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Optimize particle counts for prefers-reduced-motion
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const maxParticles = isReduced ? 10 : 45;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Petal Class (Rose Gold falling leaf)
    class Petal {
      constructor() {
        this.reset();
        // Stagger initial Y heights to avoid burst on mount
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = 6 + Math.random() * 12;
        this.speedY = 0.4 + Math.random() * 0.8;
        this.speedX = -0.3 + Math.random() * 0.6;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.015;
        this.opacity = 0.2 + Math.random() * 0.4;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        // Curve leaf shapes
        ctx.moveTo(0, -this.size / 2);
        ctx.quadraticCurveTo(this.size / 2, -this.size / 2, this.size / 2, 0);
        ctx.quadraticCurveTo(this.size / 2, this.size / 2, 0, this.size / 2);
        ctx.quadraticCurveTo(-this.size / 2, this.size / 2, -this.size / 2, 0);
        ctx.quadraticCurveTo(-this.size / 2, -this.size / 2, 0, -this.size / 2);
        ctx.fillStyle = `rgba(183, 110, 121, ${this.opacity})`; // Theme Rose Gold color
        ctx.fill();
        ctx.restore();
      }
    }

    // Sparkle Class (Upward drifting gold dust)
    class Sparkle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = 1 + Math.random() * 2.5;
        this.speedY = -0.15 - Math.random() * 0.35;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.opacity = 0.1 + Math.random() * 0.55;
        this.fadeSpeed = 0.003 + Math.random() * 0.007;
        this.growing = Math.random() > 0.5;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.growing) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= 0.8) this.growing = false;
        } else {
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0.1) this.growing = true;
        }

        if (this.y < -20 || this.x < -20 || this.x > canvas.width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`; // Gold foil accent
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles / 2; i++) {
      particles.push(new Petal());
      particles.push(new Sparkle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasOpened]);

  return (
    <ErrorBoundary>
      <title>{`${weddingData.bride.name} & ${weddingData.groom.name} Wedding Invitation`}</title>
      <meta name="description" content={`You are cordially invited to celebrate the wedding union of ${weddingData.bride.fullName} and ${weddingData.groom.fullName}.`} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

      {/* Global background paper spotlight */}
      <div className="fixed inset-0 spotlight-overlay z-0" />

      {/* Interactive 3D Envelope Opening experience */}
      <AnimatePresence>
        {!hasOpened && (
          <Envelope monogram={weddingData.monogram} onOpenComplete={handleEnvelopeComplete} />
        )}
      </AnimatePresence>

      {/* Global particle Canvas for falling petals & gold sparkles */}
      {hasOpened && (
        <canvas ref={canvasRef} className="fixed inset-0 z-5 pointer-events-none w-full h-full" />
      )}

      {hasOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="relative min-h-screen bg-transparent text-theme-text overflow-hidden z-10"
        >
          {/* Custom Cursor & Scroll bar depth indicator */}
          <Cursor />
          <ScrollProgress />

          {/* Floating Navbar */}
          <Navbar brideName={weddingData.bride.name} groomName={weddingData.groom.name} />

          {/* Main Unfolded Invitation Card Hero */}
          <Hero
            bride={weddingData.bride}
            groom={weddingData.groom}
            date={weddingData.weddingDate}
            mandapBg={weddingData.mandapBg}
          />

          {/* Story memories timeline Polaroid Deck */}
          <Story storyData={weddingData.story} />

          {/* Interactive scratch-card Save the Date */}
          <Countdown targetDate={weddingData.countdownTarget} />

          {/* Ceremonies itinerary list */}
          <Events eventsData={weddingData.events} />

          {/* Lazy loaded sections */}
          <Suspense fallback={<ComponentFallback />}>
            <Venue venueData={weddingData.venue} />
            <RSVP rsvpData={weddingData.rsvp} />
            <Gift giftData={weddingData.gift} />
            <Footer
              brideName={weddingData.bride.name}
              groomName={weddingData.groom.name}
              contact={weddingData.contact}
              socialLinks={weddingData.socialLinks}
              monogram={weddingData.monogram}
            />
          </Suspense>

          {/* Floating Music controllers */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-6 right-6 z-[999] flex items-center space-x-2 select-none"
          >
            {isPlaying && (
              <div className="bg-theme-card/90 backdrop-blur-md border border-theme-border/40 px-3 py-1.5 rounded-full text-[9px] font-heading tracking-widest text-theme-primary uppercase shadow-md hidden sm:block">
                Playing: {weddingData.music.title}
              </div>
            )}
            
            <button
              onClick={toggleMute}
              className="w-12 h-12 rounded-full border border-theme-border/40 text-theme-primary bg-theme-card/90 backdrop-blur-md hover:border-theme-primary hover:text-theme-accent cursor-pointer flex items-center justify-center shadow-lg transition-all duration-300 relative group"
              aria-label="Toggle mute"
            >
              <div className="absolute inset-0 rounded-full bg-theme-primary/5 group-hover:scale-110 transition-transform" />
              {isMuted ? <HiOutlineVolumeOff size={20} /> : <HiOutlineVolumeUp size={20} className={isPlaying ? 'animate-bounce' : ''} />}
            </button>
          </motion.div>
        </motion.div>
      )}
    </ErrorBoundary>
  );
};

export default App;
