import { UseAudioContextWebAPIReturn } from '../useAudioContextWebAPI/useAudioContextWebAPI';
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
export declare function useAudioAnalyzer(options: UseAudioAnalyzerOptions): UseAudioAnalyzerReturn;
