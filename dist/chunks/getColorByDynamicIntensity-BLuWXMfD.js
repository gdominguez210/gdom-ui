'use strict';

const colors = require('./colors-PXNKOlE9.js');

function getReactiveColor(baseOklch, intensity, propertyConfigs) {
  const safeIntensity = Math.max(0, Math.min(1, intensity));
  const [lightness, chroma, hue] = baseOklch;
  let modifiedL = lightness;
  let modifiedC = chroma;
  let modifiedH = hue;
  propertyConfigs.forEach((config) => {
    const { property, min, max, easing = (t) => t } = config;
    const easedIntensity = easing(safeIntensity);
    const newValue = min + (max - min) * easedIntensity;
    switch (property) {
      case colors.OKLCHProperty.LIGHTNESS:
        modifiedL = newValue;
        break;
      case colors.OKLCHProperty.CHROMA:
        modifiedC = newValue;
        break;
      case colors.OKLCHProperty.HUE:
        modifiedH = newValue;
        break;
    }
  });
  const roundedL = Math.round(modifiedL * 1e3) / 1e3;
  const roundedC = Math.round(modifiedC * 1e3) / 1e3;
  const roundedH = Math.round(modifiedH);
  return `oklch(${roundedL} ${roundedC} ${roundedH})`;
}

function getColorByAudioIntensity(baseOklchColor, intensityRatio) {
  return getReactiveColor(baseOklchColor, intensityRatio, [
    { property: colors.OKLCHProperty.LIGHTNESS, min: 0.3, max: 0.7 }
  ]);
}

function getColorByFrequencyPosition(baseOklchColor, positionRatio) {
  return getReactiveColor(baseOklchColor, positionRatio, [
    { property: colors.OKLCHProperty.HUE, min: 240, max: 0 }
  ]);
}

function getColorBySpectrum(baseOklchColor, positionRatio) {
  return getReactiveColor(baseOklchColor, positionRatio, [
    { property: colors.OKLCHProperty.HUE, min: 0, max: 360 }
  ]);
}

function getColorByDynamicIntensity(baseOklchColor, intensityRatio) {
  return getReactiveColor(baseOklchColor, intensityRatio, [
    { property: colors.OKLCHProperty.LIGHTNESS, min: 0.4, max: 0.6 },
    { property: colors.OKLCHProperty.CHROMA, min: 0.2, max: 0.3 }
  ]);
}

exports.getColorByAudioIntensity = getColorByAudioIntensity;
exports.getColorByDynamicIntensity = getColorByDynamicIntensity;
exports.getColorByFrequencyPosition = getColorByFrequencyPosition;
exports.getColorBySpectrum = getColorBySpectrum;
