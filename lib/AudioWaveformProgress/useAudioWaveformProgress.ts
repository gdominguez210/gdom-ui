import { useCallback, type ComponentPropsWithRef, type MouseEventHandler } from 'react';
import {
  useAudioWaveformProgressHandlers,
  type UseAudioWaveformProgressHandlersOptions,
} from '@/lib/AudioWaveformProgress/useAudioWaveformProgressHandlers';
import {
  useAudioWaveformProgressColor,
  type UseAudioWaveformProgressColorOptions,
} from '@/lib/AudioWaveformProgress/useAudioWaveformProgressColor';
import {
  useAnimationFrame,
  type UseAnimationFrameOptions,
} from '@/lib/useAnimationFrame/useAnimationFrame';
import {
  useAudioWaveformEnvelopeRectangles,
  type UseAudioWaveformEnvelopeRectanglesOptions,
} from '@/lib/AudioWaveformEnvelopeRectangles/useAudioWaveformEnvelopeRectangles';
import {
  useKeyboardMediaSeek,
  type UseKeyboardMediaSeekOptions,
} from '@/lib/useKeyboardMediaSeek/useKeyboardMediaSeek';
import { useDelayedMouseMove } from '@/lib/useDelayedMouseMove/useDelayedMouseMove';
import { useComposedRefs } from '@/lib/useComposedRefs/useComposedRefs';
import { useMousePositionRef } from '@/lib/useMousePositionRef/useMousePositionRef';

export type UseAudioWaveformProgressOptions = UseAudioWaveformProgressHandlersOptions &
  Omit<
    UseAudioWaveformProgressColorOptions,
    'dimensionsRef' | 'hoverPositionRef' | 'getIsHovering'
  > &
  Omit<UseAudioWaveformEnvelopeRectanglesOptions, 'color'> &
  Omit<UseAnimationFrameOptions, 'callback'> &
  Omit<UseKeyboardMediaSeekOptions, 'mediaRef'> &
  Pick<
    ComponentPropsWithRef<'canvas'>,
    'onClick' | 'onMouseEnter' | 'onMouseMove' | 'onMouseLeave'
  >;

export function useAudioWaveformProgress(props: UseAudioWaveformProgressOptions) {
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
    onMouseLeave,
  } = props;

  const {
    getIsHovering,
    positionRef,
    handleMouseMove: handleMousePositionMove,
    handleMouseLeave: handleMousePositionLeave,
  } = useMousePositionRef();

  const {
    canvasRef,
    dimensionsRef,
    handleClick: handleWaveformClick,
    handleMouseMove: handleWaveformMouseMove,
    handleMouseLeave: handleWaveformMouseLeave,
  } = useAudioWaveformProgressHandlers({
    duration,
    audioRef,
    onProgressChange,
    onPreviewTimeChange,
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
    getIsHovering,
  });

  const {
    canvasRef: envelopeRectanglesCanvasRef,
    drawWaveform,
    handleResize,
  } = useAudioWaveformEnvelopeRectangles({
    data,
    color: colorFn,
    gapMaxWidth,
    gapMinWidth,
    gapWidthPercent,
    heightScale,
    interpolationFn,
    segmentMinWidth,
  });

  const mergedRef = useComposedRefs(canvasRef, envelopeRectanglesCanvasRef);

  const _handleMouseMove: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (e) => {
      if (isActive) {
        handleMousePositionMove(e);
        handleWaveformMouseMove(e);
      }
    },
    [handleWaveformMouseMove, isActive, handleMousePositionMove],
  );

  const _handleMouseLeave: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (e) => {
      handleMousePositionLeave(e);
      handleWaveformMouseLeave(e);
    },
    [handleWaveformMouseLeave, handleMousePositionLeave],
  );

  const handleProgressChange = useCallback(() => {
    drawWaveform();
    onProgressChange?.(audioRef.current?.currentTime ?? 0);
  }, [drawWaveform, audioRef, onProgressChange]);

  const handleClick: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (e) => {
      handleWaveformClick(e);
      drawWaveform();
      onClick?.(e);
    },
    [handleWaveformClick, drawWaveform, onClick],
  );

  const {
    handleMouseEnter: handleMouseEnterDelayed,
    handleMouseMove: handleMouseMoveDelayed,
    handleMouseOut: handleMouseOutDelayed,
  } = useDelayedMouseMove<HTMLCanvasElement>({
    onMouseMove: _handleMouseMove,
    onMouseLeave: _handleMouseLeave,
  });

  const handleMouseEnter: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (e) => {
      handleMouseEnterDelayed(e);
      onMouseEnter?.(e);
    },
    [handleMouseEnterDelayed, onMouseEnter],
  );

  const handleMouseMove: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (e) => {
      handleMouseMoveDelayed(e);
      onMouseMove?.(e);
    },
    [handleMouseMoveDelayed, onMouseMove],
  );

  const handleMouseOut: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (e) => {
      handleMouseOutDelayed(e);
      onMouseLeave?.(e);
    },
    [handleMouseOutDelayed, onMouseLeave],
  );

  const { a11yProps, handleKeyDown, handleKeyUp } = useKeyboardMediaSeek({
    mediaRef: audioRef,
    seekIncrement,
    maxSeekIncrement,
    seekAcceleration,
    seekAccelerationDelay,
    seekInterval,
    duration,
    onSeekComplete: handleProgressChange,
  });

  useAnimationFrame({
    isActive,
    callback: handleProgressChange,
    frameRate,
    dependencies: animationDependencies,
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
    handleResize,
  };
}
