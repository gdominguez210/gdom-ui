import { jsx } from 'react/jsx-runtime';
import { C as CanvasResponsive } from './CanvasResponsive-CTao_uPL.js';
import { t as twMerge } from './bundle-mjs-BME7zF0Z.js';
import { c as clsx } from './clsx-ChV9xqsO.js';
import { u as useComposedRefs } from './useComposedRefs-DMyoGc1Z.js';
import { useCallback, useMemo } from 'react';
import { O as OKLCHToCSS, i as interpolateOKLCH, c as convertColorToOKLCH } from './useColorTransition-CWfqaoCT.js';
import { u as useAnimationFrame } from './useAnimationFrame-1lZDWPZz.js';
import { u as useAudioWaveformEnvelopeRectangles } from './useAudioWaveformEnvelopeRectangles-BnCb3M7c.js';
import { u as useKeyboardMediaSeek } from './useKeyboardMediaSeek-DWogQFkQ.js';
import { u as useDelayedMouseMove } from './useDelayedMouseMove-DQT8JCh0.js';
import { u as useMousePositionRef } from './useMousePositionRef-Dfc9HPf-.js';
import { u as useElementDimensions } from './useElementDimensions-CKEvUWeI.js';

function AudioWaveformProgressPrimitive(props) {
  const { className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    CanvasResponsive,
    {
      ...restProps,
      className: twMerge(
        clsx(
          'relative cursor-pointer bg-radial from-neutral-50 from-0% to-neutral-100 to-90% before:absolute before:inset-0 before:bg-radial before:from-white before:to-transparent before:bg-[size:1px_1px] before:content-[""]',
          className
        )
      )
    }
  );
}

function useAudioWaveformProgressHandlers(options) {
  const { onProgressChange, onPreviewTimeChange, audioRef, duration, getElementDimensions } = options;
  const seekToPosition = useCallback(
    (position) => {
      if (!audioRef.current) return;
      const normalizedPosition = Math.max(0, Math.min(1, position));
      const timeToSeek = normalizedPosition * duration;
      audioRef.current.currentTime = timeToSeek;
      onProgressChange?.(timeToSeek);
    },
    [audioRef, duration, onProgressChange]
  );
  const updatePreviewFromPosition = useCallback(
    (position) => {
      if (position === null) {
        onPreviewTimeChange?.(null);
        return;
      }
      const normalizedPosition = Math.max(0, Math.min(1, position));
      const previewTime = normalizedPosition * duration;
      onPreviewTimeChange?.(previewTime);
    },
    [duration, onPreviewTimeChange]
  );
  const handleClick = useCallback(
    (e) => {
      const { width, left } = getElementDimensions();
      if (width === 0) return;
      const clickX = e.clientX - left;
      const position = clickX / width;
      seekToPosition(position);
    },
    [getElementDimensions, seekToPosition]
  );
  const handleWaveformMouseMove = useCallback(
    (e) => {
      const { width, left } = getElementDimensions();
      if (width === 0) return;
      const mouseX = e.clientX - left;
      const position = mouseX / width;
      updatePreviewFromPosition(position);
    },
    [getElementDimensions, updatePreviewFromPosition]
  );
  const handleWaveformMouseLeave = useCallback(() => {
    updatePreviewFromPosition(null);
  }, [updatePreviewFromPosition]);
  return {
    handleClick,
    handleMouseMove: handleWaveformMouseMove,
    handleMouseLeave: handleWaveformMouseLeave
  };
}

function getInterpolatedColorString(barColor, progressColor, ratio) {
  const interpolatedColor = interpolateOKLCH(barColor, progressColor, ratio);
  return OKLCHToCSS(...interpolatedColor);
}
function generateGradientStops(progressColorOKLCH, progressColorCSS, lightnessDelta = -0.1) {
  const [l, c, h] = progressColorOKLCH;
  const adjustedLightness = lightnessDelta > 0 ? Math.min(l + lightnessDelta, 1) : Math.max(l + lightnessDelta, 0);
  const adjustedColor = OKLCHToCSS(adjustedLightness, c, h);
  return [
    { offset: 0, color: progressColorCSS },
    { offset: 0.5, color: progressColorCSS },
    { offset: 1, color: adjustedColor }
    // Top of bar
  ];
}
function calculateBarCoverage(position, width, progress) {
  const halfWidth = width / 2;
  const barStartPosition = position - halfWidth;
  const barEndPosition = position + halfWidth;
  if (barEndPosition <= progress) {
    return 1;
  }
  if (barStartPosition >= progress) {
    return 0;
  }
  const barWidth = barEndPosition - barStartPosition;
  const coveredWidth = progress - barStartPosition;
  return Math.round(coveredWidth / barWidth * 1e3) / 1e3;
}
function shouldApplyHoverEffect(barPosition, currentProgress, hoverPosition) {
  if (hoverPosition > currentProgress) {
    return barPosition > currentProgress && barPosition < hoverPosition;
  } else if (hoverPosition < currentProgress) {
    return barPosition > hoverPosition && barPosition < currentProgress;
  }
  return false;
}
function getNormalizedHoverPosition(offsetX, width) {
  return offsetX / width;
}

