import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

export const Navbar = ({ brideName, groomName }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'story', label: 'Couple' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'venue', label: 'Venue' },
    { id: 'rsvp', label: 'RSVP' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active section detection
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 select-none ${
          isScrolled
            ? 'py-4 bg-theme-bg/85 backdrop-blur-md border-b border-theme-border/30 shadow-lg'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="font-heading text-lg font-bold tracking-[0.2em] text-theme-primary cursor-pointer hover:opacity-85 transition-opacity"
          >
            {brideName[0]} &amp; {groomName[0]}
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`font-heading text-[10px] tracking-widest uppercase transition-all duration-300 relative py-1 cursor-pointer ${
                  activeSection === item.id
                    ? 'text-theme-primary font-bold'
                    : 'text-theme-text/70 hover:text-theme-primary'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-theme-primary" />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-theme-primary hover:text-theme-accent cursor-pointer focus:outline-none p-1"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur */}
            <div
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-theme-bg/60 backdrop-blur-sm z-[48]"
            />
            {/* Slide-in Drawer */}
            <div className="fixed top-0 right-0 h-full w-[260px] bg-theme-card/95 border-l border-theme-border/50 z-[49] shadow-2xl flex flex-col p-8 pt-24 space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`font-heading text-xs tracking-widest uppercase py-2 border-b border-theme-border/10 cursor-pointer ${
                    activeSection === item.id
                      ? 'text-theme-primary font-bold'
                      : 'text-theme-text/80 hover:text-theme-primary'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
