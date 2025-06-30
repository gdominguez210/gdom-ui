'use strict';

const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-BqLi5MZM.js');
const clsx = require('./clsx-BtxeOLZW.js');
const React = require('react');
const interpolateOKLCH = require('./interpolateOKLCH-rIzq_qNl.js');
const useElementDimensions = require('./useElementDimensions-DeYYmJ_A.js');
const useMousePositionRef = require('./useMousePositionRef-DTS2m3L1.js');
const useAudioAmplitudeBars = require('./useAudioAmplitudeBars-CemT28K7.js');
const useAnimationFrame = require('./useAnimationFrame-CpulgwJu.js');
const useComposedRefs = require('./useComposedRefs-CewP366o.js');
const CanvasResponsive = require('./CanvasResponsive-Bryn-OAD.js');
const useKeyboardMediaSeek = require('./useKeyboardMediaSeek-CiZqxsyu.js');
const useDelayedMouseMove = require('./useDelayedMouseMove-C5F20XFY.js');

const AUDIO_PROGRESS_COLOR_MODES = {
  /**
   * Gradient effect for played regions
   */
  GRADIENT: "gradient"
};

function getInterpolatedColorString(barColor, progressColor, ratio) {
  const interpolatedColor = interpolateOKLCH.interpolateOKLCH(barColor, progressColor, ratio);
  return interpolateOKLCH.OKLCHToCSS(...interpolatedColor);
}
function generateGradientStops(progressColorOKLCH, progressColorCSS, lightnessDelta = -0.1) {
  const [l, c, h] = progressColorOKLCH;
  const adjustedLightness = lightnessDelta > 0 ? Math.min(l + lightnessDelta, 1) : Math.max(l + lightnessDelta, 0);
  const adjustedColor = interpolateOKLCH.OKLCHToCSS(adjustedLightness, c, h);
  return [
    { offset: 0, color: adjustedColor },
    { offset: 0.4, color: progressColorCSS },
    { offset: 1, color: progressColorCSS }
    // Top of bar
  ];
}
function calculateBarCoverage(barInfo, progress) {
  const halfWidth = barInfo.width / 2;
  const barStartPosition = barInfo.position - halfWidth;
  const barEndPosition = barInfo.position + halfWidth;
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
function getNormalizedHoverPosition(mousePosition, dimensions) {
  if (typeof mousePosition?.offsetX === "number" && typeof dimensions?.width === "number" && dimensions.width > 0) {
    return mousePosition.offsetX / dimensions.width;
  }
  return void 0;
}

function useAudioProgressWaveformColor(options) {
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
  const progressColorOKLCH = React.useMemo(() => interpolateOKLCH.convertColorToOKLCH(progressColor), [progressColor]);
  const colorOKLCH = React.useMemo(() => interpolateOKLCH.convertColorToOKLCH(color), [color]);
  const progressColorCSS = React.useMemo(() => interpolateOKLCH.OKLCHToCSS(...progressColorOKLCH), [progressColorOKLCH]);
  const colorCSS = React.useMemo(() => interpolateOKLCH.OKLCHToCSS(...colorOKLCH), [colorOKLCH]);
  const hoverColorOKLCH = React.useMemo(() => {
    if (hoverColor) {
      return interpolateOKLCH.convertColorToOKLCH(hoverColor);
    }
    const [l, c, h] = progressColorOKLCH;
    return [Math.min(1, l + hoverColorDelta), Math.max(0, c - c / 2), h];
  }, [hoverColor, progressColorOKLCH, hoverColorDelta]);
  const hoverColorCSS = React.useMemo(() => interpolateOKLCH.OKLCHToCSS(...hoverColorOKLCH), [hoverColorOKLCH]);
  const effectiveGradientStops = React.useMemo(() => {
    if (colorMode !== AUDIO_PROGRESS_COLOR_MODES.GRADIENT) {
      return [];
    }
    if (gradientStops) {
      return gradientStops.map((stop) => ({
        ...stop,
        colorOKLCH: interpolateOKLCH.convertColorToOKLCH(stop.color)
      }));
    }
    const generatedStops = generateGradientStops(
      progressColorOKLCH,
      progressColorCSS,
      gradientLightnessDelta
    );
    return generatedStops.map((stop) => ({
      ...stop,
      colorOKLCH: interpolateOKLCH.convertColorToOKLCH(stop.color)
    }));
  }, [colorMode, gradientStops, gradientLightnessDelta, progressColorOKLCH, progressColorCSS]);
  const getColor = React.useCallback(
    (barInfo) => {
      const progress = audioRef.current?.currentTime ? audioRef.current.currentTime / duration : 0;
      const coverage = calculateBarCoverage(barInfo, progress);
      const isHovering = getIsHovering?.();
      if (isHovering) {
        const normalizedHoverPosition = getNormalizedHoverPosition(
          hoverPositionRef?.current,
          dimensionsRef?.current
        );
        if (normalizedHoverPosition !== void 0 && shouldApplyHoverEffect(barInfo.position, progress, normalizedHoverPosition)) {
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
          const interpolatedColor = getInterpolatedColorString(
            colorOKLCH,
            stop.colorOKLCH,
            coverage
          );
          return {
            offset: stop.offset,
            color: interpolatedColor
          };
        });
        return {
          type: "gradient",
          stops: interpolatedStops
        };
      }
      return getInterpolatedColorString(colorOKLCH, progressColorOKLCH, coverage);
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
    getColor
  };
}

function useAudioProgressWaveform(options) {
  const { onProgressChange, onPreviewTimeChange, audioRef, duration } = options;
  const { dimensionsRef, elementRef: canvasRef } = useElementDimensions.useElementDimensions();
  const { getPosition, getIsHovering, positionRef, handleMouseMove, handleMouseLeave } = useMousePositionRef.useMousePositionRef();
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
  const handleWaveformClick = React.useCallback(
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
      handleMouseMove(e);
      const { width, left } = dimensionsRef.current;
      if (width === 0) return;
      const mouseX = e.clientX - left;
      const position = mouseX / width;
      updatePreviewFromPosition(position);
    },
    [dimensionsRef, handleMouseMove, updatePreviewFromPosition]
  );
  const handleWaveformMouseLeave = React.useCallback(
    (e) => {
      handleMouseLeave(e);
      updatePreviewFromPosition(null);
    },
    [handleMouseLeave, updatePreviewFromPosition]
  );
  return {
    canvasRef,
    dimensionsRef,
    handleWaveformClick,
    handleWaveformMouseMove,
    handleWaveformMouseLeave,
    getPosition,
    getIsHovering,
    positionRef
  };
}

