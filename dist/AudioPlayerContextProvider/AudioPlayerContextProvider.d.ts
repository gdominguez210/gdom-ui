import { PropsWithChildren } from 'react';
import { AudioTrackData } from '../AudioPlayerContextTrackProvider/reducer';
/**
 * Props for the main audio player context provider
 */
export type AudioPlayerContextProviderProps = {
    /** Initial track to play @default 0 */
    defaultTrackIndex?: number;
    /** Initial volume level @default 50 */
    defaultVolume?: number;
    /** Whether audio is initially muted @default false */
    defaultMute?: boolean;
    /** Whether shuffle is initially enabled @default false */
    defaultShuffle?: boolean;
    /** Whether loop is initially enabled @default false */
    defaultLoop?: boolean;
    /** Array of tracks to play */
    tracks: AudioTrackData[];
} & PropsWithChildren;
/**
 * Main provider that composes all context providers needed for the audio player
 */
export declare function AudioPlayerContextProvider({ children, defaultTrackIndex, defaultVolume, defaultMute, defaultShuffle, defaultLoop, tracks, }: AudioPlayerContextProviderProps): import("react/jsx-runtime").JSX.Element;