const AUDIO_PROGRESS_COLOR_MODES = {
  /**
   * Gradient effect for played regions
   */
  GRADIENT: "gradient"
};
function useAudioWaveformProgressColor(options) {
  const {
    duration,
    audioRef,
    progressColor = "#4a5565",
    color = "#9f9fa9",
    getElementDimensions,
    getIsHovering,
    getMousePosition,
    hoverColor,
    hoverColorDelta = 0.15,
    colorMode = AUDIO_PROGRESS_COLOR_MODES.GRADIENT,
    gradientStops,
    gradientLightnessDelta = -0.1
  } = options;
  const progressColorOKLCH = useMemo(() => convertColorToOKLCH(progressColor), [progressColor]);
  const colorOKLCH = useMemo(() => convertColorToOKLCH(color), [color]);
  const progressColorCSS = useMemo(() => OKLCHToCSS(...progressColorOKLCH), [progressColorOKLCH]);
  const colorCSS = useMemo(() => OKLCHToCSS(...colorOKLCH), [colorOKLCH]);
  const hoverColorOKLCH = useMemo(() => {
    if (hoverColor) {
      return convertColorToOKLCH(hoverColor);
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
        colorOKLCH: convertColorToOKLCH(stop.color)
      }));
    }
    const generatedStops = generateGradientStops(
      progressColorOKLCH,
      progressColorCSS,
      gradientLightnessDelta
    );
    return generatedStops.map((stop) => ({
      ...stop,
      colorOKLCH: convertColorToOKLCH(stop.color)
    }));
  }, [colorMode, gradientStops, gradientLightnessDelta, progressColorOKLCH, progressColorCSS]);
  const colorFn = useCallback(
    (segmentInfo) => {
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
      if (coverage === 1) {
        if (colorMode === AUDIO_PROGRESS_COLOR_MODES.GRADIENT) {
          return {
            type: "gradient",
            stops: effectiveGradientStops
          };
        }
        return progressColorCSS;
      }
      if (coverage === 0) {
        return colorCSS;
      }
      if (colorMode === AUDIO_PROGRESS_COLOR_MODES.GRADIENT) {
        const interpolatedStops = effectiveGradientStops.map((stop) => {
          const interpolatedColor2 = getInterpolatedColorString(
            colorOKLCH,
            stop.colorOKLCH,
            coverage
          );
          return {
            offset: stop.offset,
            color: interpolatedColor2
          };
        });
        return {
          type: "gradient",
          stops: interpolatedStops
        };
      }
      const interpolatedColor = getInterpolatedColorString(
        colorOKLCH,
        progressColorOKLCH,
        coverage
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
      hoverColorCSS
    ]
  );
  return {
    colorFn
  };
}

