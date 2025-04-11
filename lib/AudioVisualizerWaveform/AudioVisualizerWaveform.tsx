import { useAudioVisualizerWaveform } from '@lib/AudioVisualizerWaveform/useAudioVisualizerWaveform';
import { type ComponentPropsWithRef, type RefObject } from 'react';
import { useComposedRefs } from '@lib/useComposedRefs/useComposedRefs';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import {
  useAudioAnalyzer,
  type AudioAnalyzerOptions,
} from '@lib/useAudioAnalyzer/useAudioAnalyzer';

export type AudioVisualizerWaveformProps = ComponentPropsWithRef<'canvas'> &
  Omit<AudioAnalyzerOptions, 'dataType' | 'onAnalyze'>;

export function AudioVisualizerWaveform(props: AudioVisualizerWaveformProps) {
  const {
    className,
    ref,
    isPlaying,
    audioRef,
    duration,
    audioContextRef,
    isAudioContextReady,
    createAudioSource,
    deleteAudioSource,
    fftSize,
    smoothingTimeConstant,
    frameRate,
    ...restProps
  } = props;

  const { canvasRef, drawWaveform } = useAudioVisualizerWaveform();

  const mergedRef = useComposedRefs(ref, canvasRef);

  useAudioAnalyzer({
    audioRef: audioRef as RefObject<HTMLAudioElement>,
    audioContextRef,
    isAudioContextReady,
    isPlaying,
    duration,
    onAnalyze: drawWaveform,
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
