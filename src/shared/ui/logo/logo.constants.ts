export const LOGO_VIEWBOX = "0 0 256 256";
export const LOGO_STROKE_COLOR = "#000";
export const LOGO_FILL_COLOR = "#fff";

export const LOGO_SIZES = {
  sm: "24px",
  md: "32px",
  lg: "48px",
  xl: "64px",
} as const;

export const LOGO_SVG_STRUCTURE = {
  background: {
    x: 24,
    y: 24,
    width: 208,
    height: 208,
    rx: 56,
    strokeWidth: 10,
  },
  shape: {
    strokeWidth: 8,
    strokeLinejoin: "round" as const,
  },
  accent: {
    strokeWidth: 8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  },
  centerline: {
    strokeWidth: 4,
    strokeLinecap: "round" as const,
  },
} as const;
