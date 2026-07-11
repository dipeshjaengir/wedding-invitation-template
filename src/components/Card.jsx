import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { scaleInVariants, fadeUpVariants } from '../utils/animations';

// 1. EVENT CARD
export const EventCard = ({ event }) => {
  const { title, subtitle, date, time, venue, address, image } = event;
  return (
    <motion.div
      variants={scaleInVariants}
      className="glass-panel glass-panel-hover flex flex-col h-full rounded-xl overflow-hidden shadow-lg p-6 md:p-8 space-y-6 select-none"
    >
      {/* Decorative Event Illustration Header */}
      {image && (
        <div className="relative w-20 h-20 mx-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain filter drop-shadow-[0_0_8px_var(--theme-primary)]"
            loading="lazy"
          />
        </div>
      )}

      <div className="text-center space-y-2">
        <span className="font-heading text-[10px] tracking-widest text-theme-primary uppercase">
          {subtitle}
        </span>
        <h3 className="font-heading text-xl md:text-2xl text-theme-text font-bold tracking-wider">
          {title}
        </h3>
      </div>

      <div className="border-t border-theme-border/50 pt-6 space-y-4 font-body text-sm text-theme-text-muted">
        <div className="flex flex-col items-center text-center space-y-1">
          <span className="font-heading text-[11px] text-theme-primary tracking-widest uppercase">Date &amp; Time</span>
          <p className="text-theme-text font-medium">{date}</p>
          <p className="text-xs">{time}</p>
        </div>

        <div className="flex flex-col items-center text-center space-y-1">
          <span className="font-heading text-[11px] text-theme-primary tracking-widest uppercase">Venue</span>
          <p className="text-theme-text font-semibold">{venue}</p>
          <p className="text-xs max-w-xs">{address}</p>
        </div>
      </div>
    </motion.div>
  );
};

// 2. STORY CARD
export const StoryCard = ({ story, index }) => {
  const { date, title, description, image } = story;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={fadeUpVariants}
      className={`flex flex-col md:flex-row items-center w-full gap-8 md:gap-12 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Story Image Panel */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="relative group w-full max-w-sm aspect-[4/3] rounded-xl overflow-hidden border border-theme-border/40 shadow-2xl">
          <div className="absolute inset-0 bg-theme-bg/40 z-10 group-hover:bg-transparent transition-all duration-700" />
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 border border-theme-primary/20 m-2 rounded-lg pointer-events-none z-20 group-hover:border-theme-primary/60 transition-colors duration-700" />
        </div>
      </div>

      {/* Story Text Panel */}
      <div className="w-full md:w-1/2 text-left space-y-4 px-2">
        <div className="inline-block px-3 py-1 bg-theme-primary/10 border border-theme-primary/20 rounded-full">
          <span className="font-heading text-[10px] tracking-widest text-theme-primary uppercase font-bold">
            {date}
          </span>
        </div>
        <h3 className="font-heading text-xl md:text-2xl text-theme-text font-semibold tracking-wider">
          {title}
        </h3>
        <p className="font-body text-sm md:text-base leading-relaxed text-theme-text-muted">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 3. GALLERY CARD (Pinterest Style Masonry with Intersection Observer)
export const GalleryCard = ({ item, onClick }) => {
  const { title, image } = item;
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '100px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={() => onClick && onClick(item)}
      className="relative group overflow-hidden rounded-xl border border-theme-border/30 bg-theme-card/30 aspect-[3/4] cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:border-theme-primary/50 transition-all duration-500"
    >
      {/* Background Placeholder Shimmer */}
      <div className="absolute inset-0 bg-theme-card/80 flex items-center justify-center">
        <span className="font-heading text-[10px] tracking-widest text-theme-primary/40 uppercase">
          Preloading...
        </span>
      </div>

      {/* Lazy Loaded Image */}
      {isInView && (
        <img
          src={image}
          alt={title}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-1000 ease-out transform group-hover:scale-108 ${
            isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
          }`}
        />
      )}

      {/* Overlay and Title on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-20">
        <h4 className="font-heading text-sm text-theme-primary font-semibold tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {title}
        </h4>
        <span className="font-body text-[10px] text-theme-text-muted mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
          View Masterpiece
        </span>
      </div>

      {/* Elegant Inner border frame */}
      <div className="absolute inset-0 border border-theme-primary/10 m-2 rounded-lg pointer-events-none group-hover:border-theme-primary/30 transition-colors duration-500 z-10" />
    </div>
  );
};
