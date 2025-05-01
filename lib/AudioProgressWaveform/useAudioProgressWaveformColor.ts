import { useCallback, useMemo, type RefObject } from 'react';
import { type WaveformBarInfo } from '@lib/AudioWaveform/useAudioWaveform';
import { type useMousePositionRefReturn } from '@lib/useMousePositionRef/useMousePositionRef';
import { type UseElementDimensionsReturn } from '@lib/useElementDimensions/useElementDimensions';
import { type OKLCHColor } from '@lib/types/colors';
import {
  type AudioProgressColorMode,
  type BarColorResult,
  type GradientStop,
  AUDIO_PROGRESS_COLOR_MODES,
} from '@lib/AudioProgressWaveform/types';
import { convertColorToOKLCH } from '@lib/utils/convertColorToOKLCH';
import { OKLCHToCSS } from '@lib/utils/OKLCHToCSS';
import {
  getInterpolatedColorString,
  generateGradientStops,
  calculateBarCoverage,
  shouldApplyHoverEffect,
  getNormalizedHoverPosition,
} from '@lib/AudioProgressWaveform/drawingUtils';

export type useAudioProgressWaveformColorOptions = {
  /**
   * The duration of the audio to visualize
   */
  duration: number;
  /**
   * The audio element to visualize
   */
  audioRef: RefObject<HTMLAudioElement>;

  /**
   * The dimensions of the waveform
   */
  dimensionsRef: UseElementDimensionsReturn['dimensionsRef'];

  /**
   * The color of the progress bar
   */
  progressColor?: string;

  /**
   * The color of the waveform bars
   */
  barColor?: string;

  /**
   * The color of the waveform bars when hovered
   */
  hoverColor?: string;

  /**
   * The relative position (0-1) of the mouse on the waveform
   */
  hoverPositionRef?: useMousePositionRefReturn['positionRef'];

  /**
   * How much to adjust the progress color for hover effect
   * @default 0.15
   */
  hoverColorDelta?: number;

  /**
   * A function that returns whether the mouse is hovering over the waveform
   */
  getIsHovering?: useMousePositionRefReturn['getIsHovering'];

  /**
   * Color mode for the progress visualization
   * @default AUDIO_PROGRESS_COLOR_MODES.SOLID
   */
  colorMode?: AudioProgressColorMode;

  /**
   * Custom gradient stops for progressed bars when colorMode is GRADIENT
   * If not provided, stops will be generated based on progressColor and gradientLightnessDelta
   */
  gradientStops?: GradientStop[];

  /**
   * How much to adjust the lightness of the progress color for the gradient top
   * Positive values make it lighter, negative values make it darker
   * Only used when colorMode is GRADIENT and gradientStops are not provided
   * @default -0.15
   */
  gradientLightnessDelta?: number;
};

export type useAudioProgressWaveformColorReturn = {
  getWaveformBarColor: (barInfo: WaveformBarInfo) => BarColorResult;
};

export function useAudioProgressWaveformColor(
  options: useAudioProgressWaveformColorOptions,
): useAudioProgressWaveformColorReturn {
  const {
    duration,
    audioRef,
    dimensionsRef,
    progressColor = '#000000',
    barColor = '#9f9fa9',
    getIsHovering,
    hoverPositionRef,
    hoverColor,
    hoverColorDelta = 0.15,
    colorMode = AUDIO_PROGRESS_COLOR_MODES.GRADIENT,
    gradientStops,
    gradientLightnessDelta = -0.1,
  } = options;

  const progressColorOKLCH = useMemo(() => convertColorToOKLCH(progressColor), [progressColor]);
  const barColorOKLCH = useMemo(() => convertColorToOKLCH(barColor), [barColor]);
  const progressColorCSS = useMemo(() => OKLCHToCSS(...progressColorOKLCH), [progressColorOKLCH]);
  const barColorCSS = useMemo(() => OKLCHToCSS(...barColorOKLCH), [barColorOKLCH]);

  const hoverColorOKLCH: OKLCHColor = useMemo(() => {
    if (hoverColor) {
      return convertColorToOKLCH(hoverColor) as OKLCHColor;
    }
    const [l, c, h] = progressColorOKLCH;
    return [Math.min(1, l + hoverColorDelta), Math.max(0, c - c / 2), h];
  }, [hoverColor, progressColorOKLCH, hoverColorDelta]);

  const hoverColorCSS = useMemo(() => OKLCHToCSS(...hoverColorOKLCH), [hoverColorOKLCH]);

  const effectiveGradientStops = useMemo(() => {
    if (colorMode !== AUDIO_PROGRESS_COLOR_MODES.GRADIENT) {
      return [];
    }

    if (gradientStops) {
      return gradientStops;
    }

    return generateGradientStops(progressColorOKLCH, progressColorCSS, gradientLightnessDelta);
  }, [colorMode, gradientStops, gradientLightnessDelta, progressColorOKLCH, progressColorCSS]);

  const getWaveformBarColor = useCallback(
    (barInfo: WaveformBarInfo): BarColorResult => {
      const progress = audioRef.current?.currentTime ? audioRef.current.currentTime / duration : 0;
      const coverage = calculateBarCoverage(barInfo, progress);

      const isHovering = getIsHovering?.();

      if (isHovering) {
        const normalizedHoverPosition = getNormalizedHoverPosition(
          hoverPositionRef?.current,
          dimensionsRef?.current,
        );

        if (
          normalizedHoverPosition !== undefined &&
          shouldApplyHoverEffect(barInfo.position, progress, normalizedHoverPosition)
        ) {
          return hoverColorCSS;
        }
      }

      // If bar is fully covered by progress
      if (coverage === 1) {
        if (colorMode === AUDIO_PROGRESS_COLOR_MODES.GRADIENT) {
          return {
            type: 'gradient',
            stops: effectiveGradientStops,
          };
        }
        return progressColorCSS;
      }

      // If bar is fully uncovered by progress
      if (coverage === 0) {
        return barColorCSS;
      }

      // If bar is partially covered by progress
      return getInterpolatedColorString(barColorOKLCH, progressColorOKLCH, coverage);
    },
    [
      barColorCSS,
      progressColorCSS,
      barColorOKLCH,
      progressColorOKLCH,
      duration,
      audioRef,
      colorMode,
      effectiveGradientStops,
      getIsHovering,
      hoverPositionRef,
      hoverColorCSS,
      dimensionsRef,
    ],
  );

  return {
    getWaveformBarColor,
  };
}
