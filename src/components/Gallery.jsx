import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineX } from 'react-icons/hi';
import Section from './Section';
import { GalleryCard } from './Card';
import SectionDivider from './SectionDivider';

export const Gallery = ({ photos }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Swipe distance threshold
  const minSwipeDistance = 50;

  // Key press listener for lightbox navigation
  useEffect(() => {
    if (selectedIdx === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx]);

  const handleNext = () => {
    setSelectedIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  // Touch Swipe handlers for Mobile Lightbox
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <Section id="gallery" className="select-none">
      {/* Header */}
      <div className="text-center space-y-3 mb-16">
        <span className="font-heading text-xs tracking-[0.3em] text-theme-primary uppercase">
          Memories
        </span>
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-widest text-theme-text uppercase">
          Glimpses of Love
        </h2>
        <div className="w-16 h-[1.5px] bg-theme-primary mx-auto mt-4" />
      </div>

      {/* Masonry Grid */}
      <div className="w-full max-w-5xl px-4">
        <div className="masonry-grid">
          {photos.map((photo, index) => (
            <GalleryCard
              key={photo.id}
              item={photo}
              onClick={() => setSelectedIdx(index)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-theme-bg/95 z-[9999] flex flex-col items-center justify-center select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIdx(null)}
              className="absolute top-6 right-6 text-theme-text/80 hover:text-theme-primary cursor-pointer p-2 focus:outline-none z-50 transition-colors"
              aria-label="Close lightbox"
            >
              <HiOutlineX size={32} />
            </button>

            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-6 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-theme-border/30 text-theme-text/80 hover:text-theme-primary hover:border-theme-primary bg-theme-card/30 backdrop-blur-md cursor-pointer transition-all duration-300"
              aria-label="Previous image"
            >
              <HiOutlineChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-6 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-theme-border/30 text-theme-text/80 hover:text-theme-primary hover:border-theme-primary bg-theme-card/30 backdrop-blur-md cursor-pointer transition-all duration-300"
              aria-label="Next image"
            >
              <HiOutlineChevronRight size={24} />
            </button>

            {/* Lightbox Contents */}
            <div className="max-w-4xl max-h-[80vh] w-full px-4 flex flex-col items-center justify-center space-y-4">
              <motion.div
                key={selectedIdx}
                initial={{ scale: 0.95, opacity: 0, filter: 'blur(5px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                exit={{ scale: 0.95, opacity: 0, filter: 'blur(5px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-lg border border-theme-border/30 max-h-[70vh] shadow-2xl"
              >
                <img
                  src={photos[selectedIdx].image}
                  alt={photos[selectedIdx].title}
                  className="max-h-[70vh] w-auto object-contain max-w-full"
                />
              </motion.div>

              {/* Title label */}
              <div className="text-center">
                <span className="font-heading text-xs tracking-widest text-theme-primary uppercase">
                  {photos[selectedIdx].title}
                </span>
                <p className="font-body text-[10px] text-theme-text-muted mt-1 uppercase tracking-widest">
                  {selectedIdx + 1} of {photos.length}
                </p>
              </div>
            </div>

            {/* Swipe prompt for mobile */}
            <div className="absolute bottom-6 md:hidden text-center text-theme-text-muted font-body text-[10px] tracking-widest uppercase">
              Swipe left/right to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SectionDivider type="leaf" className="mt-20" />
    </Section>
  );
};

export default Gallery;
