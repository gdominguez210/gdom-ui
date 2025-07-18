'use client';

import {
  type ElementType,
  type MouseEvent as ReactMouseEvent,
  type KeyboardEvent,
  type ComponentPropsWithRef,
  useCallback,
} from 'react';
import {
  AudioPlaylistTrackContainerPrimitive,
  type AudioPlaylistTrackContainerPrimitiveProps,
} from '@/lib/AudioPlaylistTrackContainer/AudioPlaylistTrackContainerPrimitive';
import { useAudioPlaylistTrackContext } from '@/lib/AudioPlaylistTrackContextProvider/useAudioPlaylistTrackContext';

/**
 * Props for the audio playlist track component
 */
export type AudioPlaylistTrackContainerProps<T extends ElementType = 'li'> = {
  /** Element to render as @default li */
  as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Individual playlist track component
 */
export function AudioPlaylistTrackContainer<T extends ElementType = 'li'>(
  props: AudioPlaylistTrackContainerProps<T>,
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
    <AudioPlaylistTrackContainerPrimitive
      active={active}
      aria-label={`Play ${title} by ${author}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...(restProps as AudioPlaylistTrackContainerPrimitiveProps<T>)}
    >
      {children}
    </AudioPlaylistTrackContainerPrimitive>
  );
}
