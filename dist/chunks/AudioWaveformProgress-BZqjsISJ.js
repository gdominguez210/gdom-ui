'use strict';

const jsxRuntime = require('react/jsx-runtime');
const CanvasResponsive = require('./CanvasResponsive-C2Oot7ZB.js');
const bundleMjs = require('./bundle-mjs-BqLi5MZM.js');
const clsx = require('./clsx-BtxeOLZW.js');
const useComposedRefs = require('./useComposedRefs-CewP366o.js');
const React = require('react');
const useElementDimensions = require('./useElementDimensions-DeYYmJ_A.js');
const useColorTransition = require('./useColorTransition-C9Cwz0Jp.js');
const useAnimationFrame = require('./useAnimationFrame-CpulgwJu.js');
const useAudioWaveformEnvelopeRectangles = require('./useAudioWaveformEnvelopeRectangles-BnaSTpJ9.js');
const useKeyboardMediaSeek = require('./useKeyboardMediaSeek-CiZqxsyu.js');
const useDelayedMouseMove = require('./useDelayedMouseMove-C5F20XFY.js');
const useMousePositionRef = require('./useMousePositionRef-DTS2m3L1.js');

function AudioWaveformProgressPrimitive(props) {
  const { className, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    CanvasResponsive.CanvasResponsive,
    {
      ...restProps,
      className: bundleMjs.twMerge(
        clsx.clsx(
          'relative cursor-pointer bg-radial from-neutral-50 from-0% to-neutral-100 to-90% before:absolute before:inset-0 before:bg-radial before:from-white before:to-transparent before:bg-[size:1px_1px] before:content-[""]',
          className
        )
      )
    }
  );
}

