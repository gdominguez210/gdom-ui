import { useAudioVisualizerFrequencyBars } from '@lib/AudioVisualizerFrequencyBars/useAudioVisualizerFrequencyBars';
import { type ComponentPropsWithRef, type RefObject } from 'react';
import { useComposedRefs } from '@lib/useComposedRefs/useComposedRefs';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import {
  useAudioAnalyzer,
  type UseAudioAnalyzerOptions,
} from '@lib/useAudioAnalyzer/useAudioAnalyzer';

export type AudioVisualizerFrequencyBarsProps = ComponentPropsWithRef<'canvas'> &
  Omit<UseAudioAnalyzerOptions, 'dataType' | 'onAnalyze'>;

export function AudioVisualizerFrequencyBars(props: AudioVisualizerFrequencyBarsProps) {
  const {
    className,
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
    <canvas
      className={twMerge(clsx('w-full max-w-full', className))}
      ref={mergedRef}
      {...restProps}
    />
  );
}
