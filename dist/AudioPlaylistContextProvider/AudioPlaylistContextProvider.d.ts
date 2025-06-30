import { PropsWithChildren } from 'react';
/**
 * Props for the audio playlist context provider
 */
export type AudioPlaylistContextProviderProps = PropsWithChildren & {
    /**
     * Whether the playlist is initially visible
     * @default false
     */
    defaultVisible?: boolean;
    /**
     * The id of the playlist, primarily used for accessibility attributes
     * @default 'audio-playlist'
     */
    id?: string;
};
/**
 * Provider component for managing playlist visibility state and references
 */
export declare function AudioPlaylistContextProvider(props: AudioPlaylistContextProviderProps): import("react/jsx-runtime").JSX.Element;
