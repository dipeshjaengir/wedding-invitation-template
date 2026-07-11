import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import Section from './Section';
import SectionDivider from './SectionDivider';

export const Story = ({ storyData }) => {
  const [deck, setDeck] = useState(storyData);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNextPhoto = () => {
    // Lift, rotate, and send the top card to the back of the stack
    setDeck((prev) => {
      const copy = [...prev];
      const first = copy.shift();
      copy.push(first);
      return copy;
    });
    setActiveIndex((prev) => (prev === storyData.length - 1 ? 0 : prev + 1));
  };

  const handlePrevPhoto = () => {
    setDeck((prev) => {
      const copy = [...prev];
      const last = copy.pop();
      copy.unshift(last);
      return copy;
    });
    setActiveIndex((prev) => (prev === 0 ? storyData.length - 1 : prev - 1));
  };

  return (
    <Section id="story" className="select-none">
      {/* Header */}
      <div className="text-center space-y-3 mb-16">
        <span className="font-heading text-xs tracking-[0.3em] text-theme-primary uppercase">
          Our Journey
        </span>
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-widest text-theme-text uppercase">
          Sweet Memories
        </h2>
        <div className="w-16 h-[1.5px] bg-theme-primary mx-auto mt-4" />
      </div>

      {/* Stacked Polaroid Deck Wrapper */}
      <div className="relative w-full max-w-sm aspect-[3/4] flex flex-col items-center justify-center px-4">
        
        {/* The Polaroid Stack */}
        <div className="relative w-full aspect-[4/5] max-w-[310px] flex items-center justify-center">
          {deck.map((item, idx) => {
            // Index from top (top card has highest index in map, so we draw it last or sort z-index)
            // To lay them out naturally, cards at the front should be fully visible, cards at the back scale down
            const depth = deck.length - 1 - idx; // 0 for top card, 1, 2 for cards below
            
            return (
              <motion.div
                key={item.id}
                style={{
                  zIndex: idx === 0 ? 30 : 20 - idx,
                }}
                animate={{
                  scale: idx === 0 ? 1 : 1 - idx * 0.04,
                  y: idx === 0 ? 0 : idx * 12,
                  rotate: idx === 0 ? -1 : idx % 2 === 0 ? 3 : -3,
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full bg-white p-4 pb-12 rounded shadow-2xl border border-gray-100 flex flex-col justify-between cursor-pointer select-none origin-bottom"
                onClick={idx === 0 ? handleNextPhoto : undefined}
              >
                {/* Polaroid Frame image */}
                <div className="w-full aspect-square overflow-hidden bg-gray-50 border border-gray-100 rounded relative group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-[#6B4A4A]/5 mix-blend-overlay pointer-events-none" />
                </div>

                {/* Polaroid Caption bottom */}
                <div className="text-center pt-5 space-y-1">
                  <span className="font-heading text-[8px] tracking-[0.25em] text-theme-accent uppercase font-bold">
                    {item.date}
                  </span>
                  <h3 className="font-names text-3xl text-[#543C40] tracking-wide mt-1">
                    {item.title}
                  </h3>
                  <p className="font-body text-[10px] text-theme-text-muted max-w-[240px] mx-auto leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>

                {/* Gold leaf emblem watermark in bottom-right corner */}
                <div className="absolute bottom-2 right-3 font-names text-theme-primary/30 text-xs">
                  A &amp; K
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tactile navigation buttons */}
        <div className="flex items-center space-x-6 mt-16 z-40">
          <button
            onClick={handlePrevPhoto}
            className="w-10 h-10 rounded-full border border-theme-border/50 text-theme-text/80 hover:text-theme-primary hover:border-theme-primary bg-theme-card/50 backdrop-blur-md flex items-center justify-center cursor-pointer shadow-md transition-all duration-300"
            aria-label="Previous Photo"
          >
            <HiOutlineChevronLeft size={20} />
          </button>
          
          <span className="font-heading text-[9px] tracking-[0.25em] text-theme-text-muted uppercase">
            {activeIndex + 1} / {storyData.length}
          </span>

          <button
            onClick={handleNextPhoto}
            className="w-10 h-10 rounded-full border border-theme-border/50 text-theme-text/80 hover:text-theme-primary hover:border-theme-primary bg-theme-card/50 backdrop-blur-md flex items-center justify-center cursor-pointer shadow-md transition-all duration-300"
            aria-label="Next Photo"
          >
            <HiOutlineChevronRight size={20} />
          </button>
        </div>
      </div>

      <SectionDivider type="leaf" className="mt-20" />
    </Section>
  );
};

export default Story;
