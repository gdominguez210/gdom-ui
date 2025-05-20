'use client';

import type { ComponentPropsWithRef, ElementType } from 'react';
import { useAudioPlayerContextTrack } from '@/lib/AudioPlayerContextTrackProvider/useAudioPlayerContextTrack';
import { AudioPlayerTitlePrimitive } from './AudioPlayerTitlePrimitive';

/**
 * Props for the track title component
 */
export type AudioPlayerTitleProps<T extends ElementType = 'p'> = {
  /** Element to render as @default p */
  as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Displays the title of the current audio track
 * Returns null if no title is available
 */
export function AudioPlayerTitle<T extends ElementType>(props: AudioPlayerTitleProps<T>) {
  const { currentTrack: { title } = {} } = useAudioPlayerContextTrack();

  if (!title) return null;

  return (
    <AudioPlayerTitlePrimitive
      title={title}
      {...props}
    >
      {title}
    </AudioPlayerTitlePrimitive>
  );
}
