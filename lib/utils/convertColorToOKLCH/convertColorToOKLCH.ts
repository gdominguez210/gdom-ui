import {
  type LinearRGB,
  type LMS,
  type LMSPrime,
  type Oklab,
  type OKLCH,
  type NormalizedRGB,
} from '@lib/types/colors';

/**
 * Constants for RGB to Long-Medium-Short (LMS) conversion matrices
 */
const RGB_TO_LMS_MATRIX = {
  /** LMS matrix coefficient for L from R component */
  L_FROM_R: 0.4122214708,
  /** LMS matrix coefficient for L from G component */
  L_FROM_G: 0.5363325363,
  /** LMS matrix coefficient for L from B component */
  L_FROM_B: 0.0514459929,

  /** LMS matrix coefficient for M from R component */
  M_FROM_R: 0.2119034982,
  /** LMS matrix coefficient for M from G component */
  M_FROM_G: 0.6806995451,
  /** LMS matrix coefficient for M from B component */
  M_FROM_B: 0.1073969566,

  /** LMS matrix coefficient for S from R component */
  S_FROM_R: 0.0883024619,
  /** LMS matrix coefficient for S from G component */
  S_FROM_G: 0.2817188376,
  /** LMS matrix coefficient for S from B component */
  S_FROM_B: 0.6299787005,
} as const;

/**
 * Constants for Long-Medium-Short (LMS) to Oklab conversion matrices
 */
const LMS_TO_OKLAB_MATRIX = {
  /** Oklab matrix coefficient for L from L' component */
  L_FROM_L_PRIME: 0.2104542553,
  /** Oklab matrix coefficient for L from M' component */
  L_FROM_M_PRIME: 0.793617785,
  /** Oklab matrix coefficient for L from S' component */
  L_FROM_S_PRIME: -0.0040720468,

  /** Oklab matrix coefficient for a from L' component */
  A_FROM_L_PRIME: 1.9779984951,
  /** Oklab matrix coefficient for a from M' component */
  A_FROM_M_PRIME: -2.428592205,
  /** Oklab matrix coefficient for a from S' component */
  A_FROM_S_PRIME: 0.4505937099,

  /** Oklab matrix coefficient for b from L' component */
  B_FROM_L_PRIME: 0.0259040371,
  /** Oklab matrix coefficient for b from M' component */
  B_FROM_M_PRIME: 0.7827717662,
  /** Oklab matrix coefficient for b from S' component */
  B_FROM_S_PRIME: -0.808675766,
} as const;

/**
 * Constants for sRGB color space conversion
 */
const SRGB_CONSTANTS = {
  /** Threshold for linear segment in sRGB conversion */
  LINEAR_THRESHOLD: 0.04045,
  /** Divisor for linear segment in sRGB conversion */
  LINEAR_DIVISOR: 12.92,
  /** Exponent for power function in sRGB conversion */
  GAMMA_EXPONENT: 2.4,
  /** Offset for power function in sRGB conversion */
  GAMMA_OFFSET: 0.055,
  /** Scale factor for power function in sRGB conversion */
  GAMMA_SCALE: 1.055,
} as const;

/**
 * Converts a color channel value to linear RGB
 * @param colorChannelValue - The color channel value to convert
 * @returns The linear RGB value
 */
function convertChannelToLinearRGB(colorChannelValue: number): number {
  if (colorChannelValue <= SRGB_CONSTANTS.LINEAR_THRESHOLD) {
    return colorChannelValue / SRGB_CONSTANTS.LINEAR_DIVISOR;
  }

  return Math.pow(
    (colorChannelValue + SRGB_CONSTANTS.GAMMA_OFFSET) / SRGB_CONSTANTS.GAMMA_SCALE,
    SRGB_CONSTANTS.GAMMA_EXPONENT,
  );
}

/**
 * Parses any valid CSS color string into normalized RGB components
 *
 * Uses the browser's built-in color parsing by setting the color on a temporary DOM element
 * and reading the computed value.
 *
 * @param color - Any valid CSS color string (hex, rgb, rgba, hsl, etc.)
 * @returns Object containing normalized RGB values (0-1)
 */
function parseColorToNormalizedRGB(color: string): NormalizedRGB {
  // Create a temporary element to use the browser's color parsing
  const tempEl = document.createElement('div');
  tempEl.style.color = color;
  document.body.appendChild(tempEl);

  // Get computed RGB values
  const computedColor = getComputedStyle(tempEl).color;
  document.body.removeChild(tempEl);

  // Parse RGB values (computedColor is in the form "rgb(r, g, b)" or "rgba(r, g, b, a)")
  const rgbMatch = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);

  if (!rgbMatch) {
    // Default if parsing fails
    return { r: 0, g: 0, b: 0 };
  }

  // Convert RGB (0-255) to normalized RGB (0-1)
  const r = parseInt(rgbMatch[1]!, 10) / 255;
  const g = parseInt(rgbMatch[2]!, 10) / 255;
  const b = parseInt(rgbMatch[3]!, 10) / 255;

  return { r, g, b };
}

/**
 * Converts normalized RGB values to linear RGB values
 *
 * This removes the gamma correction applied to standard RGB values,
 * resulting in values that are proportional to light intensity.
 *
 * @param rgb - Normalized RGB values (0-1)
 * @returns Linear RGB values
 */
function convertToLinearRGB(rgb: NormalizedRGB): LinearRGB {
  return {
    r: convertChannelToLinearRGB(rgb.r),
    g: convertChannelToLinearRGB(rgb.g),
    b: convertChannelToLinearRGB(rgb.b),
  };
}

