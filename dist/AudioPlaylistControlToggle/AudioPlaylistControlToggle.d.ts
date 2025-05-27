import { AudioPlaylistControlTogglePrimitiveProps } from './AudioPlaylistControlTogglePrimitive';
/**
 * Props for the playlist toggle component
 */
export type AudioPlaylistControlToggleProps = Omit<AudioPlaylistControlTogglePrimitiveProps, 'active'>;
/**
 * Toggle button for showing/hiding the audio playlist
 */
export declare function AudioPlaylistControlToggle(props: AudioPlaylistControlToggleProps): import("react/jsx-runtime").JSX.Element;
