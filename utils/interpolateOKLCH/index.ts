import type { OKLCHColor } from '@/types/colors';

/**
 * Interpolates between two OKLCH colors
 *
 * @param colorA Starting OKLCH color [lightness, chroma, hue]
 * @param colorB Target OKLCH color [lightness, chroma, hue]
 * @param progress Interpolation progress (0-1)
 * @returns Interpolated OKLCH color
 */
export function interpolateOKLCH(
  colorA: OKLCHColor,
  colorB: OKLCHColor,
  progress: number,
): OKLCHColor {
  const t = Math.max(0, Math.min(1, progress));

  const [l1, c1, h1] = colorA;
  const [l2, c2, h2] = colorB;

  // Handle hue interpolation correctly (shortest path around the circle)
  let hDiff = h2 - h1;
  if (hDiff > 180) hDiff -= 360;
  if (hDiff < -180) hDiff += 360;

  const interpolatedHue = (h1 + hDiff * t) % 360;

  return [
    l1 + (l2 - l1) * t,
    c1 + (c2 - c1) * t,
    interpolatedHue < 0 ? interpolatedHue + 360 : interpolatedHue,
  ];
}
