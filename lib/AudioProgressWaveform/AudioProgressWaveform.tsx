import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useCallback, type ComponentPropsWithRef, type MouseEventHandler } from 'react';
import {
  useAudioProgressWaveformColor,
  type useAudioProgressWaveformColorOptions,
} from '@lib/AudioProgressWaveform/useAudioProgressWaveformColor';
import {
  useAudioProgressWaveform,
  type useAudioProgressWaveformOptions,
} from '@lib/AudioProgressWaveform/useAudioProgressWaveform';
import {
  type useAudioWaveformOptions,
  useAudioWaveform,
} from '@lib/AudioWaveform/useAudioWaveform';
import {
  useAnimationFrame,
  type useAnimationFrameOptions,
} from '@lib/useAnimationFrame/useAnimationFrame';
import { useComposedRefs } from '@lib/useComposedRefs/useComposedRefs';
import { CanvasResponsive } from '@lib/CanvasResponsive/CanvasResponsive';
import {
  useKeyboardMediaSeek,
  type UseKeyboardMediaSeekOptions,
} from '@lib/useKeyboardMediaSeek/useKeyboardMediaSeek';
import { useDelayedMouseMove } from '@lib/useDelayedMouseMove/useDelayedMouseMove';
export type AudioProgressWaveformProps = Omit<useAudioWaveformOptions, 'getBarColor'> &
  Omit<
    useAudioProgressWaveformColorOptions,
    'dimensionsRef' | 'hoverPositionRef' | 'getIsHovering'
  > &
  Omit<useAnimationFrameOptions, 'callback'> &
  ComponentPropsWithRef<'canvas'> &
  useAudioProgressWaveformOptions &
  Omit<UseKeyboardMediaSeekOptions, 'mediaRef'>;

export function AudioProgressWaveform(props: AudioProgressWaveformProps) {
  const {
    ref,
    className,
    onClick,
    // AudioWaveform props
    waveformData,
    barColor,
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
    handleWaveformMouseLeave,
  } = useAudioProgressWaveform({
    audioRef,
    duration,
    onProgressChange,
    onPreviewTimeChange,
  });

  const { getWaveformBarColor } = useAudioProgressWaveformColor({
    duration,
    audioRef,
    progressColor,
    barColor,
    dimensionsRef,
    getIsHovering,
    hoverPositionRef: positionRef,
    hoverColor,
    hoverColorDelta,
    colorMode,
    gradientStops,
    gradientLightnessDelta,
  });

  const { canvasRef: audioWaveformCanvasRef, drawWaveform } = useAudioWaveform({
    waveformData,
    barColor,
    getBarColor: getWaveformBarColor,
    barGapRatio,
    minBarWidth,
    heightScale,
    minBarGapPercent,
  });

  const mergedRef = useComposedRefs(ref, audioWaveformCanvasRef, audioProgressWaveformCanvasRef);

  const handleProgressChange = useCallback(() => {
    drawWaveform();
    onProgressChange?.(audioRef.current?.currentTime ?? 0);
  }, [drawWaveform, audioRef, onProgressChange]);

  const handleCanvasClick: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (event) => {
      handleWaveformClick(event);
      drawWaveform();
      onClick?.(event);
    },
    [handleWaveformClick, drawWaveform, onClick],
  );

  const _handleMouseMove: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (event) => {
      if (isActive) {
        handleWaveformMouseMove(event);
      }
    },
    [handleWaveformMouseMove, isActive],
  );

  useAnimationFrame({
    isActive,
    callback: handleProgressChange,
    frameRate,
    dependencies: animationDependencies,
  });

  const { handleKeyDown, handleKeyUp, a11yProps } = useKeyboardMediaSeek({
    mediaRef: audioRef,
    duration,
    onSeekComplete: onProgressChange,
    seekIncrement,
    maxSeekIncrement,
  });

  const { handleMouseEnter, handleMouseMove, handleMouseOut } =
    useDelayedMouseMove<HTMLCanvasElement>({
      onMouseMove: _handleMouseMove,
      onMouseLeave: handleWaveformMouseLeave,
    });

  return (
    <CanvasResponsive
      {...restProps}
      {...a11yProps}
      ref={mergedRef}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onResize={drawWaveform}
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseOut}
      onMouseEnter={handleMouseEnter}
      className={twMerge(
        clsx(
          'relative cursor-pointer bg-radial from-neutral-50 from-0% to-neutral-100 to-90% before:absolute before:inset-0 before:bg-radial before:from-white before:to-transparent before:bg-[size:1px_1px] before:content-[""]',
          className,
        ),
      )}
    />
  );
}
