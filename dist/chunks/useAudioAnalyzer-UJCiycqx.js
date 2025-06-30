import { u as useAnimationFrame } from './useAnimationFrame-1lZDWPZz.js';
import { useCallback } from 'react';
import { u as useAnalyzerNode } from './useAnalyzerNode-6qSzDrcX.js';
import { u as useAudioSourceConnection } from './useAudioSourceConnection-DXp1MCIA.js';

function smoothData(current, previous, factor = 0.3) {
  const result = new Uint8Array(current.length);
  current.forEach((value, index) => {
    const currentValue = value !== void 0 ? value : 128;
    const previousValue = previous[index] !== void 0 ? previous[index] : 128;
    result[index] = Math.round(
      previousValue * factor + currentValue * (1 - factor)
    );
  });
  return result;
}
function useAudioAnalyzer(options) {
  const {
    audioRef,
    audioContextRef,
    createAudioSource,
    deleteAudioSource,
    isAudioContextReady,
    isActive,
    duration,
    smoothingTimeConstant,
    fftSize,
    frameRate = 30,
    onAnalyze,
    dataType = "timeDomain",
    frameTransitionSmoothing = 0.3
  } = options;
  const { analyzerRef, dataArrayRef, previousDataRef, isAnalyzerReady } = useAnalyzerNode({
    audioContextRef,
    isAudioContextReady,
    fftSize,
    smoothingTimeConstant,
    connectToAudioContext: true
  });
  const analyzeAudio = useCallback(() => {
    if (!analyzerRef.current || !dataArrayRef.current || !previousDataRef.current) {
      return;
    }
    const analyzer = analyzerRef.current;
    const dataArray = dataArrayRef.current;
    const previousData = previousDataRef.current;
    dataArray.forEach((value, index) => {
      previousData[index] = value !== void 0 ? Number(value) : 128;
    });
    dataType === "timeDomain" ? analyzer.getByteTimeDomainData(dataArray) : analyzer.getByteFrequencyData(dataArray);
    const smoothedData = smoothData(dataArray, previousData, frameTransitionSmoothing);
    onAnalyze?.(smoothedData, analyzer);
  }, [dataType, onAnalyze, frameTransitionSmoothing, analyzerRef, dataArrayRef, previousDataRef]);
  useAnimationFrame({
    isActive,
    callback: analyzeAudio,
    frameRate,
    dependencies: [duration]
  });
  useAudioSourceConnection({
    audioRef,
    destinationRef: analyzerRef,
    createAudioSource,
    deleteAudioSource,
    isDestinationReady: isAnalyzerReady
  });
  return {
    analyzerNode: analyzerRef.current,
    dataArray: dataArrayRef.current,
    previousDataArray: previousDataRef.current
  };
}

export { useAudioAnalyzer as u };
