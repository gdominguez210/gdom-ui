import {
  type LinearRGB,
  type LMS,
  type LMSPrime,
  type Oklab,
  type OKLCH,
  type NormalizedRGB,
} from '@/types/colors';

/**
 * Constants for Oklab to LMS conversion matrices
 */
const OKLAB_TO_LMS_MATRIX = {
  /** LMS prime L coefficient from Oklab L */
  L_PRIME_FROM_L: 1.0,
  /** LMS prime L coefficient from Oklab a */
  L_PRIME_FROM_A: 0.3963377774,
  /** LMS prime L coefficient from Oklab b */
  L_PRIME_FROM_B: 0.2158037573,

  /** LMS prime M coefficient from Oklab L */
  M_PRIME_FROM_L: 1.0,
  /** LMS prime M coefficient from Oklab a */
  M_PRIME_FROM_A: -0.1055613458,
  /** LMS prime M coefficient from Oklab b */
  M_PRIME_FROM_B: -0.0638541728,

  /** LMS prime S coefficient from Oklab L */
  S_PRIME_FROM_L: 1.0,
  /** LMS prime S coefficient from Oklab a */
  S_PRIME_FROM_A: -0.0894841775,
  /** LMS prime S coefficient from Oklab b */
  S_PRIME_FROM_B: -1.291485548,
} as const;

/**
 * Constants for LMS to Linear RGB conversion matrices
 */
const LMS_TO_LINEAR_RGB_MATRIX = {
  /** Linear RGB R coefficient from LMS L */
  R_FROM_L: 4.0767416621,
  /** Linear RGB R coefficient from LMS M */
  R_FROM_M: -3.3077115913,
  /** Linear RGB R coefficient from LMS S */
  R_FROM_S: 0.2309699292,

  /** Linear RGB G coefficient from LMS L */
  G_FROM_L: -1.2684380046,
  /** Linear RGB G coefficient from LMS M */
  G_FROM_M: 2.6097574011,
  /** Linear RGB G coefficient from LMS S */
  G_FROM_S: -0.3413193965,

  /** Linear RGB B coefficient from LMS L */
  B_FROM_L: -0.0041960863,
  /** Linear RGB B coefficient from LMS M */
  B_FROM_M: -0.7034186147,
  /** Linear RGB B coefficient from LMS S */
  B_FROM_S: 1.707614701,
} as const;

/**
 * Constants for sRGB color space conversion
 */
const SRGB_CONSTANTS = {
  /** Threshold for linear segment in sRGB conversion */
  LINEAR_THRESHOLD: 0.0031308,
  /** Multiplier for linear segment in sRGB conversion */
  LINEAR_MULTIPLIER: 12.92,
  /** Exponent for power function in sRGB conversion */
  GAMMA_EXPONENT: 2.4,
  /** Offset for power function in sRGB conversion */
  GAMMA_OFFSET: 0.055,
  /** Scale factor for power function in sRGB conversion */
  GAMMA_SCALE: 1.055,
} as const;

/**
 * Converts OKLCH values to Oklab color space
 *
 * OKLCH is a cylindrical representation of Oklab, using Lightness,
 * Chroma (saturation), and Hue.
 *
 * @param oklch - OKLCH color space values
 * @returns Oklab color space values
 */
function convertOKLCHToOklab(oklch: OKLCH): Oklab {
  // Convert hue to radians
  const hueRad = (oklch.h * Math.PI) / 180;

  // Convert from polar (cylindrical) to Cartesian coordinates
  return {
    L: oklch.L,
    a: oklch.C * Math.cos(hueRad),
    b: oklch.C * Math.sin(hueRad),
  };
}

/**
 * Converts Oklab values to LMS prime color space
 *
 * This is the first step in converting from Oklab back to RGB
 *
 * @param oklab - Oklab color space values
 * @returns LMS prime values
 */
function convertOklabToLMSPrime(oklab: Oklab): LMSPrime {
  return {
    l:
      OKLAB_TO_LMS_MATRIX.L_PRIME_FROM_L * oklab.L +
      OKLAB_TO_LMS_MATRIX.L_PRIME_FROM_A * oklab.a +
      OKLAB_TO_LMS_MATRIX.L_PRIME_FROM_B * oklab.b,
    m:
      OKLAB_TO_LMS_MATRIX.M_PRIME_FROM_L * oklab.L +
      OKLAB_TO_LMS_MATRIX.M_PRIME_FROM_A * oklab.a +
      OKLAB_TO_LMS_MATRIX.M_PRIME_FROM_B * oklab.b,
    s:
      OKLAB_TO_LMS_MATRIX.S_PRIME_FROM_L * oklab.L +
      OKLAB_TO_LMS_MATRIX.S_PRIME_FROM_A * oklab.a +
      OKLAB_TO_LMS_MATRIX.S_PRIME_FROM_B * oklab.b,
  };
}

