import {
  AudioWaveformProgressPrimitive,
  type AudioWaveformProgressPrimitiveProps,
} from '@/lib/AudioWaveformProgress/AudioWaveformProgressPrimitive';
import { useComposedRefs } from '@/lib/useComposedRefs/useComposedRefs';
import {
  useAudioWaveformProgress,
  type UseAudioWaveformProgressOptions,
} from '@/lib/AudioWaveformProgress/useAudioWaveformProgress';

export type AudioWaveformProgressProps = AudioWaveformProgressPrimitiveProps &
  UseAudioWaveformProgressOptions;

export function AudioWaveformProgress(props: AudioWaveformProgressProps) {
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
    handleResize,
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
    segmentMinWidth,
  });

  const mergedRef = useComposedRefs(ref, canvasRef);

  return (
    <AudioWaveformProgressPrimitive
      ref={mergedRef}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseOut}
      onResize={handleResize}
      {...a11yProps}
      {...restProps}
    />
  );
}
