import { PropsWithChildren } from 'react';
/**
 * Props for the time tracking context provider
 */
export type AudioPlayerContextTimeProviderProps = PropsWithChildren & {
    /** Initial total duration in seconds @default 0 */
    defaultDuration?: number;
    /** Initial playback position in seconds @default 0 */
    defaultCurrentTime?: number;
};
/**
 * Provides context for tracking and controlling audio playback time
 */
export declare function AudioPlayerContextTimeProvider(props: AudioPlayerContextTimeProviderProps): import("react/jsx-runtime").JSX.Element;
