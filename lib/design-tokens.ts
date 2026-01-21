/**
 * Design Tokens
 *
 * Centralized design system values for consistent UI across the site.
 * Use these tokens instead of hardcoding values in components.
 */

// Border radius scale
export const borderRadius = {
  none: "0",
  sm: "0.25rem", // 4px
  DEFAULT: "0.375rem", // 6px
  md: "0.5rem", // 8px
  lg: "0.75rem", // 12px
  xl: "1rem", // 16px
  "2xl": "1.5rem", // 24px
  full: "9999px",
} as const

// Z-index scale for layering
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  header: 50,
  mobileMenu: 100,
  toast: 110,
} as const

// Icon sizes
export const iconSize = {
  xs: "0.75rem", // 12px
  sm: "1rem", // 16px
  DEFAULT: "1.25rem", // 20px
  md: "1.5rem", // 24px
  lg: "2rem", // 32px
  xl: "2.5rem", // 40px
  "2xl": "3rem", // 48px
} as const

// Spacing scale (matches Tailwind default)
export const spacing = {
  0: "0",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
} as const

// Animation durations
export const duration = {
  instant: "0ms",
  fast: "100ms",
  normal: "200ms",
  slow: "300ms",
  slower: "500ms",
} as const

// Animation easings
export const easing = {
  linear: "linear",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const

// Breakpoints (matches Tailwind)
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const

// Container max-widths
export const containerMaxWidth = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1400px", // Used by container-page
  "7xl": "80rem", // Default max-width
} as const

// Font weights
export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const

// Common shadow values
export const shadow = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "0 0 #0000",
} as const

// Brand-specific glow effects
export const glow = {
  teal: "0 0 20px rgba(20, 184, 166, 0.3)",
  purple: "0 0 20px rgba(139, 92, 246, 0.3)",
  dual: "0 0 20px rgba(20, 184, 166, 0.2), 0 0 40px rgba(139, 92, 246, 0.15)",
} as const

// Type exports for TypeScript
export type BorderRadius = keyof typeof borderRadius
export type ZIndex = keyof typeof zIndex
export type IconSize = keyof typeof iconSize
export type Spacing = keyof typeof spacing
export type Duration = keyof typeof duration
export type Easing = keyof typeof easing
export type Breakpoint = keyof typeof breakpoints
export type FontWeight = keyof typeof fontWeight
export type Shadow = keyof typeof shadow
export type Glow = keyof typeof glow