function useAudioWaveformProgressHandlers(options) {
  const { onProgressChange, onPreviewTimeChange, audioRef, duration } = options;
  const { dimensionsRef, elementRef: canvasRef } = useElementDimensions.useElementDimensions();
  const seekToPosition = React.useCallback(
    (position) => {
      if (!audioRef.current) return;
      const normalizedPosition = Math.max(0, Math.min(1, position));
      const timeToSeek = normalizedPosition * duration;
      audioRef.current.currentTime = timeToSeek;
      onProgressChange?.(timeToSeek);
    },
    [audioRef, duration, onProgressChange]
  );
  const updatePreviewFromPosition = React.useCallback(
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
  const handleClick = React.useCallback(
    (e) => {
      const { width, left } = dimensionsRef.current;
      if (width === 0) return;
      const clickX = e.clientX - left;
      const position = clickX / width;
      seekToPosition(position);
    },
    [dimensionsRef, seekToPosition]
  );
  const handleWaveformMouseMove = React.useCallback(
    (e) => {
      const { width, left } = dimensionsRef.current;
      if (width === 0) return;
      const mouseX = e.clientX - left;
      const position = mouseX / width;
      updatePreviewFromPosition(position);
    },
    [dimensionsRef, updatePreviewFromPosition]
  );
  const handleWaveformMouseLeave = React.useCallback(() => {
    updatePreviewFromPosition(null);
  }, [updatePreviewFromPosition]);
  return {
    canvasRef,
    dimensionsRef,
    handleClick,
    handleMouseMove: handleWaveformMouseMove,
    handleMouseLeave: handleWaveformMouseLeave
  };
}

function getInterpolatedColorString(barColor, progressColor, ratio) {
  const interpolatedColor = useColorTransition.interpolateOKLCH(barColor, progressColor, ratio);
  return useColorTransition.OKLCHToCSS(...interpolatedColor);
}
function generateGradientStops(progressColorOKLCH, progressColorCSS, lightnessDelta = -0.1) {
  const [l, c, h] = progressColorOKLCH;
  const adjustedLightness = lightnessDelta > 0 ? Math.min(l + lightnessDelta, 1) : Math.max(l + lightnessDelta, 0);
  const adjustedColor = useColorTransition.OKLCHToCSS(adjustedLightness, c, h);
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
    dimensionsRef,
    progressColor = "#4a5565",
    color = "#9f9fa9",
    getIsHovering,
    hoverPositionRef,
    hoverColor,
    hoverColorDelta = 0.15,
    colorMode = AUDIO_PROGRESS_COLOR_MODES.GRADIENT,
    gradientStops,
    gradientLightnessDelta = -0.1
  } = options;
  const progressColorOKLCH = React.useMemo(() => useColorTransition.convertColorToOKLCH(progressColor), [progressColor]);
  const colorOKLCH = React.useMemo(() => useColorTransition.convertColorToOKLCH(color), [color]);
  const progressColorCSS = React.useMemo(() => useColorTransition.OKLCHToCSS(...progressColorOKLCH), [progressColorOKLCH]);
  const colorCSS = React.useMemo(() => useColorTransition.OKLCHToCSS(...colorOKLCH), [colorOKLCH]);
  const hoverColorOKLCH = React.useMemo(() => {
    if (hoverColor) {
      return useColorTransition.convertColorToOKLCH(hoverColor);
    }
    const [l, c, h] = progressColorOKLCH;
    return [Math.min(1, l + hoverColorDelta), Math.max(0, c - c / 2), h];
  }, [hoverColor, progressColorOKLCH, hoverColorDelta]);
  const hoverColorCSS = React.useMemo(() => useColorTransition.OKLCHToCSS(...hoverColorOKLCH), [hoverColorOKLCH]);
  const effectiveGradientStops = React.useMemo(() => {
    if (colorMode !== AUDIO_PROGRESS_COLOR_MODES.GRADIENT) {
      return [];
    }
    if (gradientStops) {
      return gradientStops.map((stop) => ({
        ...stop,
        colorOKLCH: useColorTransition.convertColorToOKLCH(stop.color)
      }));
    }
    const generatedStops = generateGradientStops(
      progressColorOKLCH,
      progressColorCSS,
      gradientLightnessDelta
    );
    return generatedStops.map((stop) => ({
      ...stop,
      colorOKLCH: useColorTransition.convertColorToOKLCH(stop.color)
    }));
  }, [colorMode, gradientStops, gradientLightnessDelta, progressColorOKLCH, progressColorCSS]);
  const colorFn = React.useCallback(
    (segmentInfo) => {
      const { position, widthPercent } = segmentInfo;
      const progress = audioRef.current?.currentTime ? audioRef.current.currentTime / duration : 0;
      const coverage = calculateBarCoverage(position, widthPercent, progress);
      const isHovering = getIsHovering?.();
      if (isHovering && hoverPositionRef?.current?.offsetX && dimensionsRef?.current?.width) {
        const normalizedHoverPosition = getNormalizedHoverPosition(
          hoverPositionRef.current.offsetX,
          dimensionsRef.current.width
        );
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
      hoverPositionRef,
      hoverColorCSS,
      dimensionsRef
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
  const {
    getIsHovering,
    positionRef,
    handleMouseMove: handleMousePositionMove,
    handleMouseLeave: handleMousePositionLeave
  } = useMousePositionRef.useMousePositionRef();
  const {
    canvasRef,
    dimensionsRef,
    handleClick: handleWaveformClick,
    handleMouseMove: handleWaveformMouseMove,
    handleMouseLeave: handleWaveformMouseLeave
  } = useAudioWaveformProgressHandlers({
    duration,
    audioRef,
    onProgressChange,
    onPreviewTimeChange
  });
  const { colorFn } = useAudioWaveformProgressColor({
    duration,
    audioRef,
    color,
    dimensionsRef,
    hoverPositionRef: positionRef,
    hoverColor,
    hoverColorDelta,
    colorMode,
    gradientStops,
    gradientLightnessDelta,
    progressColor,
    getIsHovering
  });
  const {
    canvasRef: envelopeRectanglesCanvasRef,
    drawWaveform,
    handleResize
  } = useAudioWaveformEnvelopeRectangles.useAudioWaveformEnvelopeRectangles({
    data,
    color: colorFn,
    gapMaxWidth,
    gapMinWidth,
    gapWidthPercent,
    heightScale,
    interpolationFn,
    segmentMinWidth
  });
  const mergedRef = useComposedRefs.useComposedRefs(canvasRef, envelopeRectanglesCanvasRef);
  const _handleMouseMove = React.useCallback(
    (e) => {
      if (isActive) {
        handleMousePositionMove(e);
        handleWaveformMouseMove(e);
      }
    },
    [handleWaveformMouseMove, isActive, handleMousePositionMove]
  );
  const _handleMouseLeave = React.useCallback(
    (e) => {
      handleMousePositionLeave(e);
      handleWaveformMouseLeave(e);
    },
    [handleWaveformMouseLeave, handleMousePositionLeave]
  );
  const handleProgressChange = React.useCallback(() => {
    drawWaveform();
    onProgressChange?.(audioRef.current?.currentTime ?? 0);
  }, [drawWaveform, audioRef, onProgressChange]);
  const handleClick = React.useCallback(
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
  } = useDelayedMouseMove.useDelayedMouseMove({
    onMouseMove: _handleMouseMove,
    onMouseLeave: _handleMouseLeave
  });
  const handleMouseEnter = React.useCallback(
    (e) => {
      handleMouseEnterDelayed(e);
      onMouseEnter?.(e);
    },
    [handleMouseEnterDelayed, onMouseEnter]
  );
  const handleMouseMove = React.useCallback(
    (e) => {
      handleMouseMoveDelayed(e);
      onMouseMove?.(e);
    },
    [handleMouseMoveDelayed, onMouseMove]
  );
  const handleMouseOut = React.useCallback(
    (e) => {
      handleMouseOutDelayed(e);
      onMouseLeave?.(e);
    },
    [handleMouseOutDelayed, onMouseLeave]
  );
  const { a11yProps, handleKeyDown, handleKeyUp } = useKeyboardMediaSeek.useKeyboardMediaSeek({
    mediaRef: audioRef,
    seekIncrement,
    maxSeekIncrement,
    seekAcceleration,
    seekAccelerationDelay,
    seekInterval,
    duration,
    onSeekComplete: handleProgressChange
  });
  useAnimationFrame.useAnimationFrame({
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
  const mergedRef = useComposedRefs.useComposedRefs(ref, canvasRef);
  return /* @__PURE__ */ jsxRuntime.jsx(
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

exports.AudioWaveformProgress = AudioWaveformProgress;
exports.AudioWaveformProgressPrimitive = AudioWaveformProgressPrimitive;
exports.useAudioWaveformProgress = useAudioWaveformProgress;
exports.useAudioWaveformProgressColor = useAudioWaveformProgressColor;
exports.useAudioWaveformProgressHandlers = useAudioWaveformProgressHandlers;
