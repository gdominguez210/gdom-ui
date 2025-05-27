import { RefObject } from 'react';
interface UseAudioPlayerNextTrackProps {
    loop: boolean;
    shuffle: boolean;
    currentTrackIndex: number;
    tracksLength: number;
    onTimeChange: (time: number) => void;
    onTrackIndexChange: (index: number) => void;
    audioRef: RefObject<HTMLAudioElement>;
}
export declare function useAudioPlayerNextTrack({ loop, shuffle, currentTrackIndex, tracksLength, onTimeChange, onTrackIndexChange, audioRef, }: UseAudioPlayerNextTrackProps): {
    handleNextTrack: () => void;
};
export {};
