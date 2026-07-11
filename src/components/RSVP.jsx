import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Section from './Section';
import SectionDivider from './SectionDivider';
import { scaleInVariants } from '../utils/animations';

export const RSVP = ({ rsvpData }) => {
  const { title, subtitle, note, successMessage } = rsvpData;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '1',
    willAttend: 'yes',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg(''); // Clear error on edit
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your gracious name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter your contact phone number.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      // Fire beautiful golden confetti from both sides
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 10000 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);
        const colors = ['#D4AF37', '#FFF8F5', '#B76E79'];

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors,
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors,
        });
      }, 250);
    }, 1500);
  };

  return (
    <Section id="rsvp" className="select-none">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,200,200,0.02)_0%,transparent_60%)] pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-3 mb-16">
        <span className="font-heading text-xs tracking-[0.3em] text-theme-primary uppercase">
          RSVP
        </span>
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-widest text-theme-text uppercase">
          {title}
        </h2>
        <div className="w-16 h-[1.5px] bg-theme-primary mx-auto mt-4" />
      </div>

      <div className="w-full max-w-xl px-4 relative">
        {/* RSVP Card Form Container (Premium stationery look) */}
        <div className="stationery-card rounded-2xl p-8 md:p-10 shadow-2xl relative border border-theme-border/20 shadow-[0_0_20px_var(--theme-glow)]">
          <div className="absolute inset-0 border border-theme-primary/10 m-2 rounded-xl pointer-events-none" />

          <p className="font-body text-xs md:text-sm text-theme-text-muted text-center leading-relaxed mb-8">
            {note}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="font-heading text-[9px] tracking-widest text-theme-accent uppercase font-bold block">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting || showSuccess}
                className="w-full bg-[#FFF8F5]/60 border border-theme-border/50 focus:border-theme-primary text-theme-text font-body text-xs rounded px-4 py-3.5 focus:outline-none transition-colors disabled:opacity-50"
                placeholder="Lord / Lady Name"
              />
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label className="font-heading text-[9px] tracking-widest text-theme-accent uppercase font-bold block">
                Contact Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting || showSuccess}
                className="w-full bg-[#FFF8F5]/60 border border-theme-border/50 focus:border-theme-primary text-theme-text font-body text-xs rounded px-4 py-3.5 focus:outline-none transition-colors disabled:opacity-50"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            {/* Grid of RSVP details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Guests Count */}
              <div className="space-y-2">
                <label className="font-heading text-[9px] tracking-widest text-theme-accent uppercase font-bold block">
                  Number of Guests
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  disabled={isSubmitting || showSuccess}
                  className="w-full bg-[#FFF8F5]/60 border border-theme-border/50 focus:border-theme-primary text-theme-text font-body text-xs rounded px-4 py-3.5 focus:outline-none transition-colors disabled:opacity-50 appearance-none cursor-pointer"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5">5+ People</option>
                </select>
              </div>

              {/* Attendance Choice */}
              <div className="space-y-2">
                <label className="font-heading text-[9px] tracking-widest text-theme-accent uppercase font-bold block">
                  Will you attend?
                </label>
                <div className="flex space-x-4">
                  <label className="flex-1 flex items-center justify-center border border-theme-border/50 bg-[#FFF8F5]/30 text-theme-text-muted hover:text-theme-primary hover:border-theme-primary rounded py-2.5 cursor-pointer transition-colors relative">
                    <input
                      type="radio"
                      name="willAttend"
                      value="yes"
                      checked={formData.willAttend === 'yes'}
                      onChange={handleChange}
                      disabled={isSubmitting || showSuccess}
                      className="absolute opacity-0 pointer-events-none"
                    />
                    <span
                      className={`font-heading text-[9px] tracking-widest uppercase ${
                        formData.willAttend === 'yes' ? 'text-theme-primary font-bold' : ''
                      }`}
                    >
                      Yes, Attend
                    </span>
                    {formData.willAttend === 'yes' && (
                      <span className="absolute inset-0 border border-theme-primary rounded pointer-events-none" />
                    )}
                  </label>

                  <label className="flex-1 flex items-center justify-center border border-theme-border/50 bg-[#FFF8F5]/30 text-theme-text-muted hover:text-theme-primary hover:border-theme-primary rounded py-2.5 cursor-pointer transition-colors relative">
                    <input
                      type="radio"
                      name="willAttend"
                      value="no"
                      checked={formData.willAttend === 'no'}
                      onChange={handleChange}
                      disabled={isSubmitting || showSuccess}
                      className="absolute opacity-0 pointer-events-none"
                    />
                    <span
                      className={`font-heading text-[9px] tracking-widest uppercase ${
                        formData.willAttend === 'no' ? 'text-theme-primary font-bold' : ''
                      }`}
                    >
                      Regretfully No
                    </span>
                    {formData.willAttend === 'no' && (
                      <span className="absolute inset-0 border border-theme-primary rounded pointer-events-none" />
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center font-body text-xs text-red-500 font-medium"
                >
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting || showSuccess}
                className="w-full flex items-center justify-center py-3.5 px-8 rounded font-heading text-[10px] tracking-widest uppercase bg-theme-primary text-theme-bg cursor-pointer hover:bg-theme-accent shadow-lg transition-all duration-300 relative group overflow-hidden active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending Graces...' : 'Confirm RSVP'}
              </button>
            </div>
          </form>
        </div>

        {/* Success Modal Popup Overlay */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#FFF8F5] z-40 rounded-2xl flex flex-col items-center justify-center p-8 text-center"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={scaleInVariants}
                className="space-y-6"
              >
                <div className="w-14 h-14 rounded-full border border-theme-primary mx-auto flex items-center justify-center shadow-[0_0_12px_var(--theme-glow)]">
                  <svg
                    className="w-6 h-6 text-theme-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-2xl text-theme-primary tracking-widest uppercase">
                    Thank You
                  </h3>
                  <p className="font-names text-2xl text-theme-accent">
                    {formData.name}
                  </p>
                </div>
                <p className="font-body text-xs leading-relaxed text-theme-text-muted max-w-xs mx-auto">
                  {successMessage}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="flex items-center justify-center py-2 px-6 rounded font-heading text-[10px] tracking-widest uppercase border border-theme-primary/30 text-theme-primary bg-transparent cursor-pointer hover:border-theme-primary hover:bg-theme-primary hover:text-theme-bg shadow-sm transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SectionDivider type="leaf" className="mt-20" />
    </Section>
  );
};

export default RSVP;
