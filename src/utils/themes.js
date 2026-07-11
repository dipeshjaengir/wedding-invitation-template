export const themes = {
  gold: {
    primary: "#B76E79",      // Rose Gold
    accent: "#D4AF37",       // Luxury Gold Accent
    bg: "#FFF8F5",          // Warm Ivory Paper
    card: "#FFFFFF",        // Matte White Cardstock
    text: "#6B4A4A",        // Warm Brown
    textMuted: "#8A7070",   // Soft Rose Brown
    glow: "rgba(183, 110, 121, 0.12)",
    border: "#E8C8C8"       // Soft Rose Border
  },
  red: {
    primary: "#800020",      // Burgundy
    accent: "#D4AF37",       // Gold Foil
    bg: "#FAF0E6",          // Linen Ivory
    card: "#FFFFFF",
    text: "#4A000B",
    textMuted: "#7E5259",
    glow: "rgba(128, 0, 32, 0.1)",
    border: "#E0B0B0"
  },
  emerald: {
    primary: "#097969",      // Emerald
    accent: "#D4AF37",       // Gold Foil
    bg: "#F4F9F5",          // Soft Mint Paper
    card: "#FFFFFF",
    text: "#0E3A2F",
    textMuted: "#5F8D7E",
    glow: "rgba(9, 121, 105, 0.1)",
    border: "#C2D7C6"
  },
  rose: {
    primary: "#B76E79",      // Rose Gold
    accent: "#D4AF37",       // Gold Accent
    bg: "#FFF5F6",          // Pastel Rose Paper
    card: "#FFFFFF",
    text: "#543C40",
    textMuted: "#856A70",
    glow: "rgba(183, 110, 121, 0.12)",
    border: "#EBC5C9"
  },
  white: {
    primary: "#A3704C",      // Bronze Sand
    accent: "#D4AF37",       // Gold Accent
    bg: "#FAFAFA",          // Clean Off-White
    card: "#FFFFFF",
    text: "#3E3025",
    textMuted: "#6B5A4E",
    glow: "rgba(163, 112, 76, 0.08)",
    border: "#E6DCD5"
  }
};

export const applyTheme = (themeName) => {
  const selectedTheme = themes[themeName] || themes.gold;
  const root = document.documentElement;
  
  Object.keys(selectedTheme).forEach((key) => {
    root.style.setProperty(`--theme-${key}`, selectedTheme[key]);
  });
};
