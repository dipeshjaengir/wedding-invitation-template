import React, { useState } from 'react';
import Section from './Section';
import SectionDivider from './SectionDivider';

export const Gift = ({ giftData }) => {
  const { message, upiId, bankDetails } = giftData;
  const [copied, setCopied] = useState(false);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section id="gift" className="select-none">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,200,200,0.02)_0%,transparent_60%)] pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-3 mb-16">
        <span className="font-heading text-xs tracking-[0.3em] text-theme-primary uppercase">
          Blessings
        </span>
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-widest text-theme-text uppercase">
          Wedding Shagun
        </h2>
        <div className="w-16 h-[1.5px] bg-theme-primary mx-auto mt-4" />
      </div>

      <div className="w-full max-w-4xl px-4 flex flex-col md:flex-row gap-10 items-center justify-center">
        {/* Left Side: Polite Message & QR Code */}
        <div className="w-full md:w-1/2 stationery-card rounded-2xl p-6 md:p-8 flex flex-col items-center text-center space-y-6 border border-theme-border/20 shadow-[0_0_20px_var(--theme-glow)]">
          <div className="absolute inset-0 border border-theme-primary/10 m-2 rounded-xl pointer-events-none" />

          <p className="font-body text-xs md:text-sm leading-relaxed text-theme-text-muted">
            {message}
          </p>

          {/* Luxury styled SVG QR Code placeholder */}
          <div className="relative w-40 h-40 bg-theme-card p-3 rounded-xl border border-theme-primary/20 flex flex-col items-center justify-center shadow-lg group">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-theme-primary rounded-tl-md" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-theme-primary rounded-tr-md" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-theme-primary rounded-bl-md" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-theme-primary rounded-br-md" />

            {/* Custom Golden QR Vector pattern */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-theme-primary opacity-80"
              fill="currentColor"
            >
              {/* Fake QR blocks */}
              <rect x="5" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="4" />
              <rect x="12" y="12" width="11" height="11" />
              <rect x="70" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="4" />
              <rect x="77" y="12" width="11" height="11" />
              <rect x="5" y="70" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="4" />
              <rect x="12" y="77" width="11" height="11" />
              {/* Random dots inside */}
              <rect x="40" y="10" width="6" height="12" />
              <rect x="52" y="5" width="10" height="6" />
              <rect x="40" y="28" width="18" height="6" />
              <rect x="5" y="42" width="12" height="18" />
              <rect x="25" y="48" width="16" height="6" />
              <rect x="70" y="40" width="12" height="12" />
              <rect x="88" y="40" width="7" height="18" />
              <rect x="44" y="44" width="16" height="16" />
              <rect x="40" y="70" width="6" height="25" />
              <rect x="52" y="76" width="12" height="12" />
              <rect x="70" y="70" width="25" height="6" />
              <rect x="76" y="82" width="12" height="13" />
            </svg>
            <div className="absolute inset-0 bg-[#FFF8F5]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl backdrop-blur-xs">
              <span className="font-heading text-[8px] tracking-[0.25em] text-theme-primary uppercase font-bold">
                Scan to Bless
              </span>
            </div>
          </div>

          {/* Copy UPI Section */}
          <div className="w-full space-y-3">
            <span className="font-heading text-[9px] tracking-widest text-theme-primary uppercase">
              UPI Address
            </span>
            <p className="font-body text-xs md:text-sm font-semibold text-theme-text/90 tracking-wide select-all">
              {upiId}
            </p>
            <div className="pt-2">
              <button
                onClick={handleCopyUPI}
                className="flex items-center justify-center py-2 px-6 mx-auto rounded font-heading text-[10px] tracking-widest uppercase border border-theme-primary/30 text-theme-primary bg-transparent cursor-pointer hover:border-theme-primary hover:bg-theme-primary hover:text-theme-bg shadow-sm transition-all duration-300"
              >
                {copied ? 'Copied with Grace' : 'Copy UPI ID'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Traditional Bank Transfer details */}
        <div className="w-full md:w-1/2 stationery-card rounded-2xl p-6 md:p-8 flex flex-col space-y-6 border border-theme-border/20 shadow-[0_0_20px_var(--theme-glow)]">
          <div className="absolute inset-0 border border-theme-primary/10 m-2 rounded-xl pointer-events-none" />

          <h3 className="font-heading text-lg md:text-xl text-theme-primary tracking-widest uppercase text-center border-b border-theme-border/20 pb-4">
            Bank Details
          </h3>

          <div className="space-y-4 font-body text-xs md:text-sm">
            <div className="flex justify-between border-b border-theme-border/10 pb-2">
              <span className="text-theme-text-muted">Account Name</span>
              <span className="text-theme-text font-medium">{bankDetails.accountName}</span>
            </div>
            <div className="flex justify-between border-b border-theme-border/10 pb-2">
              <span className="text-theme-text-muted">Bank Name</span>
              <span className="text-theme-text font-medium">{bankDetails.bankName}</span>
            </div>
            <div className="flex justify-between border-b border-theme-border/10 pb-2">
              <span className="text-theme-text-muted">Account Number</span>
              <span className="text-theme-text font-semibold select-all">{bankDetails.accountNumber}</span>
            </div>
            <div className="flex justify-between border-b border-theme-border/10 pb-2">
              <span className="text-theme-text-muted">IFSC Code</span>
              <span className="text-theme-text font-semibold select-all">{bankDetails.ifsc}</span>
            </div>
          </div>

          <div className="text-center font-body text-[10px] text-theme-text-muted tracking-wider leading-relaxed pt-2">
            Traditional Shaguns will be cordially credited to the couple's home funds with warm gratitude.
          </div>
        </div>
      </div>

      <SectionDivider type="dome" className="mt-20" />
    </Section>
  );
};

export default Gift;
