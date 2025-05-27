import { PropsWithChildren } from 'react';
/**
 * Props for the audio playback context provider
 */
export interface AudioPlayerContextPlaybackProviderProps extends PropsWithChildren {
    /** Initial volume level @default 50 */
    defaultVolume?: number;
    /** Whether audio is initially muted @default false */
    defaultMute?: boolean;
    /** Whether shuffle is initially enabled @default false */
    defaultShuffle?: boolean;
    /** Whether loop is initially enabled @default false */
    defaultLoop?: boolean;
}
/**
 * Provides context for controlling audio playback state
 */
export declare function AudioPlayerContextPlaybackProvider(props: AudioPlayerContextPlaybackProviderProps): import("react/jsx-runtime").JSX.Element;
