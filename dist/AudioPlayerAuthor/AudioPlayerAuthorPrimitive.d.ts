import { ElementType } from 'react';
import { AudioPlayerAuthorProps } from './AudioPlayerAuthor';
/**
 * Props for the AudioPlayerAuthorPrimitive component
 */
export type AudioPlayerAuthorPrimitiveProps<T extends ElementType = 'span'> = AudioPlayerAuthorProps<T>;
/**
 * Base component for displaying author information with appropriate styling
 */
export declare function AudioPlayerAuthorPrimitive<T extends ElementType = 'span'>(props: AudioPlayerAuthorPrimitiveProps<T>): import("react/jsx-runtime").JSX.Element;
