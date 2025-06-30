import { PropsWithChildren } from 'react';
import { AudioTrackData } from '../AudioPlayerContextTrackProvider/reducer';
/**
 * Props for the AudioPlaylistTrack context provider
 */
export interface AudioPlaylistTrackContextProviderProps extends PropsWithChildren {
    /**
     * Index of the track in the playlist
     */
    index: number;
    /**
     * Track data
     */
    track: AudioTrackData;
}
/**
 * Provider component that makes track data and behavior available to all
 * child components within an AudioPlaylistTrack
 */
export declare function AudioPlaylistTrackContextProvider(props: AudioPlaylistTrackContextProviderProps): import("react/jsx-runtime").JSX.Element;
