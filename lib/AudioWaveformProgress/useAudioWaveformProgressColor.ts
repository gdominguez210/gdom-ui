import { useCallback, useMemo, type RefObject } from 'react';
import type { ColorResult, GradientStop } from '@/types/colors';
import type { EnvelopeSegmentInfo } from '@/types/audio';
import type { UseMousePositionRefReturn } from '@/lib/useMousePositionRef/useMousePositionRef';
import type { UseElementDimensionsReturn } from '@/lib/useElementDimensions/useElementDimensions';
import type { OKLCHColor } from 'types/colors';
import { convertColorToOKLCH } from '@/utils/convertColorToOKLCH';
import { OKLCHToCSS } from '@/utils/OKLCHToCSS';
import {
  getInterpolatedColorString,
  generateGradientStops,
  calculateBarCoverage,
  shouldApplyHoverEffect,
  getNormalizedHoverPosition,
} from '@/lib/AudioWaveformProgress/colorUtils';

/**
 * Color modes for the audio progress waveform
 */
const AUDIO_PROGRESS_COLOR_MODES = {
  /**
   * Static color for played and unplayed regions
   */
  STATIC: 'static',

  /**
   * Gradient effect for played regions
   */
  GRADIENT: 'gradient',
} as const;

/**
 * Color mode for the audio progress waveform, as string union
 */
type AudioProgressColorMode =
  (typeof AUDIO_PROGRESS_COLOR_MODES)[keyof typeof AUDIO_PROGRESS_COLOR_MODES];

export type UseAudioWaveformProgressColorOptions = {
  /**
   * The duration of the audio to visualize
   */
  duration: number;
  /**
   * The audio element to visualize
   */
  audioRef: RefObject<HTMLAudioElement>;

  /**
   * Function to get the element dimensions
   */
  getElementDimensions: UseElementDimensionsReturn['getElementDimensions'];

  /**
   * The color of the progress bar
   */
  progressColor?: string;

  /**
   * The color of the waveform bars
   */
  color?: string;

  /**
   * The color of the waveform bars when hovered
   */
  hoverColor?: string;

  /**
   * A function that returns the relative position (value between 0 and 1) of the mouse on the waveform
   */
  getMousePosition: UseMousePositionRefReturn['getMousePosition'];

  /**
   * How much to adjust the progress color for hover effect
   * Only used when hoverColor is not provided
   * @default 0.15
   */
  hoverColorDelta?: number;

  /**
   * A function that returns whether the mouse is hovering over the waveform
   */
  getIsHovering: UseMousePositionRefReturn['getIsHovering'];

  /**
   * Color mode for the progress visualization
   * @default 'static'
   */
  colorMode?: AudioProgressColorMode;

  /**
   * Custom gradient stops for progressed bars when colorMode is 'gradient'
   * If not provided, stops will be generated based on progressColor and gradientLightnessDelta
   */
  gradientStops?: GradientStop[];

  /**
   * How much to adjust the lightness of the progress color for the gradient top
   * Positive values make it lighter, negative values make it darker
   * Only used when colorMode is 'gradient' and gradientStops are not provided
   * @default -0.15
   */
  gradientLightnessDelta?: number;
};

export type UseAudioWaveformProgressColorReturn = {
  colorFn: (segmentInfo: EnvelopeSegmentInfo) => ColorResult;
};

export function useAudioWaveformProgressColor(
  options: UseAudioWaveformProgressColorOptions,
): UseAudioWaveformProgressColorReturn {
  const {
    duration,
    audioRef,
    progressColor = '#4a5565',
    color = '#9f9fa9',
    getElementDimensions,
    getIsHovering,
    getMousePosition,
    hoverColor,
    hoverColorDelta = 0.15,
    colorMode = AUDIO_PROGRESS_COLOR_MODES.GRADIENT,
    gradientStops,
    gradientLightnessDelta = -0.1,
  } = options;

  const progressColorOKLCH = useMemo(() => convertColorToOKLCH(progressColor), [progressColor]);
  const colorOKLCH = useMemo(() => convertColorToOKLCH(color), [color]);
  const progressColorCSS = useMemo(() => OKLCHToCSS(...progressColorOKLCH), [progressColorOKLCH]);
  const colorCSS = useMemo(() => OKLCHToCSS(...colorOKLCH), [colorOKLCH]);

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
      return gradientStops.map((stop) => ({
        ...stop,
        colorOKLCH: convertColorToOKLCH(stop.color),
      }));
    }

    const generatedStops = generateGradientStops(
      progressColorOKLCH,
      progressColorCSS,
      gradientLightnessDelta,
    );

    return generatedStops.map((stop) => ({
      ...stop,
      colorOKLCH: convertColorToOKLCH(stop.color),
    }));
  }, [colorMode, gradientStops, gradientLightnessDelta, progressColorOKLCH, progressColorCSS]);

  const colorFn = useCallback(
    (segmentInfo: EnvelopeSegmentInfo): ColorResult => {
      const { position, widthPercent } = segmentInfo;
      const progress = audioRef.current?.currentTime ? audioRef.current.currentTime / duration : 0;
      const coverage = calculateBarCoverage(position, widthPercent, progress);

      const isHovering = getIsHovering();
      const { offsetX } = getMousePosition();
      const { width } = getElementDimensions();

      if (isHovering && offsetX !== null && width !== null) {
        const normalizedHoverPosition = getNormalizedHoverPosition(offsetX, width);

        if (shouldApplyHoverEffect(position, progress, normalizedHoverPosition)) {
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
        return colorCSS;
      }

      // If bar is partially covered by progress
      if (colorMode === AUDIO_PROGRESS_COLOR_MODES.GRADIENT) {
        // Interpolate between barColor and each gradient stop's pre-computed OKLCH color
        const interpolatedStops = effectiveGradientStops.map((stop) => {
          const interpolatedColor = getInterpolatedColorString(
            colorOKLCH,
            stop.colorOKLCH,
            coverage,
          );
          return {
            offset: stop.offset,
            color: interpolatedColor,
          };
        });

        return {
          type: 'gradient',
          stops: interpolatedStops,
        };
      }

      // If bar is partially covered by progress
      const interpolatedColor = getInterpolatedColorString(
        colorOKLCH,
        progressColorOKLCH,
        coverage,
      );
      return interpolatedColor;
    },
    [
      colorCSS,
      progressColorCSS,
      colorOKLCH,
      progressColorOKLCH,
      duration,
      audioRef,
      colorMode,
      effectiveGradientStops,
      getIsHovering,
      getMousePosition,
      getElementDimensions,
      hoverColorCSS,
    ],
  );

  return {
    colorFn,
  };
}
