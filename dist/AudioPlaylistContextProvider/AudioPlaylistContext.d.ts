import { RefObject } from 'react';
export declare const AUDIO_PLAYLIST_CONTEXT_ERROR = "useAudioPlaylistContext must be used within an AudioPlaylistContextProvider";
export interface AudioPlaylistContextType {
    isPlaylistVisible: boolean;
    togglePlaylist: () => void;
    toggleRef: RefObject<HTMLButtonElement | null>;
    expandableContainerRef: RefObject<HTMLElement | null>;
    id: string;
}
export declare const AudioPlaylistContext: import('react').Context<AudioPlaylistContextType | null>;
