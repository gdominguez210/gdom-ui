'use client';

import {
  type ElementType,
  type MouseEvent as ReactMouseEvent,
  type SyntheticEvent,
  type KeyboardEvent,
  useCallback,
} from 'react';
import { type ComponentPropsWithRef } from 'react';
import { AudioPlaylistTrackTitle } from '@lib/AudioPlaylistTrackTitle';
import { AudioPlaylistTrackAuthor } from '@lib/AudioPlaylistTrackAuthor';
import { AudioPlaylistTrackImage } from '@lib/AudioPlaylistTrackImage';
import {
  AudioPlaylistTrackPrimitive,
  type AudioPlaylistTrackPrimitiveProps,
} from '@lib/AudioPlaylistTrack/AudioPlaylistTrackPrimitive';

/**
 * Props for the audio playlist track component
 */
export type AudioPlaylistTrackProps<T extends ElementType = 'li'> = {
  /** Element to render as @default li */
  as?: T;
  /** Title of the track */
  title: string;
  /** Author of the track */
  author: string;
  /** URL to the track thumbnail image */
  thumbnail?: string;
  /** Whether this is the active track */
  active?: boolean;
  /** Whether audio is currently playing */
  isPlaying?: boolean;
  /** Handler for track selection */
  onSelect?: (e: SyntheticEvent) => void;
} & ComponentPropsWithRef<T>;

/**
 * Individual playlist track component
 */
export function AudioPlaylistTrack<T extends ElementType = 'li'>(
  props: AudioPlaylistTrackProps<T>,
) {
  const {
    title,
    author,
    thumbnail = '',
    active = false,
    isPlaying = false,
    onSelect,
    ...restProps
  } = props;

  const handleClick = useCallback(
    (e: ReactMouseEvent) => {
      e.preventDefault();
      onSelect?.(e);
    },
    [onSelect],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect?.(e);
      }
    },
    [onSelect],
  );

  return (
    <AudioPlaylistTrackPrimitive
      active={active}
      aria-label={`Play ${title} by ${author}`}
      {...(restProps as AudioPlaylistTrackPrimitiveProps<T>)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <AudioPlaylistTrackImage
        src={thumbnail}
        altText={title}
        active={active}
        isPlaying={isPlaying}
      />
      <div>
        <AudioPlaylistTrackTitle>{title}</AudioPlaylistTrackTitle>
        <AudioPlaylistTrackAuthor>{author}</AudioPlaylistTrackAuthor>
      </div>
    </AudioPlaylistTrackPrimitive>
  );
}
