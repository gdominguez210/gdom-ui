import {
  useAudioVisualizerFrequencyBars,
  type useAudioVisualizerFrequencyBarOptions,
} from '@lib/AudioVisualizerFrequencyBars/useAudioVisualizerFrequencyBars';
import { type ComponentPropsWithRef, type RefObject } from 'react';
import { useComposedRefs } from '@lib/useComposedRefs/useComposedRefs';
import {
  useAudioAnalyzer,
  type UseAudioAnalyzerOptions,
} from '@lib/useAudioAnalyzer/useAudioAnalyzer';
import { AudioVisualizerCanvas } from '@lib/AudioVisualizerCanvas/AudioVisualizerCanvas';

export type AudioVisualizerFrequencyBarsProps = ComponentPropsWithRef<'canvas'> &
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
    createAudioSource,
    deleteAudioSource,
    barColor,
    barGapRatio,
    barCount,
    heightMultiplier,
    minHeight,
    colorMode,
    ...restProps
  } = props;

  const { canvasRef, drawFrequencyBars } = useAudioVisualizerFrequencyBars({
    barColor,
    barGapRatio,
    barCount,
    heightMultiplier,
    minHeight,
    colorMode,
  });

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
    createAudioSource,
    deleteAudioSource,
  });

  return (
    <AudioVisualizerCanvas
      ref={mergedRef}
      frameRate={frameRate}
      {...restProps}
    />
  );
}
