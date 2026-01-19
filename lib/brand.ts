/**
 * SIX1FIVE DEVS - Brand System
 * ============================
 * 
 * This file defines the complete brand system for Six1Five Devs.
 * Use these guidelines to maintain visual consistency across all components.
 * 
 * BRAND PERSONALITY
 * -----------------
 * - Technical but approachable
 * - Clean and minimal
 * - Developer-focused
 * - Build-in-public ethos
 * 
 * COLOR PHILOSOPHY
 * ----------------
 * We use a restrained 4-color system:
 * 1. Primary (Cyan) - Action, emphasis, brand identity
 * 2. Background/Foreground - Content hierarchy
 * 3. Muted - Secondary content, borders
 * 4. Destructive - Errors, warnings (rarely used)
 */

// ============================================
// COLOR PALETTE
// ============================================

export const colors = {
  // Primary Brand Color - Cyan/Teal
  // Represents: technology, clarity, innovation
  primary: {
    light: "oklch(0.65 0.15 195)",  // Slightly darker for light mode contrast
    dark: "oklch(0.72 0.14 195)",   // Brighter for dark mode visibility
    hsl: "192 91% 50%",             // Fallback: #06b6d4
  },

  // Background Scale
  background: {
    light: {
      base: "oklch(0.985 0 0)",      // Near white #fafafa
      elevated: "oklch(1 0 0)",      // Pure white for cards
      subtle: "oklch(0.97 0.005 195 / 0.3)", // Slight cyan tint
    },
    dark: {
      base: "oklch(0.08 0 0)",       // Deep black #0d0d0d
      elevated: "oklch(0.12 0 0)",   // Elevated surfaces
      subtle: "oklch(0.14 0.01 195 / 0.3)", // Slight cyan tint
    },
  },

  // Foreground Scale
  foreground: {
    light: {
      primary: "oklch(0.12 0 0)",    // Near black for headings
      secondary: "oklch(0.35 0 0)",  // Medium gray for body
      muted: "oklch(0.5 0 0)",       // Light gray for secondary text
    },
    dark: {
      primary: "oklch(0.97 0 0)",    // Near white for headings
      secondary: "oklch(0.85 0 0)",  // Light gray for body
      muted: "oklch(0.6 0 0)",       // Medium gray for secondary text
    },
  },

  // Border Scale
  border: {
    light: "oklch(0.88 0 0)",        // Subtle gray border
    dark: "oklch(0.22 0 0)",         // Dark mode border
    accent: "oklch(0.65 0.15 195 / 0.5)", // Cyan accent border
  },

  // Status Colors
  status: {
    success: "oklch(0.65 0.15 145)", // Green
    warning: "oklch(0.75 0.15 85)",  // Amber
    error: "oklch(0.55 0.2 27)",     // Red
    info: "oklch(0.65 0.15 230)",    // Blue
  },
} as const

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = {
  // Font Families
  fonts: {
    sans: "'Geist', 'Geist Fallback', system-ui, -apple-system, sans-serif",
    mono: "'Geist Mono', 'Geist Mono Fallback', ui-monospace, monospace",
  },

  // Type Scale (following a 1.25 ratio)
  // Base: 16px
  scale: {
    xs: "0.75rem",    // 12px - Captions, labels
    sm: "0.875rem",   // 14px - Secondary text, metadata
    base: "1rem",     // 16px - Body text
    lg: "1.125rem",   // 18px - Large body, lead text
    xl: "1.25rem",    // 20px - Small headings
    "2xl": "1.5rem",  // 24px - H4
    "3xl": "1.875rem",// 30px - H3
    "4xl": "2.25rem", // 36px - H2
    "5xl": "3rem",    // 48px - H1
    "6xl": "3.75rem", // 60px - Display
  },

  // Line Heights
  leading: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },

  // Letter Spacing
  tracking: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
  },

  // Font Weights
  weights: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
} as const

// ============================================
// SPACING
// ============================================

