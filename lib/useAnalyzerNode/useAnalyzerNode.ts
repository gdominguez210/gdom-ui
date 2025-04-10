import { useEffect, useRef, type RefObject } from 'react';

export type UseAnalyzerNodeOptions = Partial<AnalyserOptions> & {
  audioContextRef: RefObject<AudioContext | null>;
  isAudioContextInitialized: boolean;
};

export type UseAnalyzerNodeResult = {
  analyzerRef: RefObject<AnalyserNode | null>;
  dataArrayRef: RefObject<Uint8Array | null>;
  previousDataRef: RefObject<Uint8Array | null>;
};

export function useAnalyzerNode(options: UseAnalyzerNodeOptions): UseAnalyzerNodeResult {
  const {
    audioContextRef,
    isAudioContextInitialized,
    fftSize = 2048,
    smoothingTimeConstant = 0.8,
    maxDecibels = -30,
    minDecibels = -100,
  } = options;

  const analyzerRef = useRef<AnalyserNode | null>(null);

  const dataArrayRef = useRef<Uint8Array | null>(null);
  const previousDataRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    const audioContext = audioContextRef.current;

    if (!audioContext || !isAudioContextInitialized || audioContext.state === 'closed') return;

    if (!analyzerRef.current) {
      const analyzer = new AnalyserNode(audioContext, {
        fftSize,
        smoothingTimeConstant,
        maxDecibels,
        minDecibels,
      });

      analyzerRef.current = analyzer;

      const dataArray = new Uint8Array(analyzer.frequencyBinCount);
      dataArrayRef.current = dataArray;

      const previousData = new Uint8Array(analyzer.frequencyBinCount);
      previousDataRef.current = previousData;
    } else {
      const analyzer = analyzerRef.current;

      analyzer.fftSize = fftSize;
      analyzer.smoothingTimeConstant = smoothingTimeConstant;
      analyzer.maxDecibels = maxDecibels;
      analyzer.minDecibels = minDecibels;

      if (dataArrayRef.current?.length !== analyzer.frequencyBinCount) {
        dataArrayRef.current = new Uint8Array(analyzer.frequencyBinCount);
        previousDataRef.current = new Uint8Array(analyzer.frequencyBinCount);
      }
    }

    return () => {
      if (analyzerRef.current) {
        analyzerRef.current.disconnect();
        analyzerRef.current = null;
      }
    };
  }, [
    audioContextRef,
    isAudioContextInitialized,
    fftSize,
    smoothingTimeConstant,
    maxDecibels,
    minDecibels,
  ]);

  return {
    analyzerRef,
    dataArrayRef,
    previousDataRef,
  };
}
