import { RefObject } from 'react';
interface UseAudioPlayerMetadataProps {
    audioRef: RefObject<HTMLAudioElement>;
    progressBarRef: RefObject<HTMLInputElement>;
    onDurationChange: (duration: number) => void;
}
interface UseAudioPlayerMetadataReturn {
    handleLoadedMetadata: () => void;
}
export declare function useAudioPlayerMetadata({ audioRef, progressBarRef, onDurationChange, }: UseAudioPlayerMetadataProps): UseAudioPlayerMetadataReturn;
export {};