export const spacing = {
  // Base unit: 4px
  // Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128
  
  // Component padding
  component: {
    xs: "0.5rem",     // 8px - Badges, small buttons
    sm: "0.75rem",    // 12px - Buttons, inputs
    md: "1rem",       // 16px - Cards, standard padding
    lg: "1.5rem",     // 24px - Sections
    xl: "2rem",       // 32px - Large sections
  },

  // Section spacing
  section: {
    sm: "3rem",       // 48px
    md: "4rem",       // 64px
    lg: "6rem",       // 96px
    xl: "8rem",       // 128px
  },

  // Gap scale for flex/grid
  gap: {
    xs: "0.25rem",    // 4px
    sm: "0.5rem",     // 8px
    md: "1rem",       // 16px
    lg: "1.5rem",     // 24px
    xl: "2rem",       // 32px
  },
} as const

// ============================================
// RADII
// ============================================

export const radii = {
  none: "0",
  sm: "0.25rem",      // 4px - Small elements
  md: "0.375rem",     // 6px - Buttons, inputs
  lg: "0.5rem",       // 8px - Cards
  xl: "0.75rem",      // 12px - Large cards
  "2xl": "1rem",      // 16px - Modals
  full: "9999px",     // Pills, avatars
} as const

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  // Light mode shadows
  light: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  },
  // Dark mode shadows (subtler)
  dark: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.3)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
  },
  // Glow effects (brand accent)
  glow: {
    sm: "0 0 10px oklch(0.65 0.15 195 / 0.2)",
    md: "0 0 20px oklch(0.65 0.15 195 / 0.25)",
    lg: "0 0 30px oklch(0.65 0.15 195 / 0.3)",
  },
} as const

// ============================================
// TRANSITIONS
// ============================================

export const transitions = {
  // Duration
  duration: {
    fast: "150ms",
    normal: "200ms",
    slow: "300ms",
  },
  // Easing
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const

// ============================================
// COMPONENT STYLING RULES
// ============================================

export const componentRules = {
  // Buttons
  button: {
    primary: "Primary action buttons use bg-primary with dark text",
    outline: "Secondary actions use transparent bg with border",
    ghost: "Tertiary actions use no bg, hover reveals subtle bg",
    sizing: "Default h-10, sm h-9, lg h-11. Horizontal padding 1rem",
  },

  // Cards
  card: {
    base: "Use bg-card with subtle border. Hover state adds border-primary/50",
    padding: "Standard padding is p-6 (24px)",
    radius: "Use rounded-xl (12px) for cards",
  },

  // Inputs
  input: {
    base: "Use bg-background with border-input. Focus adds ring-primary",
    height: "Standard height is h-10 (40px)",
  },

  // Links
  link: {
    base: "Navigation links use text-muted-foreground",
    hover: "Hover state transitions to text-primary",
    active: "Active/current state uses text-primary",
  },

  // Badges
  badge: {
    default: "Use for primary status (live tools)",
    secondary: "Use for secondary status (beta)",
    outline: "Use for coming soon or inactive states",
  },
} as const

// ============================================
// UI CONSISTENCY GUIDELINES
// ============================================

export const guidelines = {
  // Layout
  layout: {
    maxWidth: "max-w-7xl (1280px)",
    containerPadding: "px-4 lg:px-8",
    sectionSpacing: "py-24 (96px) for major sections",
  },

  // Hierarchy
  hierarchy: {
    h1: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight",
    h2: "text-3xl sm:text-4xl font-bold tracking-tight",
    h3: "text-2xl font-semibold",
    h4: "text-xl font-semibold",
    body: "text-base leading-relaxed text-muted-foreground",
    small: "text-sm text-muted-foreground",
  },

  // Interactive States
  states: {
    hover: "Use transition-colors for text, transition-all for complex states",
    focus: "Use focus-visible:ring-2 focus-visible:ring-ring",
    disabled: "Use opacity-50 cursor-not-allowed",
  },

  // Accessibility
  a11y: {
    contrast: "Ensure 4.5:1 contrast ratio for text",
    focusRing: "All interactive elements must have visible focus state",
    ariaLabels: "Use aria-label for icon-only buttons",
  },
} as const