function AudioProgressWaveform(props) {
  const {
    ref,
    className,
    onClick,
    // AudioWaveformBars props
    amplitudeData,
    color,
    barGapRatio,
    minBarWidth,
    heightScale,
    minBarGapPercent,
    // useAudioProgressWaveform props
    audioRef,
    duration,
    onProgressChange,
    onPreviewTimeChange,
    // useAudioProgressWaveformColor props
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
    ...restProps
  } = props;
  const {
    canvasRef: audioProgressWaveformCanvasRef,
    handleWaveformClick,
    dimensionsRef,
    getIsHovering,
    positionRef,
    handleWaveformMouseMove,
    handleWaveformMouseLeave
  } = useAudioProgressWaveform({
    audioRef,
    duration,
    onProgressChange,
    onPreviewTimeChange
  });
  const { getColor } = useAudioProgressWaveformColor({
    duration,
    audioRef,
    progressColor,
    color,
    dimensionsRef,
    getIsHovering,
    hoverPositionRef: positionRef,
    hoverColor,
    hoverColorDelta,
    colorMode,
    gradientStops,
    gradientLightnessDelta
  });
  const { canvasRef: audioAmplitudeCanvasRef, drawWaveform } = useAudioAmplitudeBars.useAudioAmplitudeBars({
    amplitudeData,
    color,
    getColor,
    barGapRatio,
    minBarWidth,
    heightScale,
    minBarGapPercent
  });
  const mergedRef = useComposedRefs.useComposedRefs(ref, audioAmplitudeCanvasRef, audioProgressWaveformCanvasRef);
  const handleProgressChange = React.useCallback(() => {
    drawWaveform();
    onProgressChange?.(audioRef.current?.currentTime ?? 0);
  }, [drawWaveform, audioRef, onProgressChange]);
  const handleCanvasClick = React.useCallback(
    (event) => {
      handleWaveformClick(event);
      drawWaveform();
      onClick?.(event);
    },
    [handleWaveformClick, drawWaveform, onClick]
  );
  const _handleMouseMove = React.useCallback(
    (event) => {
      if (isActive) {
        handleWaveformMouseMove(event);
      }
    },
    [handleWaveformMouseMove, isActive]
  );
  useAnimationFrame.useAnimationFrame({
    isActive,
    callback: handleProgressChange,
    frameRate,
    dependencies: animationDependencies
  });
  const { handleKeyDown, handleKeyUp, a11yProps } = useKeyboardMediaSeek.useKeyboardMediaSeek({
    mediaRef: audioRef,
    duration,
    onSeekComplete: onProgressChange,
    seekIncrement,
    maxSeekIncrement,
    seekAcceleration,
    seekAccelerationDelay,
    seekInterval
  });
  const { handleMouseEnter, handleMouseMove, handleMouseOut } = useDelayedMouseMove.useDelayedMouseMove({
    onMouseMove: _handleMouseMove,
    onMouseLeave: handleWaveformMouseLeave
  });
  return /* @__PURE__ */ jsxRuntime.jsx(
    CanvasResponsive.CanvasResponsive,
    {
      ...restProps,
      ...a11yProps,
      ref: mergedRef,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      onResize: drawWaveform,
      onClick: handleCanvasClick,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseOut,
      onMouseEnter: handleMouseEnter,
      className: bundleMjs.twMerge(
        clsx.clsx(
          'relative cursor-pointer bg-radial from-neutral-50 from-0% to-neutral-100 to-90% before:absolute before:inset-0 before:bg-radial before:from-white before:to-transparent before:bg-[size:1px_1px] before:content-[""]',
          className
        )
      )
    }
  );
}

exports.AudioProgressWaveform = AudioProgressWaveform;
exports.useAudioProgressWaveformColor = useAudioProgressWaveformColor;
