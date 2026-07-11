import React from 'react';

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseStyle =
    'relative inline-flex items-center justify-center font-heading text-xs tracking-widest uppercase transition-all duration-500 rounded font-semibold overflow-hidden px-8 py-3.5 focus:outline-none cursor-pointer select-none active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary:
      'bg-theme-primary text-theme-bg hover:bg-theme-accent hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]',
    secondary:
      'bg-theme-card text-theme-primary border border-theme-border hover:border-theme-primary hover:shadow-[0_0_10px_rgba(212,175,55,0.15)]',
    outline:
      'bg-transparent text-theme-primary border border-theme-primary hover:bg-theme-primary hover:text-theme-bg hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]',
    'luxury-gold':
      'bg-gradient-to-r from-theme-primary via-theme-accent to-theme-primary text-theme-bg border border-theme-accent shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:scale-[1.02]',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
