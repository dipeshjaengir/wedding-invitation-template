import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Section from './Section';
import SectionDivider from './SectionDivider';
import { scaleInVariants } from '../utils/animations';

export const Countdown = ({ targetDate }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);
  const [dustParticles, setDustParticles] = useState([]);

  // Audio Context refs for synthesis
  const audioCtxRef = useRef(null);
  const scratchOscRef = useRef(null);
  const scratchGainRef = useRef(null);

  useEffect(() => {
    // Initialize Scratch Canvas gold foil overlay
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Size canvas to fit card boundaries
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    // Fill with premium gold/rose-gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#B76E79'); // Rose Gold
    grad.addColorStop(0.3, '#E8C8C8'); // Soft Rose
    grad.addColorStop(0.5, '#D4AF37'); // Gold Accent
    grad.addColorStop(0.7, '#FFF8F5'); // Warm Ivory
    grad.addColorStop(1, '#B76E79');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw textured speckles on gold foil
    ctx.fillStyle = 'rgba(107, 74, 74, 0.08)';
    for (let i = 0; i < 400; i++) {
      const rx = Math.random() * canvas.width;
      const ry = Math.random() * canvas.height;
      ctx.fillRect(rx, ry, 1, 1);
    }

    // Border foil lines inside scratch canvas
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

    // Scratch instruction text inside canvas
    ctx.fillStyle = '#6B4A4A';
    ctx.font = 'bold 10px "Cinzel", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH WITH GRACE', canvas.width / 2, canvas.height / 2);
  }, []);

  // Web Audio API Synthesizers
  const initAudio = () => {
    if (audioCtxRef.current) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // 1. Procedural scratch sound: High-pass filtered noise
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;
    noiseNode.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1200; // Scratch frequency

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseNode.start();

    scratchOscRef.current = noiseNode;
    scratchGainRef.current = gainNode;
  };

  const startScratchSound = () => {
    initAudio();
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    if (scratchGainRef.current) {
      scratchGainRef.current.gain.setTargetAtTime(0.04, audioCtxRef.current.currentTime, 0.05);
    }
  };

  const stopScratchSound = () => {
    if (scratchGainRef.current && audioCtxRef.current) {
      scratchGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.05);
    }
  };

  const playChimeSound = () => {
    if (!audioCtxRef.current) initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    // Arpeggiated sine-wave arpeggio (C5 - E5 - G5 - C6)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.15);

      gain.gain.setValueAtTime(0, now + idx * 0.15);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.15 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.15 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.15);
      osc.stop(now + idx * 0.15 + 1.0);
    });
  };

  // Scratch Action Controllers
  const handleScratchStart = (e) => {
    setIsDrawing(true);
    startScratchSound();
    scratch(e);
  };

  const handleScratchEnd = () => {
    setIsDrawing(false);
    stopScratchSound();
    checkScratchPercentage();
  };

  const scratch = (e) => {
    if (!isDrawing || isScratched) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Get mouse/touch coordinates
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Erase a circle
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();

    // Spawn gold dust particles
    if (Math.random() > 0.4) {
      spawnDust(clientX, clientY);
    }
  };

  const spawnDust = (cx, cy) => {
    const count = 3;
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Math.random(),
        x: cx,
        y: cy,
        vx: (Math.random() - 0.5) * 1.5,
        vy: 1 + Math.random() * 2,
        size: 2 + Math.random() * 3,
        opacity: 0.8,
        color: Math.random() > 0.5 ? '#D4AF37' : '#E8C8C8',
      });
    }
    setDustParticles((prev) => [...prev, ...newParticles].slice(-40));
  };

  // Update dust physics in loop
  useEffect(() => {
    if (dustParticles.length === 0) return;
    const frame = requestAnimationFrame(() => {
      setDustParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: p.opacity - 0.02,
          }))
          .filter((p) => p.opacity > 0)
      );
    });
    return () => cancelAnimationFrame(frame);
  }, [dustParticles]);

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparent = 0;

    // Sample every 4th pixel check (performance optimization)
    for (let i = 0; i < pixels.length; i += 16) {
      if (pixels[i + 3] === 0) {
        transparent++;
      }
    }

    const percentage = (transparent / (pixels.length / 16)) * 100;

    if (percentage > 40) {
      revealDate();
    }
  };

  const revealDate = () => {
    setIsScratched(true);
    stopScratchSound();

    // 1. Shaking Camera Effect
    setShouldShake(true);
    setTimeout(() => setShouldShake(false), 500);

    // 2. Synthesize arpeggiated chiming sound
    playChimeSound();

    // 3. Blast golden confetti
    confetti({
      particleCount: 150,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFF8F5', '#B76E79'],
    });
  };

  return (
    <Section id="countdown" className="select-none overflow-hidden relative">
      <div className="text-center space-y-3 mb-12">
        <span className="font-heading text-xs tracking-[0.3em] text-theme-primary uppercase">
          Save The Date
        </span>
        <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-widest text-theme-text uppercase">
          Scratch To Reveal
        </h2>
        <div className="w-16 h-[1.5px] bg-theme-primary mx-auto mt-4" />
      </div>

      {/* Main Shakeable Wrapper */}
      <motion.div
        ref={containerRef}
        animate={shouldShake ? {
          x: [0, -6, 6, -6, 6, -4, 4, 0],
          y: [0, 4, -4, 4, -4, 2, -2, 0]
        } : {}}
        transition={{ duration: 0.45 }}
        className="w-full max-w-sm px-4 flex justify-center relative z-20"
      >
        <div className="stationery-card rounded-2xl gold-foil-border p-8 text-center w-full shadow-2xl relative overflow-hidden aspect-[4/3] flex flex-col items-center justify-center">
          {/* Inner frame */}
          <div className="absolute inset-0 border border-theme-primary/10 m-2 rounded-xl pointer-events-none" />

          {/* Underlay: The actual revealed Wedding Date */}
          <div className="space-y-4">
            <span className="font-heading text-[10px] tracking-[0.25em] text-theme-primary uppercase font-bold block">
              Wedding Date
            </span>
            <h3 className="font-heading text-2xl md:text-3xl text-theme-accent font-bold tracking-wider">
              December 18, 2026
            </h3>
            <div className="w-10 h-[1px] bg-theme-primary/30 mx-auto" />
            <p className="font-body text-xs text-theme-text-muted leading-relaxed">
              Friday at 10:30 AM <br />
              Taj Palace, New Delhi
            </p>
          </div>

          {/* Overlay: Interactive Scratch Canvas */}
          <AnimatePresence>
            {!isScratched && (
              <motion.canvas
                ref={canvasRef}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                onMouseDown={handleScratchStart}
                onMouseMove={scratch}
                onMouseUp={handleScratchEnd}
                onMouseLeave={handleScratchEnd}
                onTouchStart={handleScratchStart}
                onTouchMove={scratch}
                onTouchEnd={handleScratchEnd}
                className="absolute inset-0 z-30 rounded-xl cursor-crosshair touch-none"
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Render procedural falling dust particles */}
      {dustParticles.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-50 rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.opacity,
          }}
        />
      ))}

      <SectionDivider type="dome" className="mt-16" />
    </Section>
  );
};

export default Countdown;
