/**
 * Converts OKLCH components back to a CSS color string
 * @param lightness - Lightness component (0-1)
 * @param chroma - Chroma component (0+, typically 0-0.4)
 * @param hue - Hue angle in degrees (0-360)
 * @returns CSS color string using OKLCH format
 */
export function OKLCHToCSS(lightness: number, chroma: number, hue: number): string {
  // Modern browsers support OKLCH directly
  return `oklch(${lightness} ${chroma} ${hue})`;
}
