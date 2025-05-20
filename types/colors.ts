/**
 * Represents which OKLCH properties can be modified by the reactive color function
 */
export const OKLCHProperty = {
  LIGHTNESS: 'lightness',
  CHROMA: 'chroma',
  HUE: 'hue',
} as const;

/**
 * Type representing OKLCH color values
 */
export type OKLCHColor = [number, number, number]; // [lightness, chroma, hue]

/**
 * Type representing RGB color values normalized to 0-1 range
 */
export type NormalizedRGB = {
  r: number;
  g: number;
  b: number;
};

/**
 * Type representing linear RGB color values
 */
export type LinearRGB = {
  r: number;
  g: number;
  b: number;
};

/**
 * Type representing LMS color space values
 */
export type LMS = {
  l: number;
  m: number;
  s: number;
};

/**
 * Type representing LMS prime values (after applying cube root)
 */
export type LMSPrime = {
  l: number;
  m: number;
  s: number;
};

/**
 * Type representing Oklab color space values
 */
export type Oklab = {
  L: number;
  a: number;
  b: number;
};

/**
 * Type representing OKLCH color space values
 */
export type OKLCH = {
  L: number;
  C: number;
  h: number;
};