function useAudioWaveformProgress(props) {
  const {
    // AudioWaveformEnvelopeRectangles props
    data,
    color,
    gapMaxWidth,
    gapMinWidth,
    gapWidthPercent,
    heightScale,
    interpolationFn,
    segmentMinWidth,
    // useAudioWaveformProgressHandlers props
    audioRef,
    duration,
    onProgressChange,
    onPreviewTimeChange,
    // useAudioWaveformProgressColor props
    hoverColor,
    hoverColorDelta,
    colorMode,
    gradientStops,
    gradientLightnessDelta,
    progressColor,
    // useAnimationFrame props
    isActive,
    frameRate,
    dependencies: animationDependencies,
    // useKeyboardSeek props
    seekIncrement,
    maxSeekIncrement,
    seekAcceleration,
    seekAccelerationDelay,
    seekInterval,
    // html canvas props
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave
  } = props;
  const { elementRef, getElementDimensions } = useElementDimensions();
  const {
    getIsHovering,
    getMousePosition,
    handleMouseMove: handleMousePositionMove,
    handleMouseLeave: handleMousePositionLeave
  } = useMousePositionRef();
  const {
    handleClick: handleWaveformClick,
    handleMouseMove: handleWaveformMouseMove,
    handleMouseLeave: handleWaveformMouseLeave
  } = useAudioWaveformProgressHandlers({
    duration,
    audioRef,
    onProgressChange,
    onPreviewTimeChange,
    getElementDimensions
  });
  const { colorFn } = useAudioWaveformProgressColor({
    audioRef,
    color,
    colorMode,
    duration,
    getElementDimensions,
    getIsHovering,
    getMousePosition,
    gradientStops,
    gradientLightnessDelta,
    hoverColor,
    hoverColorDelta,
    progressColor
  });
  const { canvasRef, drawWaveform, handleResize } = useAudioWaveformEnvelopeRectangles({
    data,
    color: colorFn,
    gapMaxWidth,
    gapMinWidth,
    gapWidthPercent,
    heightScale,
    interpolationFn,
    segmentMinWidth
  });
  const mergedRef = useComposedRefs(elementRef, canvasRef);
  const _handleMouseMove = useCallback(
    (e) => {
      if (isActive) {
        handleMousePositionMove(e);
        handleWaveformMouseMove(e);
      }
    },
    [handleWaveformMouseMove, isActive, handleMousePositionMove]
  );
  const _handleMouseLeave = useCallback(
    (e) => {
      handleMousePositionLeave(e);
      handleWaveformMouseLeave(e);
    },
    [handleWaveformMouseLeave, handleMousePositionLeave]
  );
  const handleProgressChange = useCallback(() => {
    drawWaveform();
    onProgressChange?.(audioRef.current?.currentTime ?? 0);
  }, [drawWaveform, audioRef, onProgressChange]);
  const handleClick = useCallback(
    (e) => {
      handleWaveformClick(e);
      drawWaveform();
      onClick?.(e);
    },
    [handleWaveformClick, drawWaveform, onClick]
  );
  const {
    handleMouseEnter: handleMouseEnterDelayed,
    handleMouseMove: handleMouseMoveDelayed,
    handleMouseOut: handleMouseOutDelayed
  } = useDelayedMouseMove({
    onMouseMove: _handleMouseMove,
    onMouseLeave: _handleMouseLeave
  });
  const handleMouseEnter = useCallback(
    (e) => {
      handleMouseEnterDelayed(e);
      onMouseEnter?.(e);
    },
    [handleMouseEnterDelayed, onMouseEnter]
  );
  const handleMouseMove = useCallback(
    (e) => {
      handleMouseMoveDelayed(e);
      onMouseMove?.(e);
    },
    [handleMouseMoveDelayed, onMouseMove]
  );
  const handleMouseOut = useCallback(
    (e) => {
      handleMouseOutDelayed(e);
      onMouseLeave?.(e);
    },
    [handleMouseOutDelayed, onMouseLeave]
  );
  const { a11yProps, handleKeyDown, handleKeyUp } = useKeyboardMediaSeek({
    mediaRef: audioRef,
    seekIncrement,
    maxSeekIncrement,
    seekAcceleration,
    seekAccelerationDelay,
    seekInterval,
    duration,
    onSeekComplete: handleProgressChange
  });
  useAnimationFrame({
    isActive,
    callback: handleProgressChange,
    frameRate,
    dependencies: animationDependencies
  });
  return {
    canvasRef: mergedRef,
    a11yProps,
    handleKeyDown,
    handleKeyUp,
    handleClick,
    handleMouseEnter,
    handleMouseMove,
    handleMouseOut,
    handleResize
  };
}

function AudioWaveformProgress(props) {
  const {
    // AudioWaveformEnvelopeRectangles props
    color,
    data,
    gapMaxWidth,
    gapMinWidth,
    gapWidthPercent,
    heightScale,
    interpolationFn,
    segmentMinWidth,
    // useAudioWaveformProgressHandlers props
    audioRef,
    duration,
    onProgressChange,
    onPreviewTimeChange,
    // useAudioWaveformProgressColor props
    colorMode,
    gradientLightnessDelta,
    gradientStops,
    hoverColor,
    hoverColorDelta,
    progressColor,
    // useAnimationFrame props
    dependencies,
    frameRate,
    isActive,
    // useKeyboardSeek props
    maxSeekIncrement,
    seekAcceleration,
    seekAccelerationDelay,
    seekIncrement,
    seekInterval,
    // html canvas props
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    ref,
    ...restProps
  } = props;
  const {
    a11yProps,
    canvasRef,
    handleClick,
    handleKeyDown,
    handleKeyUp,
    handleMouseEnter,
    handleMouseMove,
    handleMouseOut,
    handleResize
  } = useAudioWaveformProgress({
    audioRef,
    color,
    colorMode,
    data,
    dependencies,
    duration,
    frameRate,
    gapMaxWidth,
    gapMinWidth,
    gapWidthPercent,
    gradientLightnessDelta,
    gradientStops,
    heightScale,
    hoverColor,
    hoverColorDelta,
    interpolationFn,
    isActive,
    maxSeekIncrement,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onProgressChange,
    onPreviewTimeChange,
    progressColor,
    seekAcceleration,
    seekAccelerationDelay,
    seekIncrement,
    seekInterval,
    segmentMinWidth
  });
  const mergedRef = useComposedRefs(ref, canvasRef);
  return /* @__PURE__ */ jsx(
    AudioWaveformProgressPrimitive,
    {
      ref: mergedRef,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      onClick: handleClick,
      onMouseEnter: handleMouseEnter,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseOut,
      onResize: handleResize,
      ...a11yProps,
      ...restProps
    }
  );
}

export { AudioWaveformProgress as A, AudioWaveformProgressPrimitive as a, useAudioWaveformProgressColor as b, useAudioWaveformProgressHandlers as c, useAudioWaveformProgress as u };
