import { useEffect, useRef, type RefObject } from 'react';
import { useRefReady } from '@/lib/useRefReady/useRefReady';

export type UseAnalyzerNodeOptions = Partial<AnalyserOptions> & {
  audioContextRef: RefObject<AudioContext | null>;
  isAudioContextReady: boolean;
  connectToAudioContext?: boolean;
};

export type UseAnalyzerNodeResult = {
  analyzerRef: RefObject<AnalyserNode | null>;
  dataArrayRef: RefObject<Uint8Array | null>;
  previousDataRef: RefObject<Uint8Array | null>;
  isAnalyzerReady: boolean;
};

export function useAnalyzerNode(options: UseAnalyzerNodeOptions): UseAnalyzerNodeResult {
  const {
    audioContextRef,
    isAudioContextReady,
    connectToAudioContext = false,
    fftSize = 2048,
    smoothingTimeConstant = 0.8,
    maxDecibels = -30,
    minDecibels = -100,
  } = options;

  const [setAnalyzerRef, isAnalyzerReady, analyzerRef] = useRefReady<AnalyserNode | null>(null);

  const dataArrayRef = useRef<Uint8Array | null>(null);
  const previousDataRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    const audioContext = audioContextRef.current;

    if (!audioContext || !isAudioContextReady || audioContext.state === 'closed') return;

    if (!analyzerRef.current) {
      const analyzer = new AnalyserNode(audioContext, {
        fftSize,
        smoothingTimeConstant,
        maxDecibels,
        minDecibels,
      });

      setAnalyzerRef(analyzer);

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
  }, [
    audioContextRef,
    isAudioContextReady,
    fftSize,
    smoothingTimeConstant,
    maxDecibels,
    minDecibels,
    setAnalyzerRef,
    analyzerRef,
  ]);

  useEffect(() => {
    if (!connectToAudioContext) return;

    const audioContext = audioContextRef.current;
    const analyzer = analyzerRef.current;

    if (
      !audioContext ||
      !isAudioContextReady ||
      audioContext.state === 'closed' ||
      !isAnalyzerReady ||
      !analyzer
    ) {
      return;
    }

    analyzer.connect(audioContext.destination);

    return () => {
      if (analyzer) {
        analyzer.disconnect(audioContext.destination);
      }
    };
  }, [connectToAudioContext, audioContextRef, isAudioContextReady, isAnalyzerReady, analyzerRef]);

  useEffect(() => {
    return () => {
      if (analyzerRef.current) {
        analyzerRef.current.disconnect();
        analyzerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    analyzerRef,
    dataArrayRef,
    previousDataRef,
    isAnalyzerReady,
  };
}
