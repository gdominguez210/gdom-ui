import { ComponentPropsWithRef, ElementType } from 'react';
/**
 * Props for the track author component
 */
export type AudioPlayerAuthorProps<T extends ElementType = 'span'> = {
    /** Element to render as @default span */
    as?: T;
} & ComponentPropsWithRef<T>;
/**
 * Displays the author of the current audio track
 * Returns null if no author is available
 */
export declare function AudioPlayerAuthor<T extends ElementType = 'p'>(props: AudioPlayerAuthorProps<T>): import("react/jsx-runtime").JSX.Element | null;
