import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMapPin } from 'react-icons/hi2';
import Section from './Section';
import SectionDivider from './SectionDivider';
import { scaleInVariants } from '../utils/animations';

export const Events = ({ eventsData }) => {
  const getCardStyle = (id) => {
    switch (id) {
      case 'haldi':
        return {
          bg: 'bg-[#FFFDF6]',
          border: 'border-[#EAD397]',
          accent: 'text-[#D4A373]',
          dress: 'Dress Code: Yellow & Vibrant Pastels',
          illustration: (
            <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#D4A373] opacity-80 filter drop-shadow-[0_2px_4px_rgba(212,163,115,0.2)]">
              {/* Marigold flower design */}
              <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M50,15 C52,25 48,25 50,15 Z M50,85 C52,75 48,75 50,85 Z M15,50 C25,52 25,48 15,50 Z M85,50 C75,52 75,48 85,50 Z" stroke="currentColor" strokeWidth="2" />
              <path d="M25,25 C33,33 30,30 25,25 Z M75,75 C67,67 70,70 75,75 Z M25,75 C33,67 30,70 25,75 Z M75,25 C67,33 70,30 75,25 Z" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="50" r="6" fill="currentColor" />
            </svg>
          ),
        };
      case 'mehendi':
        return {
          bg: 'bg-[#F7FCF8]',
          border: 'border-[#B8D8BE]',
          accent: 'text-[#5F8D7E]',
          dress: 'Dress Code: Olive Green & Floral Styles',
          illustration: (
            <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#5F8D7E] opacity-80">
              {/* Traditional Henna Leaf pattern */}
              <path d="M50,15 C35,35 35,65 50,85 C65,65 65,35 50,15 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M50,30 Q40,40 50,50 Q60,40 50,30 Z" fill="currentColor" opacity="0.3" />
              <path d="M50,15 C45,30 45,55 50,85" stroke="currentColor" strokeWidth="0.75" />
              {/* Small floral dots */}
              <circle cx="28" cy="50" r="1.5" fill="currentColor" />
              <circle cx="72" cy="50" r="1.5" fill="currentColor" />
              <circle cx="50" cy="92" r="2.5" fill="currentColor" />
            </svg>
          ),
        };
      case 'sangeet':
        return {
          bg: 'bg-[#FAF7F9]',
          border: 'border-[#D4BCC6]',
          accent: 'text-[#8C6D88]',
          dress: 'Dress Code: Glitzy Indo-Western / Glamour',
          illustration: (
            <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#8C6D88] opacity-80">
              {/* Music notes and stage lights details */}
              <path d="M30,70 L30,30 L70,20 L70,60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="20" cy="70" r="8" fill="currentColor" />
              <circle cx="60" cy="60" r="8" fill="currentColor" />
              <line x1="30" y1="45" x2="70" y2="35" stroke="currentColor" strokeWidth="2" />
              {/* Star sparkles */}
              <path d="M82,20 L84,25 L89,25 L85,28 L87,33 L82,30 L77,33 L79,28 L75,25 L80,25 Z" fill="currentColor" />
            </svg>
          ),
        };
      case 'wedding':
        return {
          bg: 'bg-[#FFFBFB]',
          border: 'border-[#E8C4C4]',
          accent: 'text-[#B76E79]',
          dress: 'Dress Code: Royal Traditional Ethnic Wear',
          illustration: (
            <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#B76E79] opacity-80">
              {/* Sacred Fire / Havan altar */}
              <polygon points="25,75 75,75 80,85 20,85" stroke="currentColor" strokeWidth="2" fill="none" />
              <polygon points="35,65 65,65 70,75 30,75" stroke="currentColor" strokeWidth="1.5" />
              {/* Fire flames */}
              <path d="M50,25 C45,45 55,50 50,65 C60,50 62,40 55,25 C52,38 48,38 50,25 Z" fill="currentColor" />
            </svg>
          ),
        };
      case 'reception':
        default:
        return {
          bg: 'bg-[#FCFCFC]',
          border: 'border-[#DCD7D2]',
          accent: 'text-[#A3704C]',
          dress: 'Dress Code: Western Formals / Evening Gowns',
          illustration: (
            <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#A3704C] opacity-80">
              {/* Toasting champagne glasses */}
              <path d="M40,65 L40,85 M30,85 L50,85" stroke="currentColor" strokeWidth="1.5" />
              <path d="M40,65 L50,30 C50,30 35,30 30,42 C25,54 40,65 40,65 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              
              <path d="M60,65 L60,85 M50,85 L70,85" stroke="currentColor" strokeWidth="1.5" />
              <path d="M60,65 L50,30 C50,30 65,30 70,42 C75,54 60,65 60,65 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              {/* Tiny bubbles */}
              <circle cx="50" cy="22" r="1.5" fill="currentColor" />
              <circle cx="46" cy="14" r="1" fill="currentColor" />
              <circle cx="54" cy="14" r="1" fill="currentColor" />
            </svg>
          ),
        };
    }
  };

  return (
    <Section id="events" className="select-none">
      {/* Header */}
      <div className="text-center space-y-3 mb-16">
        <span className="font-heading text-xs tracking-[0.3em] text-theme-primary uppercase">
          Itinerary
        </span>
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-widest text-theme-text uppercase">
          Wedding Events
        </h2>
        <div className="w-16 h-[1.5px] bg-theme-primary mx-auto mt-4" />
      </div>

      {/* Visually Custom Themed Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl px-4 mt-6">
        {eventsData.map((event) => {
          const cardTheme = getCardStyle(event.id);
          
          return (
            <motion.div
              key={event.id}
              variants={scaleInVariants}
              className={`stationery-card rounded-2xl p-6 md:p-8 flex flex-col h-full justify-between shadow-xl border-t-[3px] hover:shadow-[0_0_20px_var(--theme-glow)] hover:scale-[1.01] transition-all duration-500 ${cardTheme.bg} ${cardTheme.border}`}
            >
              {/* Event Illustration */}
              <div className="flex justify-center mb-6">
                {cardTheme.illustration}
              </div>

              {/* Title & Description */}
              <div className="text-center space-y-2 mb-6">
                <span className="font-heading text-[9px] tracking-[0.25em] text-theme-accent uppercase font-bold">
                  {event.subtitle}
                </span>
                <h3 className="font-heading text-xl text-theme-text font-bold tracking-wide">
                  {event.title}
                </h3>
              </div>

              {/* Event particulars */}
              <div className="border-t border-theme-border/30 pt-6 space-y-4 font-body text-xs md:text-sm text-theme-text-muted text-center flex-1">
                <div className="space-y-1">
                  <span className="font-heading text-[9px] text-theme-accent tracking-widest uppercase font-bold">Time &amp; Date</span>
                  <p className="text-theme-text font-semibold text-xs md:text-sm">{event.date}</p>
                  <p className="text-[11px]">{event.time}</p>
                </div>

                <div className="space-y-1">
                  <span className="font-heading text-[9px] text-theme-accent tracking-widest uppercase font-bold">Venue</span>
                  <p className="text-theme-text font-semibold text-xs md:text-sm">{event.venue}</p>
                  <p className="text-[10px] max-w-[200px] mx-auto">{event.address}</p>
                </div>

                {/* Customized Dress Code */}
                <div className="bg-[#6B4A4A]/5 py-2 px-3 rounded border border-[#6B4A4A]/5">
                  <span className="font-heading text-[8px] text-theme-primary tracking-[0.2em] uppercase font-bold block mb-0.5">Dress Code</span>
                  <p className="text-theme-text text-[10px] font-medium leading-relaxed">{cardTheme.dress}</p>
                </div>
              </div>

              {/* Shimmer Location Redirect Button */}
              <div className="pt-6 flex justify-center">
                <button
                  onClick={() => window.open(event.mapLink || 'https://maps.google.com', '_blank')}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-6 rounded font-heading text-[10px] tracking-widest uppercase border border-theme-primary/30 text-theme-primary bg-transparent cursor-pointer hover:border-theme-primary hover:bg-theme-primary hover:text-theme-bg shadow-sm transition-all duration-300 relative group overflow-hidden"
                >
                  <HiOutlineMapPin size={14} className="group-hover:scale-115 transition-transform" />
                  <span>View On Map</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <SectionDivider type="pattern" className="mt-20" />
    </Section>
  );
};

export default Events;
