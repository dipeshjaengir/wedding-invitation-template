// Helper to check for prefers-reduced-motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Framer Motion Variants
export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: prefersReducedMotion() ? 0.05 : 0.15,
    },
  },
};

export const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion() ? 0 : 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  },
};

export const fadeDownVariants = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion() ? 0 : -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const fadeInVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const scaleInVariants = {
  hidden: {
    opacity: 0,
    scale: prefersReducedMotion() ? 1 : 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const blurInVariants = {
  hidden: {
    opacity: 0,
    filter: prefersReducedMotion() ? 'blur(0px)' : 'blur(12px)',
    scale: prefersReducedMotion() ? 1 : 0.97,
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const slideInLeftVariants = {
  hidden: {
    opacity: 0,
    x: prefersReducedMotion() ? 0 : -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const slideInRightVariants = {
  hidden: {
    opacity: 0,
    x: prefersReducedMotion() ? 0 : 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Text Reveal Letter-by-Letter variants
export const textContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: prefersReducedMotion() ? 0.01 : 0.03,
    },
  },
};

export const letterVariants = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion() ? 0 : 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// GSAP Presets / Animation Configs
export const gsapPresets = {
  // Floating animation configs for petals/sparkles (Canvas-based)
  petal: {
    minSpeedY: 0.5,
    maxSpeedY: 1.5,
    minSpeedX: -0.5,
    maxSpeedX: 0.5,
    minRotationSpeed: 0.01,
    maxRotationSpeed: 0.03,
  },
  sparkle: {
    minSpeedY: 0.2,
    maxSpeedY: 0.8,
    minSpeedX: -0.3,
    maxSpeedX: 0.3,
    pulseSpeed: 0.02,
  }
};
