import { RefObject } from 'react';
export type AudioPlayerContextRefsType = {
    audioRef: RefObject<HTMLAudioElement | null>;
    progressBarRef: RefObject<HTMLInputElement | null>;
};
export declare const AudioPlayerContextRefs: import('react').Context<AudioPlayerContextRefsType | undefined>;
export declare const AUDIO_PLAYER_CONTEXT_REFS_ERROR = "useAudioPlayerContextRefs must be used within an AudioPlayerContextRefsProvider";
