import { RefObject } from 'react';
export type UseAudioContextWebAPIOptions = {
    isPlaying: boolean;
};
export type UseAudioContextWebAPIReturn = {
    audioContextRef: RefObject<AudioContext | null>;
    createAudioSource: (audioElement: HTMLAudioElement) => MediaElementAudioSourceNode | void;
    deleteAudioSource: (audioElement: HTMLAudioElement) => boolean;
    isReady: boolean;
    sourceNodesRef: RefObject<Map<HTMLAudioElement, MediaElementAudioSourceNode>>;
};
export declare function useAudioContextWebAPI(options: UseAudioContextWebAPIOptions): {
    audioContextRef: RefObject<AudioContext | null>;
    createAudioSource: (audioElement: HTMLAudioElement) => MediaElementAudioSourceNode | void;
    deleteAudioSource: (audioElement: HTMLAudioElement) => boolean;
    sourceNodesRef: RefObject<Map<HTMLAudioElement, MediaElementAudioSourceNode>>;
    isReady: boolean;
};
