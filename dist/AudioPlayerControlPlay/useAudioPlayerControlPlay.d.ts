import { RefObject } from 'react';
interface UseAudioPlayerControlPlayProps {
    isPlaying: boolean;
    audioRef: RefObject<HTMLAudioElement | null>;
    currentTrackIndex: number;
}
export declare function useAudioPlayerControlPlay(props: UseAudioPlayerControlPlayProps): void;
export {};
