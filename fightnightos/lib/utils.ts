/**
 * Utility functions used throughout FightNight OS
 */
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines CSS class names intelligently.
 *
 * WHY THIS EXISTS:
 * When building components, you often need to merge CSS classes from
 * different sources (default styles + custom overrides). This function
 * handles conflicts properly. For example:
 *   cn("p-4", "p-2") → "p-2" (not "p-4 p-2" which would conflict)
 *
 * USAGE:
 *   <div className={cn("bg-red-500", isActive && "bg-green-500")} />
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a fighter's record as "W-L-D" (e.g., "27-1-0")
 * Includes no-contests if any exist (e.g., "27-1-0 (1 NC)")
 */
export function formatRecord(
  wins: number,
  losses: number,
  draws: number,
  nc?: number
): string {
  const base = `${wins}-${losses}-${draws}`
  if (nc && nc > 0) return `${base} (${nc} NC)`
  return base
}

/**
 * Converts centimeters to feet and inches (e.g., 193 → "6'4\"")
 * UFC displays height in imperial format.
 */
export function cmToFeetInches(cm: number): string {
  const totalInches = Math.round(cm / 2.54)
  const feet = Math.floor(totalInches / 12)
  const inches = totalInches % 12
  return `${feet}'${inches}"`
}

/**
 * Converts centimeters to a reach display (e.g., 215 → "84.5\"")
 */
export function cmToInches(cm: number): string {
  return `${(cm / 2.54).toFixed(1)}"`
}

/**
 * Generates a URL-friendly slug from a string.
 * "Jon Jones" → "jon-jones"
 * "UFC 310: Pantoja vs. Asakura" → "ufc-310-pantoja-vs-asakura"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}
