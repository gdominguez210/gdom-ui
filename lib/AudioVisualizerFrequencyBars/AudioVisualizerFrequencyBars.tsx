import { useAudioVisualizerFrequencyBars } from '@lib/AudioVisualizerFrequencyBars/useAudioVisualizerFrequencyBars';
import { type ComponentPropsWithRef, type RefObject } from 'react';
import { useComposedRefs } from '@lib/useComposedRefs/useComposedRefs';
import {
  useAudioAnalyzer,
  type UseAudioAnalyzerOptions,
} from '@lib/useAudioAnalyzer/useAudioAnalyzer';
import { CanvasResponsive } from '@lib/CanvasResponsive/CanvasResponsive';
export type AudioVisualizerFrequencyBarsProps = ComponentPropsWithRef<'canvas'> &
  Omit<UseAudioAnalyzerOptions, 'dataType' | 'onAnalyze'>;

export function AudioVisualizerFrequencyBars(props: AudioVisualizerFrequencyBarsProps) {
  const {
    ref,
    isPlaying,
    audioRef,
    duration,
    audioContextRef,
    isAudioContextReady,
    fftSize,
    smoothingTimeConstant,
    frameRate,
    createAudioSource,
    deleteAudioSource,
    ...restProps
  } = props;

  const { canvasRef, drawFrequencyBars } = useAudioVisualizerFrequencyBars();

  const mergedRef = useComposedRefs(ref, canvasRef);

  useAudioAnalyzer({
    audioRef: audioRef as RefObject<HTMLAudioElement>,
    audioContextRef,
    isAudioContextReady,
    isPlaying,
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
    <CanvasResponsive
      ref={mergedRef}
      {...restProps}
    />
  );
}
