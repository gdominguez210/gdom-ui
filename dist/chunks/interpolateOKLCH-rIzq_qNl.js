'use strict';

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
  S_FROM_B: 0.6299787005
};
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
  B_FROM_S_PRIME: -0.808675766
};
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
  GAMMA_SCALE: 1.055
};
function convertChannelToLinearRGB(colorChannelValue) {
  if (colorChannelValue <= SRGB_CONSTANTS.LINEAR_THRESHOLD) {
    return colorChannelValue / SRGB_CONSTANTS.LINEAR_DIVISOR;
  }
  return Math.pow(
    (colorChannelValue + SRGB_CONSTANTS.GAMMA_OFFSET) / SRGB_CONSTANTS.GAMMA_SCALE,
    SRGB_CONSTANTS.GAMMA_EXPONENT
  );
}
function parseColorToNormalizedRGB(color) {
  const tempEl = document.createElement("div");
  tempEl.style.color = color;
  document.body.appendChild(tempEl);
  const computedColor = getComputedStyle(tempEl).color;
  document.body.removeChild(tempEl);
  const rgbMatch = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
  if (!rgbMatch) {
    return { r: 0, g: 0, b: 0 };
  }
  const r = parseInt(rgbMatch[1], 10) / 255;
  const g = parseInt(rgbMatch[2], 10) / 255;
  const b = parseInt(rgbMatch[3], 10) / 255;
  return { r, g, b };
}
function convertToLinearRGB(rgb) {
  return {
    r: convertChannelToLinearRGB(rgb.r),
    g: convertChannelToLinearRGB(rgb.g),
    b: convertChannelToLinearRGB(rgb.b)
  };
}
function convertLinearRGBToLMS(linearRGB) {
  return {
    l: RGB_TO_LMS_MATRIX.L_FROM_R * linearRGB.r + RGB_TO_LMS_MATRIX.L_FROM_G * linearRGB.g + RGB_TO_LMS_MATRIX.L_FROM_B * linearRGB.b,
    m: RGB_TO_LMS_MATRIX.M_FROM_R * linearRGB.r + RGB_TO_LMS_MATRIX.M_FROM_G * linearRGB.g + RGB_TO_LMS_MATRIX.M_FROM_B * linearRGB.b,
    s: RGB_TO_LMS_MATRIX.S_FROM_R * linearRGB.r + RGB_TO_LMS_MATRIX.S_FROM_G * linearRGB.g + RGB_TO_LMS_MATRIX.S_FROM_B * linearRGB.b
  };
}
function applyLMSNonLinearity(lms) {
  return {
    l: Math.cbrt(lms.l),
    m: Math.cbrt(lms.m),
    s: Math.cbrt(lms.s)
  };
}
function convertLMSToOklab(lmsPrime) {
  return {
    L: LMS_TO_OKLAB_MATRIX.L_FROM_L_PRIME * lmsPrime.l + LMS_TO_OKLAB_MATRIX.L_FROM_M_PRIME * lmsPrime.m + LMS_TO_OKLAB_MATRIX.L_FROM_S_PRIME * lmsPrime.s,
    a: LMS_TO_OKLAB_MATRIX.A_FROM_L_PRIME * lmsPrime.l + LMS_TO_OKLAB_MATRIX.A_FROM_M_PRIME * lmsPrime.m + LMS_TO_OKLAB_MATRIX.A_FROM_S_PRIME * lmsPrime.s,
    b: LMS_TO_OKLAB_MATRIX.B_FROM_L_PRIME * lmsPrime.l + LMS_TO_OKLAB_MATRIX.B_FROM_M_PRIME * lmsPrime.m + LMS_TO_OKLAB_MATRIX.B_FROM_S_PRIME * lmsPrime.s
  };
}
function convertOklabToOKLCH(oklab) {
  const C = Math.sqrt(oklab.a * oklab.a + oklab.b * oklab.b);
  let h = Math.atan2(oklab.b, oklab.a) * 180 / Math.PI;
  if (h < 0) h += 360;
  return {
    L: oklab.L,
    C,
    h
  };
}
function formatOKLCH(oklch, precision = 2) {
  return [
    Number(oklch.L.toFixed(precision)),
    Number(oklch.C.toFixed(precision)),
    Number(oklch.h.toFixed(precision))
  ];
}
function convertColorToOKLCH(color) {
  const oklchMatch = color.match(
    /oklch\(\s*([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)(?:\s*\/\s*[0-9.]+)?\s*\)/i
  );
  if (oklchMatch) {
    const lightness = parseFloat(oklchMatch[1]);
    const chroma = parseFloat(oklchMatch[2]);
    const hue = parseFloat(oklchMatch[3]);
    return formatOKLCH({ L: lightness, C: chroma, h: hue });
  }
  const normalizedRGB = parseColorToNormalizedRGB(color);
  const linearRGB = convertToLinearRGB(normalizedRGB);
  const lms = convertLinearRGBToLMS(linearRGB);
  const lmsPrime = applyLMSNonLinearity(lms);
  const oklab = convertLMSToOklab(lmsPrime);
  const oklch = convertOklabToOKLCH(oklab);
  return formatOKLCH(oklch);
}

function OKLCHToCSS(lightness, chroma, hue) {
  return `oklch(${lightness} ${chroma} ${hue})`;
}

function interpolateOKLCH(colorA, colorB, progress) {
  const t = Math.max(0, Math.min(1, progress));
  const [l1, c1, h1] = colorA;
  const [l2, c2, h2] = colorB;
  let hDiff = h2 - h1;
  if (hDiff > 180) hDiff -= 360;
  if (hDiff < -180) hDiff += 360;
  const interpolatedHue = (h1 + hDiff * t) % 360;
  return [
    l1 + (l2 - l1) * t,
    c1 + (c2 - c1) * t,
    interpolatedHue < 0 ? interpolatedHue + 360 : interpolatedHue
  ];
}

exports.OKLCHToCSS = OKLCHToCSS;
exports.convertColorToOKLCH = convertColorToOKLCH;
exports.interpolateOKLCH = interpolateOKLCH;
