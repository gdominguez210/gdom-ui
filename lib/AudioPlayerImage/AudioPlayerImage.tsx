'use client';

import type { ComponentPropsWithRef, ElementType } from 'react';
import { useAudioPlayerContextTrack } from '@/lib/AudioPlayerContextTrackProvider';
import { AudioPlayerImagePrimitive } from './AudioPlayerImagePrimitive';

/**
 * Props for the audio track image component
 */
export type AudioPlayerImageProps<T extends ElementType = 'div'> = {
  /** Element to render as @default div */
  as?: T;
  /** Image width in pixels @default 96 */
  width?: number;
  /** Image height in pixels @default 96 */
  height?: number;
} & ComponentPropsWithRef<T>;

/**
 * Displays the thumbnail for the current audio track
 * Shows a placeholder icon if no thumbnail is available
 */
export function AudioPlayerImage<T extends ElementType = 'div'>(props: AudioPlayerImageProps<T>) {
  const { currentTrack: { thumbnail, title } = {} } = useAudioPlayerContextTrack();

  return (
    <AudioPlayerImagePrimitive
      {...props}
      src={thumbnail}
      altText={title ? `${title} thumbnail` : ''}
    />
  );
}
