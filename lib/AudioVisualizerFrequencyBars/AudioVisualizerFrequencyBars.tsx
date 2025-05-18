import {
  useAudioVisualizerFrequencyBars,
  type useAudioVisualizerFrequencyBarOptions,
} from '@lib/AudioVisualizerFrequencyBars/useAudioVisualizerFrequencyBars';
import { useEffect, type ComponentPropsWithRef, type RefObject } from 'react';
import { useComposedRefs } from '@lib/useComposedRefs/useComposedRefs';
import { useLatest } from '@lib/useLatest/useLatest';
import {
  useAudioAnalyzer,
  type UseAudioAnalyzerOptions,
} from '@lib/useAudioAnalyzer/useAudioAnalyzer';
import { AudioVisualizerCanvas } from '@lib/AudioVisualizerCanvas/AudioVisualizerCanvas';

export type AudioVisualizerFrequencyBarsProps = Omit<ComponentPropsWithRef<'canvas'>, 'onResize'> &
  Omit<UseAudioAnalyzerOptions, 'dataType' | 'onAnalyze'> &
  useAudioVisualizerFrequencyBarOptions;

export function AudioVisualizerFrequencyBars(props: AudioVisualizerFrequencyBarsProps) {
  const {
    ref,
    isActive,
    audioRef,
    duration,
    audioContextRef,
    isAudioContextReady,
    fftSize,
    smoothingTimeConstant,
    frameRate,
    frameTransitionSmoothing,
    createAudioSource,
    deleteAudioSource,
    barColor,
    barGapRatio,
    barCount,
    heightMultiplier,
    minBarHeight,
    colorMode,
    colorTransitionDuration,
    ...restProps
  } = props;

  const { canvasRef, drawFrequencyBars, clearCanvas } = useAudioVisualizerFrequencyBars({
    barColor,
    barGapRatio,
    barCount,
    heightMultiplier,
    minBarHeight,
    colorMode,
    colorTransitionDuration,
  });

  const isActiveRef = useLatest(isActive);

  const mergedRef = useComposedRefs(ref, canvasRef);

  useAudioAnalyzer({
    audioRef: audioRef as RefObject<HTMLAudioElement>,
    audioContextRef,
    isAudioContextReady,
    isActive,
    duration,
    onAnalyze: drawFrequencyBars,
    dataType: 'frequency',
    fftSize,
    smoothingTimeConstant,
    frameRate,
    frameTransitionSmoothing,
    createAudioSource,
    deleteAudioSource,
  });

  useEffect(() => {
    if (!isActiveRef.current) {
      clearCanvas();
    }
  }, [duration, isActiveRef, clearCanvas]);

  return (
    <AudioVisualizerCanvas
      ref={mergedRef}
      frameRate={frameRate}
      {...restProps}
    />
  );
}
