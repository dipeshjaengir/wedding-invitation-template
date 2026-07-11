import React from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariants } from '../utils/animations';

export const Section = ({ id, className = '', children, style = {} }) => {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeUpVariants}
      className={`relative py-20 md:py-28 px-4 md:px-8 max-w-6xl mx-auto flex flex-col items-center justify-center w-full focus:outline-none ${className}`}
      style={style}
    >
      {children}
    </motion.section>
  );
};

export default Section;
