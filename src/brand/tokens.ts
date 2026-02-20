/**
 * TipSplit Design Tokens
 * Single source of truth for the brand system.
 * Import these in components instead of hardcoding values.
 */

// ─── Brand Identity ─────────────────────────────────────────
export const BRAND = {
  name: "TipSplit",
  tagline: "Split smart. Tip right.",
  description:
    "The modern tip calculator. No ads. No downloads. Just fast math at the table.",
} as const;

// ─── Color Palette ──────────────────────────────────────────
export const colors = {
  brand: {
    50: "#F0FDFA",
    100: "#CCFBF1",
    200: "#99F6E4",
    300: "#5EEAD4",
    400: "#2DD4BF",
    500: "#14B8A6", // Primary
    600: "#0D9488", // Primary hover
    700: "#0F766E",
    800: "#115E59",
    900: "#134E4A",
    950: "#042F2E",
  },
  accent: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#F59E0B", // Accent primary (selected tip, highlights)
    600: "#D97706",
    700: "#B45309",
    800: "#92400E",
    900: "#78350F",
  },
  surface: {
    0: "#FFFFFF", // Cards
    50: "#F8FAFC", // Page background
    100: "#F1F5F9", // Input backgrounds
    200: "#E2E8F0", // Borders
    300: "#CBD5E1", // Disabled borders
    400: "#94A3B8", // Placeholder text
    500: "#64748B", // Secondary text
    600: "#475569",
    700: "#334155",
    800: "#1E293B", // Primary text
    900: "#0F172A", // Headings
    950: "#020617",
  },
  semantic: {
    success: "#10B981",
    error: "#EF4444",
    warning: "#F59E0B",
  },
} as const;

// ─── Typography ─────────────────────────────────────────────
export const typography = {
  fontFamily: {
    sans: '"Inter", system-ui, -apple-system, sans-serif',
    mono: '"DM Mono", "JetBrains Mono", ui-monospace, monospace',
  },
  googleFontsUrl:
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap",
  scale: {
    "display-lg": { size: "3rem", weight: 700, tracking: "-0.02em" },
    "display-md": { size: "2.25rem", weight: 700, tracking: "-0.02em" },
    "display-sm": { size: "1.875rem", weight: 600, tracking: "-0.01em" },
    "amount-lg": { size: "2.5rem", weight: 600, tracking: "-0.01em" },
    "amount-md": { size: "1.75rem", weight: 600, tracking: "0em" },
    "amount-sm": { size: "1.25rem", weight: 500, tracking: "0em" },
    body: { size: "1rem", weight: 400, tracking: "0em" },
    caption: { size: "0.875rem", weight: 400, tracking: "0.01em" },
    label: { size: "0.75rem", weight: 500, tracking: "0.05em" },
  },
} as const;

// ─── Spacing & Layout ───────────────────────────────────────
export const spacing = {
  touch: "48px", // Minimum tap target (WCAG / mobile UX)
  cardPadding: "1.5rem",
  sectionGap: "1.5rem",
  inputHeight: "3rem",
  buttonHeight: "3rem",
  maxWidth: "28rem", // Max calculator width (mobile-first)
} as const;

// ─── Border Radius ──────────────────────────────────────────
export const radii = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
} as const;

// ─── Shadows ────────────────────────────────────────────────
export const shadows = {
  card: "0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06)",
  cardHover:
    "0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
  result:
    "0 0 0 1px rgba(20, 184, 166, 0.1), 0 4px 12px rgba(20, 184, 166, 0.08)",
} as const;

// ─── Component Tokens ───────────────────────────────────────
export const components = {
  tipButton: {
    default: {
      bg: colors.surface[100],
      text: colors.surface[700],
      border: colors.surface[200],
    },
    selected: {
      bg: colors.brand[500],
      text: "#FFFFFF",
      border: colors.brand[500],
    },
    hover: {
      bg: colors.surface[200],
      text: colors.surface[800],
      border: colors.surface[300],
    },
  },
  input: {
    bg: colors.surface[0],
    border: colors.surface[200],
    focusBorder: colors.brand[500],
    focusRing: colors.brand[200],
    placeholder: colors.surface[400],
    text: colors.surface[900],
  },
  results: {
    bg: colors.brand[50],
    border: colors.brand[200],
    labelColor: colors.surface[500],
    valueColor: colors.surface[900],
    highlightBg: colors.brand[500],
    highlightText: "#FFFFFF",
  },
} as const;
