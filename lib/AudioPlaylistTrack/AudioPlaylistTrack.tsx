'use client';

import {
  type ElementType,
  type MouseEvent as ReactMouseEvent,
  type KeyboardEvent,
  type ComponentPropsWithRef,
  useCallback,
} from 'react';
import {
  AudioPlaylistTrackPrimitive,
  type AudioPlaylistTrackPrimitiveProps,
} from '@/lib/AudioPlaylistTrack/AudioPlaylistTrackPrimitive';
import { useAudioPlaylistTrackContext } from '@/lib/AudioPlaylistTrackContextProvider/useAudioPlaylistTrackContext';

/**
 * Props for the audio playlist track component
 */
export type AudioPlaylistTrackProps<T extends ElementType = 'li'> = {
  /** Element to render as @default li */
  as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Individual playlist track component
 */
export function AudioPlaylistTrack<T extends ElementType = 'li'>(
  props: AudioPlaylistTrackProps<T>,
) {
  const { onClick, onKeyDown, children, ...restProps } = props;

  const {
    active,
    onSelect,
    track: { title, author },
  } = useAudioPlaylistTrackContext();

  const handleClick = useCallback(
    (e: ReactMouseEvent) => {
      e.preventDefault();
      onSelect();
      onClick?.(e);
    },
    [onSelect, onClick],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect();
      }

      onKeyDown?.(e);
    },
    [onSelect, onKeyDown],
  );

  return (
    <AudioPlaylistTrackPrimitive
      active={active}
      aria-label={`Play ${title} by ${author}`}
      {...(restProps as AudioPlaylistTrackPrimitiveProps<T>)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </AudioPlaylistTrackPrimitive>
  );
}