/**
 * Converts LMS prime values to LMS color space
 *
 * This applies the inverse of the cube root operation used
 * in the forward conversion.
 *
 * @param lmsPrime - LMS prime values
 * @returns LMS color space values
 */
function convertLMSPrimeToLMS(lmsPrime: LMSPrime): LMS {
  return {
    l: lmsPrime.l * lmsPrime.l * lmsPrime.l,
    m: lmsPrime.m * lmsPrime.m * lmsPrime.m,
    s: lmsPrime.s * lmsPrime.s * lmsPrime.s,
  };
}

/**
 * Converts LMS values to linear RGB
 *
 * This applies the inverse of the matrix used to convert
 * from linear RGB to LMS in the forward conversion.
 *
 * @param lms - LMS color space values
 * @returns Linear RGB values
 */
function convertLMSToLinearRGB(lms: LMS): LinearRGB {
  return {
    r:
      LMS_TO_LINEAR_RGB_MATRIX.R_FROM_L * lms.l +
      LMS_TO_LINEAR_RGB_MATRIX.R_FROM_M * lms.m +
      LMS_TO_LINEAR_RGB_MATRIX.R_FROM_S * lms.s,
    g:
      LMS_TO_LINEAR_RGB_MATRIX.G_FROM_L * lms.l +
      LMS_TO_LINEAR_RGB_MATRIX.G_FROM_M * lms.m +
      LMS_TO_LINEAR_RGB_MATRIX.G_FROM_S * lms.s,
    b:
      LMS_TO_LINEAR_RGB_MATRIX.B_FROM_L * lms.l +
      LMS_TO_LINEAR_RGB_MATRIX.B_FROM_M * lms.m +
      LMS_TO_LINEAR_RGB_MATRIX.B_FROM_S * lms.s,
  };
}

/**
 * Clamps RGB values to the valid 0-1 range
 *
 * @param rgb - RGB values that might be outside the valid range
 * @returns RGB values clamped to 0-1 range
 */
function clampRGB(rgb: LinearRGB): LinearRGB {
  return {
    r: Math.max(0, Math.min(1, rgb.r)),
    g: Math.max(0, Math.min(1, rgb.g)),
    b: Math.max(0, Math.min(1, rgb.b)),
  };
}

/**
 * Converts a linear RGB channel value to standard RGB (with gamma correction)
 *
 * @param linearValue - Linear RGB channel value
 * @returns Standard RGB channel value with gamma correction
 */
function convertLinearToStandardRGBChannel(linearValue: number): number {
  if (linearValue <= SRGB_CONSTANTS.LINEAR_THRESHOLD) {
    return SRGB_CONSTANTS.LINEAR_MULTIPLIER * linearValue;
  }

  return (
    SRGB_CONSTANTS.GAMMA_SCALE * Math.pow(linearValue, 1 / SRGB_CONSTANTS.GAMMA_EXPONENT) -
    SRGB_CONSTANTS.GAMMA_OFFSET
  );
}

/**
 * Applies gamma correction to convert from linear RGB to standard RGB
 *
 * This is the inverse of the operation used to convert from standard RGB
 * to linear RGB in the forward conversion.
 *
 * @param linearRGB - Linear RGB values
 * @returns Standard (gamma-corrected) RGB values
 */
function convertLinearToStandardRGB(linearRGB: LinearRGB): NormalizedRGB {
  return {
    r: convertLinearToStandardRGBChannel(linearRGB.r),
    g: convertLinearToStandardRGBChannel(linearRGB.g),
    b: convertLinearToStandardRGBChannel(linearRGB.b),
  };
}

/**
 * Converts OKLCH values to RGB values
 *
 * The conversion process follows these steps:
 * 1. Convert from OKLCH to Oklab
 * 2. Convert from Oklab to LMS prime
 * 3. Convert from LMS prime to LMS
 * 4. Convert from LMS to linear RGB
 * 5. Clamp RGB values to valid range
 * 6. Apply gamma correction to get standard RGB
 *
 * @param lightness - Lightness component (0-1)
 * @param chroma - Chroma component (0+, typically 0-0.4)
 * @param hue - Hue angle in degrees (0-360)
 * @returns RGB values as [r, g, b] in 0-1 range
 */
export function OKLCHToRGB(
  lightness: number,
  chroma: number,
  hue: number,
): [number, number, number] {
  const oklab = convertOKLCHToOklab({ L: lightness, C: chroma, h: hue });

  const lmsPrime = convertOklabToLMSPrime(oklab);

  const lms = convertLMSPrimeToLMS(lmsPrime);

  const linearRGB = convertLMSToLinearRGB(lms);

  const clampedRGB = clampRGB(linearRGB);

  const standardRGB = convertLinearToStandardRGB(clampedRGB);

  return [standardRGB.r, standardRGB.g, standardRGB.b];
}
