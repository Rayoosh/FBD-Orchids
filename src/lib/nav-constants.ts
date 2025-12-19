export const NAV_DIMENSIONS = {
  TOP: {
    WIDTH: 1200, // Max width at top
    WIDTH_PERCENT: 0.9,
    HEIGHT: 76,
    MARGIN_TOP: 24,
    PADDING: 32, // Padding around the navbar inside the housing
  },
  SCROLLED: {
    WIDTH: 440,
    HEIGHT: 56,
    MARGIN_TOP: 16,
    PADDING: 24,
  },
  SPRING: {
    type: "spring" as const,
    stiffness: 200,
    damping: 30,
    mass: 0.8
  }
};
