import { RefObject } from 'react';
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
export declare function useAnalyzerNode(options: UseAnalyzerNodeOptions): UseAnalyzerNodeResult;