/**
 * Converts linear RGB values to LMS color space
 *
 * The LMS color space represents the response of the three types of cones
 * in the human eye (Long, Medium, Short).
 *
 * @param linearRGB - Linear RGB values
 * @returns LMS color space values
 */
function convertLinearRGBToLMS(linearRGB: LinearRGB): LMS {
  return {
    l:
      RGB_TO_LMS_MATRIX.L_FROM_R * linearRGB.r +
      RGB_TO_LMS_MATRIX.L_FROM_G * linearRGB.g +
      RGB_TO_LMS_MATRIX.L_FROM_B * linearRGB.b,
    m:
      RGB_TO_LMS_MATRIX.M_FROM_R * linearRGB.r +
      RGB_TO_LMS_MATRIX.M_FROM_G * linearRGB.g +
      RGB_TO_LMS_MATRIX.M_FROM_B * linearRGB.b,
    s:
      RGB_TO_LMS_MATRIX.S_FROM_R * linearRGB.r +
      RGB_TO_LMS_MATRIX.S_FROM_G * linearRGB.g +
      RGB_TO_LMS_MATRIX.S_FROM_B * linearRGB.b,
  };
}

/**
 * Applies a non-linear transformation to LMS values
 *
 * This applies a cube root operation to simulate the non-linear
 * perception of brightness in the human visual system.
 *
 * @param lms - LMS color space values
 * @returns Transformed LMS values (L'M'S')
 */
function applyLMSNonLinearity(lms: LMS): LMSPrime {
  return {
    l: Math.cbrt(lms.l),
    m: Math.cbrt(lms.m),
    s: Math.cbrt(lms.s),
  };
}

/**
 * Converts LMS prime values to Oklab color space
 *
 * Oklab is a perceptually uniform color space designed to better
 * represent how humans perceive color differences.
 *
 * @param lmsPrime - LMS prime values after non-linear transformation
 * @returns Oklab color space values
 */
function convertLMSToOklab(lmsPrime: LMSPrime): Oklab {
  return {
    L:
      LMS_TO_OKLAB_MATRIX.L_FROM_L_PRIME * lmsPrime.l +
      LMS_TO_OKLAB_MATRIX.L_FROM_M_PRIME * lmsPrime.m +
      LMS_TO_OKLAB_MATRIX.L_FROM_S_PRIME * lmsPrime.s,
    a:
      LMS_TO_OKLAB_MATRIX.A_FROM_L_PRIME * lmsPrime.l +
      LMS_TO_OKLAB_MATRIX.A_FROM_M_PRIME * lmsPrime.m +
      LMS_TO_OKLAB_MATRIX.A_FROM_S_PRIME * lmsPrime.s,
    b:
      LMS_TO_OKLAB_MATRIX.B_FROM_L_PRIME * lmsPrime.l +
      LMS_TO_OKLAB_MATRIX.B_FROM_M_PRIME * lmsPrime.m +
      LMS_TO_OKLAB_MATRIX.B_FROM_S_PRIME * lmsPrime.s,
  };
}

/**
 * Converts Oklab values to OKLCH color space
 *
 * OKLCH is a cylindrical representation of Oklab, using Lightness,
 * Chroma (saturation), and Hue instead of L, a, b coordinates.
 *
 * @param oklab - Oklab color space values
 * @returns OKLCH color space values
 */
function convertOklabToOKLCH(oklab: Oklab): OKLCH {
  // Calculate chroma (distance from neutral axis)
  const C = Math.sqrt(oklab.a * oklab.a + oklab.b * oklab.b);

  // Calculate hue angle in degrees
  let h = (Math.atan2(oklab.b, oklab.a) * 180) / Math.PI;

  // Adjust to 0-360 range
  if (h < 0) h += 360;

  return {
    L: oklab.L,
    C,
    h,
  };
}

/**
 * Formats OKLCH values to fixed precision
 *
 * @param oklch - OKLCH color space values
 * @param precision - Decimal places for rounding (default: 2)
 * @returns OKLCH values rounded to specified precision
 */
function formatOKLCH(oklch: OKLCH, precision: number = 2): [number, number, number] {
  return [
    Number(oklch.L.toFixed(precision)),
    Number(oklch.C.toFixed(precision)),
    Number(oklch.h.toFixed(precision)),
  ];
}

/**
 * Converts any valid CSS color to OKLCH components
 *
 * The conversion process follows these steps:
 * 1. Parse the color to normalized RGB (0-1)
 * 2. Convert to linear RGB (removing gamma correction)
 * 3. Convert to LMS color space (cone responses)
 * 4. Apply non-linearity (cube root) to get LMS prime
 * 5. Convert to Oklab color space
 * 6. Convert to OKLCH cylindrical representation
 * 7. Format the result to fixed precision
 *
 * @param color - Any valid CSS color (hex, rgb, rgba, hsl, etc.)
 * @returns OKLCH components as [lightness, chroma, hue]
 */
export function convertColorToOKLCH(color: string): [number, number, number] {
  const normalizedRGB = parseColorToNormalizedRGB(color);
  const linearRGB = convertToLinearRGB(normalizedRGB);
  const lms = convertLinearRGBToLMS(linearRGB);
  const lmsPrime = applyLMSNonLinearity(lms);
  const oklab = convertLMSToOklab(lmsPrime);
  const oklch = convertOklabToOKLCH(oklab);
  return formatOKLCH(oklch);
}
