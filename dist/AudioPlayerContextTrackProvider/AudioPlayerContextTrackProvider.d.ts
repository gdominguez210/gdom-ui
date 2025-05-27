import { PropsWithChildren } from 'react';
import { AudioTrackData } from './reducer';
/**
 * Props for the track management context provider
 */
export interface AudioPlayerContextTrackProviderProps extends PropsWithChildren {
    /** List of tracks to be played */
    tracks: AudioTrackData[];
    /** Initial track index to play @default 0 */
    defaultTrackIndex?: number;
}
/**
 * Provides context for managing the current track and track list
 */
export declare function AudioPlayerContextTrackProvider(props: AudioPlayerContextTrackProviderProps): import("react/jsx-runtime").JSX.Element;
