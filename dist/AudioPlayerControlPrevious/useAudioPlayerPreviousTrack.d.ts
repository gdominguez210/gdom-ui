import { RefObject } from 'react';
interface UseAudioPlayerPreviousTrackProps {
    loop: boolean;
    shuffle: boolean;
    currentTrackIndex: number;
    tracksLength: number;
    onTimeChange: (time: number) => void;
    onTrackIndexChange: (index: number) => void;
    audioRef: RefObject<HTMLAudioElement>;
}
export declare function useAudioPlayerPreviousTrack({ loop, shuffle, currentTrackIndex, tracksLength, onTimeChange, onTrackIndexChange, audioRef, }: UseAudioPlayerPreviousTrackProps): {
    handlePreviousTrack: () => void;
};
export {};
