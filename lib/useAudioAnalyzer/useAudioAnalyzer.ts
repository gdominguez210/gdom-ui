import { useAnimationFrame } from '@/lib/useAnimationFrame/useAnimationFrame';
import { useCallback } from 'react';
import { useAnalyzerNode } from '@/lib/useAnalyzerNode/useAnalyzerNode';
import { useAudioSourceConnection } from '@/lib/useAudioSourceConnection/useAudioSourceConnection';
import type { UseAudioContextWebAPIReturn } from '@/lib/useAudioContextWebAPI/useAudioContextWebAPI';

/**
 * Smooths the data between frames
 * @param current - The current frame's data
 * @param previous - The previous frame's data
 * @param factor - The smoothing factor (0-1)
 * @returns The smoothed data
 */
function smoothData(current: Uint8Array, previous: Uint8Array, factor = 0.3): Uint8Array {
  const result = new Uint8Array(current.length);
  current.forEach((value, index) => {
    const currentValue = value !== undefined ? value : 128;
    const previousValue = previous[index] !== undefined ? previous[index] : 128;
    result[index] = Math.round(
      (previousValue as number) * factor + (currentValue as number) * (1 - factor),
    );
  });

  return result;
}

export type UseAudioAnalyzerOptions = Partial<AnalyserOptions> & {
  /**
   * Reference to the audio element
   */
  audioRef: React.RefObject<HTMLAudioElement | null>;

  /**
   * Reference to the shared AudioContext
   */
  audioContextRef: UseAudioContextWebAPIReturn['audioContextRef'];

  /**
   * Function to create an audio source node
   */
  createAudioSource: UseAudioContextWebAPIReturn['createAudioSource'];

  /**
   * Function to delete an audio source node
   */
  deleteAudioSource: UseAudioContextWebAPIReturn['deleteAudioSource'];

  /**
   * Whether the audio context has been initialized
   */
  isAudioContextReady: UseAudioContextWebAPIReturn['isReady'];

  /**
   * Whether the audio analyzer is active
   */
  isActive: boolean;

  /**
   * Audio duration in seconds
   */
  duration?: number;
  /**
   * Frame rate for the analysis in frames per second
   */
  frameRate?: number;

  /**
   * Callback that runs on each frame with the latest audio data
   */
  onAnalyze?: (dataArray: Uint8Array, analyzerNode: AnalyserNode) => void;

  /**
   * Type of data to retrieve
   */
  dataType?: 'timeDomain' | 'frequency';

  /**
   * Smoothing factor for transitions between frames (0-1)
   * Higher values create more gradual visual transitions
   * 0 = no smoothing, 1 = maximum smoothing
   */
  frameTransitionSmoothing?: number;
};

export type UseAudioAnalyzerReturn = {
  /**
   * The AnalyserNode instance
   */
  analyzerNode: AnalyserNode | null;

  /**
   * The current audio data array
   */
  dataArray: Uint8Array | null;

  /**
   * The previous frame's audio data array (for smoothing)
   */
  previousDataArray: Uint8Array | null;
};

/**
 * Hook for analyzing audio data from an audio element
 */
export function useAudioAnalyzer(options: UseAudioAnalyzerOptions): UseAudioAnalyzerReturn {
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
    dataType = 'timeDomain',
    frameTransitionSmoothing = 0.3,
  } = options;

  const { analyzerRef, dataArrayRef, previousDataRef, isAnalyzerReady } = useAnalyzerNode({
    audioContextRef,
    isAudioContextReady,
    fftSize,
    smoothingTimeConstant,
    connectToAudioContext: true,
  });

  const analyzeAudio = useCallback(() => {
    if (!analyzerRef.current || !dataArrayRef.current || !previousDataRef.current) {
      return;
    }

    const analyzer = analyzerRef.current;
    const dataArray = dataArrayRef.current;
    const previousData = previousDataRef.current;

    dataArray.forEach((value, index) => {
      previousData[index] = value !== undefined ? Number(value) : 128;
    });

    dataType === 'timeDomain'
      ? analyzer.getByteTimeDomainData(dataArray)
      : analyzer.getByteFrequencyData(dataArray);

    const smoothedData = smoothData(dataArray, previousData, frameTransitionSmoothing);

    onAnalyze?.(smoothedData, analyzer);
  }, [dataType, onAnalyze, frameTransitionSmoothing, analyzerRef, dataArrayRef, previousDataRef]);

  useAnimationFrame({
    isActive,
    callback: analyzeAudio,
    frameRate,
    dependencies: [duration],
  });

  useAudioSourceConnection({
    audioRef,
    destinationRef: analyzerRef,
    createAudioSource,
    deleteAudioSource,
    isDestinationReady: isAnalyzerReady,
  });

  return {
    analyzerNode: analyzerRef.current,
    dataArray: dataArrayRef.current,
    previousDataArray: previousDataRef.current,
  };
}
